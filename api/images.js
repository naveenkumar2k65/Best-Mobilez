import { neon } from '@neondatabase/serverless';

// Helper to check authentication
const isAuthenticated = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  
  const token = authHeader.split(' ')[1];
  const expectedToken = Buffer.from('admin:' + process.env.ADMIN_PASSWORD).toString('base64');
  
  return token === expectedToken;
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Check if NEON_DATABASE_URL is provided
  if (!process.env.NEON_DATABASE_URL) {
    return res.status(500).json({ error: 'Database connection string not configured.' });
  }

  const sql = neon(process.env.NEON_DATABASE_URL);

  try {
    // GET: Fetch all active images
    if (req.method === 'GET') {
      const type = req.query.type || 'live_stream';
      const images = await sql`SELECT * FROM active_images WHERE section_type = ${type} ORDER BY created_at ASC`;
      return res.status(200).json({ success: true, images });
    }

    // POST: Add a new image (Requires Auth)
    if (req.method === 'POST') {
      if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' });

      const { url, section_type, alt_text } = req.body;
      if (!url || !section_type) return res.status(400).json({ error: 'Missing url or section_type' });

      const newImage = await sql`
        INSERT INTO active_images (url, section_type, alt_text) 
        VALUES (${url}, ${section_type}, ${alt_text || 'Showroom Image'}) 
        RETURNING *
      `;
      return res.status(201).json({ success: true, image: newImage[0] });
    }

    // DELETE: Remove an image (Requires Auth)
    if (req.method === 'DELETE') {
      if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' });

      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Missing image ID' });

      await sql`DELETE FROM active_images WHERE id = ${id}`;
      return res.status(200).json({ success: true, message: 'Deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
