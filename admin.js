// Cloudinary has been removed. Images are stored directly in Cloudflare D1 Database as Base64.

// Set this to your production Cloudflare Worker URL later
const API_BASE_URL = 'https://best-mobile-backend.naveenkumar05.workers.dev';

// Elements
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const liveStreamGrid = document.getElementById('live-stream-grid');
const topSellingGrid = document.getElementById('top-selling-grid');

const uploadModal = document.getElementById('upload-modal');
const stepUpload = document.getElementById('step-upload');
const stepCrop = document.getElementById('step-crop');
const stepLoading = document.getElementById('step-loading');
const imageUploadInput = document.getElementById('image-upload-input');
const imageToCrop = document.getElementById('image-to-crop');
const btnCropUpload = document.getElementById('btn-crop-upload');

let cropper = null;
let currentSectionType = 'live_stream';

// --- AUTHENTICATION ---
function getToken() {
  return localStorage.getItem('adminToken');
}

function checkAuth() {
  if (getToken()) {
    loginScreen.classList.remove('active');
    dashboardScreen.classList.add('active');
    loadImages();
  } else {
    loginScreen.classList.add('active');
    dashboardScreen.classList.remove('active');
  }
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  loginError.textContent = 'Logging in...';
  
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    
    if (data.success) {
      localStorage.setItem('adminToken', data.token);
      checkAuth();
    } else {
      loginError.textContent = data.error || 'Login failed';
    }
  } catch (err) {
    loginError.textContent = 'Network error. Are you running the Vercel backend?';
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('adminToken');
  checkAuth();
});

async function loadImages() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/images?type=live_stream`);
    const data = await res.json();
    
    if (data.success) {
      liveStreamGrid.innerHTML = '';
      data.images.forEach(img => {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.innerHTML = `
          <img src="${img.url}" alt="${img.alt_text || 'Image'}">
          <div class="image-card-actions">
            <span>ID: ${img.id}</span>
            <button class="btn danger-btn" onclick="deleteImage(${img.id})">Delete</button>
          </div>
        `;
        liveStreamGrid.appendChild(card);
      });
      if (data.images.length === 0) {
        liveStreamGrid.innerHTML = '<p>No images found.</p>';
      }
    }
  } catch (err) {
    liveStreamGrid.innerHTML = '<p class="error-text">Failed to load images from database.</p>';
  }
}

async function loadTopPhones() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/images?type=top_selling`);
    const data = await res.json();
    
    if (data.success) {
      topSellingGrid.innerHTML = '';
      data.images.forEach(img => {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.innerHTML = `
          <img src="${img.url}" alt="${img.alt_text || 'Phone'}">
          <div style="padding: 10px; font-size: 0.9em; color: white;">${img.alt_text}</div>
          <div class="image-card-actions">
            <span>ID: ${img.id}</span>
            <button class="btn danger-btn" onclick="deleteImage(${img.id})">Delete</button>
          </div>
        `;
        topSellingGrid.appendChild(card);
      });
      if (data.images.length === 0) {
        topSellingGrid.innerHTML = '<p>No top selling phones found.</p>';
      }
    }
  } catch (err) {
    topSellingGrid.innerHTML = '<p class="error-text">Failed to load top phones from database.</p>';
  }
}

// --- DELETE IMAGE ---
async function deleteImage(id) {
  if (!confirm('Are you sure you want to delete this image?')) return;
  
  try {
    const res = await fetch(`${API_BASE_URL}/api/images?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await res.json();
    
    if (data.success) {
      loadImages();
      loadTopPhones();
    } else {
      alert('Failed to delete: ' + data.error);
    }
  } catch (err) {
    alert('Error deleting image.');
  }
}

// --- UPLOAD & CROP (WHATSAPP STYLE) ---
window.openUploadModal = (sectionType) => {
  currentSectionType = sectionType;
  uploadModal.classList.add('active');
  stepUpload.classList.add('active');
  stepCrop.classList.remove('active');
  stepLoading.classList.remove('active');
  imageUploadInput.value = '';
  document.getElementById('phone-name-input').value = '';
  
  if (sectionType === 'top_selling') {
    document.getElementById('phone-name-container').style.display = 'block';
  } else {
    document.getElementById('phone-name-container').style.display = 'none';
  }
};

window.closeUploadModal = () => {
  uploadModal.classList.remove('active');
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
};

imageUploadInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imageToCrop.src = event.target.result;
      
      stepUpload.classList.remove('active');
      stepCrop.classList.add('active');
      
      if (cropper) cropper.destroy();
      
      cropper = new Cropper(imageToCrop, {
        aspectRatio: 1, // 1:1 Square like WhatsApp Profile
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 1,
        restore: false,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});

btnCropUpload.addEventListener('click', async () => {
  if (!cropper) return;
  
  stepCrop.classList.remove('active');
  stepLoading.classList.add('active');
  
  // 1. Get Cropped Image as Base64 string
  const canvas = cropper.getCroppedCanvas({
    width: 800, // Optimize size
    height: 800,
  });
  
  const base64Image = canvas.toDataURL('image/jpeg', 0.9);
  
  try {
    // 2. Save Base64 Image directly to Cloudflare D1 Database via our Worker API
    const dbRes = await fetch(`${API_BASE_URL}/api/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        url: base64Image, // Sending the base64 string directly instead of a Cloudinary URL
        section_type: currentSectionType,
        alt_text: currentSectionType === 'top_selling' ? document.getElementById('phone-name-input').value : 'Admin uploaded image'
      })
    });
    
    const dbData = await dbRes.json();
    
    if (dbData.success) {
      closeUploadModal();
      loadImages(); // Refresh dashboard
      loadTopPhones();
    } else {
      throw new Error(dbData.error || 'Failed to save to database');
    }
    
  } catch (err) {
    console.error(err);
    alert('Upload failed: ' + err.message);
    closeUploadModal();
  }
});

// Initialize
checkAuth();
if(getToken()) loadTopPhones();
