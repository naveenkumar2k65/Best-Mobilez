// Helper for CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Update this in production
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Helper for sending JSON responses
const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
};

// Simple authentication check
const isAuthenticated = (request, env) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  
  const token = authHeader.split(' ')[1];
  // Simple Base64 token generation: Buffer.from("admin:" + password).toString('base64')
  // Using atob/btoa for standard Web APIs in Workers
  const expectedToken = btoa('admin:' + env.ADMIN_PASSWORD);
  
  return token === expectedToken;
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Routing
    try {
      // POST /api/auth
      if (url.pathname === '/api/auth' && method === 'POST') {
        const { username, password } = await request.json();
        
        if (username === 'admin' && password === env.ADMIN_PASSWORD) {
          const token = btoa(username + ':' + password);
          return jsonResponse({ success: true, token });
        }
        return jsonResponse({ success: false, error: 'Invalid credentials' }, 401);
      }

      // GET /api/images
      if (url.pathname === '/api/images' && method === 'GET') {
        const type = url.searchParams.get('type') || 'live_stream';
        const { results } = await env.DB.prepare(
          "SELECT * FROM active_images WHERE section_type = ? ORDER BY created_at ASC"
        ).bind(type).all();
        
        return jsonResponse({ success: true, images: results });
      }

      // POST /api/images
      if (url.pathname === '/api/images' && method === 'POST') {
        if (!isAuthenticated(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401);

        const { url: imageUrl, section_type, alt_text } = await request.json();
        if (!imageUrl || !section_type) return jsonResponse({ error: 'Missing url or section_type' }, 400);

        const { success } = await env.DB.prepare(
          "INSERT INTO active_images (url, section_type, alt_text) VALUES (?, ?, ?)"
        ).bind(imageUrl, section_type, alt_text || 'Showroom Image').run();

        // Fetch the newly inserted row to return it
        const newImage = await env.DB.prepare(
          "SELECT * FROM active_images WHERE id = last_insert_rowid()"
        ).first();

        return jsonResponse({ success: true, image: newImage }, 201);
      }

      // DELETE /api/images
      if (url.pathname === '/api/images' && method === 'DELETE') {
        if (!isAuthenticated(request, env)) return jsonResponse({ error: 'Unauthorized' }, 401);

        const id = url.searchParams.get('id');
        if (!id) return jsonResponse({ error: 'Missing image ID' }, 400);

        await env.DB.prepare("DELETE FROM active_images WHERE id = ?").bind(id).run();
        return jsonResponse({ success: true, message: 'Deleted successfully' });
      }

      // 404 Route Not Found
      return jsonResponse({ error: 'Route not found' }, 404);

    } catch (error) {
      console.error('Worker Error:', error);
      return jsonResponse({ error: 'Internal Server Error', details: error.message }, 500);
    }
  },
};
