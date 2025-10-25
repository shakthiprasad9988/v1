// File Upload JavaScript

let selectedFiles = [];

// Get DOM elements
const fileUploadArea = document.getElementById('fileUploadArea');
const fileInput = document.getElementById('fileInput');
const selectedFilesContainer = document.getElementById('selectedFilesContainer');
const uploadForm = document.getElementById('uploadForm');
const submitBtn = document.getElementById('submitBtn');
const uploadProgress = document.getElementById('uploadProgress');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const successMessage = document.getElementById('successMessage');

// Click to upload
fileUploadArea.addEventListener('click', () => {
  fileInput.click();
});

// File input change
fileInput.addEventListener('change', (e) => {
  handleFiles(e.target.files);
});

// Drag and drop events
fileUploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileUploadArea.classList.add('dragover');
});

fileUploadArea.addEventListener('dragleave', () => {
  fileUploadArea.classList.remove('dragover');
});

fileUploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  fileUploadArea.classList.remove('dragover');
  handleFiles(e.dataTransfer.files);
});

// Handle selected files
function handleFiles(files) {
  const fileArray = Array.from(files);
  
  fileArray.forEach(file => {
    // Check if file already exists
    const exists = selectedFiles.some(f => f.name === file.name && f.size === file.size);
    if (!exists) {
      selectedFiles.push(file);
    }
  });
  
  displaySelectedFiles();
  updateSubmitButton();
}

// Display selected files
function displaySelectedFiles() {
  if (selectedFiles.length === 0) {
    selectedFilesContainer.innerHTML = '';
    return;
  }
  
  let html = '<h4>Selected Files (' + selectedFiles.length + ')</h4>';
  
  selectedFiles.forEach((file, index) => {
    const fileSize = formatFileSize(file.size);
    const fileIcon = getFileIcon(file.type);
    
    html += `
      <div class="file-item" data-index="${index}">
        <div class="file-info">
          <i class='bx ${fileIcon} file-icon'></i>
          <div class="file-details">
            <h5>${file.name}</h5>
            <p>${fileSize} • ${file.type || 'Unknown type'}</p>
          </div>
        </div>
        <div class="file-actions">
          <button type="button" class="remove-file" onclick="removeFile(${index})">
            <i class='bx bx-trash'></i> Remove
          </button>
        </div>
      </div>
    `;
  });
  
  selectedFilesContainer.innerHTML = html;
}

// Remove file
function removeFile(index) {
  selectedFiles.splice(index, 1);
  displaySelectedFiles();
  updateSubmitButton();
  
  // Reset file input
  fileInput.value = '';
}

// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Get file icon based on type
function getFileIcon(type) {
  if (type.includes('pdf')) return 'bxs-file-pdf';
  if (type.includes('word') || type.includes('document')) return 'bxs-file-doc';
  if (type.includes('image')) return 'bxs-file-image';
  if (type.includes('video')) return 'bxs-video';
  if (type.includes('zip') || type.includes('compressed')) return 'bxs-file-archive';
  if (type.includes('text')) return 'bxs-file-txt';
  return 'bxs-file';
}

// Update submit button state
function updateSubmitButton() {
  if (selectedFiles.length > 0) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

// Form submission
uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Validate form
  const assignmentTitle = document.getElementById('assignmentTitle').value;
  const course = document.getElementById('course').value;
  const description = document.getElementById('description').value;
  
  if (!assignmentTitle || !course) {
    alert('Please fill in all required fields');
    return;
  }
  
  if (selectedFiles.length === 0) {
    alert('Please select at least one file to upload');
    return;
  }
  
  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.textContent = 'Uploading...';
  
  // Show progress bar
  uploadProgress.classList.add('active');
  
  // Simulate upload progress (in real implementation, use actual upload progress)
  await simulateUpload();
  
  // Show success message
  successMessage.classList.add('active');
  
  // Reset form after 2 seconds
  setTimeout(() => {
    resetForm();
  }, 2000);
});

// Simulate upload progress
function simulateUpload() {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.width = progress + '%';
      progressBar.textContent = progress + '%';
      progressText.textContent = `Uploading ${selectedFiles.length} file(s)...`;
      
      if (progress >= 100) {
        clearInterval(interval);
        progressText.textContent = 'Upload complete!';
        resolve();
      }
    }, 200);
  });
}

// Reset form
function resetForm() {
  uploadForm.reset();
  selectedFiles = [];
  displaySelectedFiles();
  updateSubmitButton();
  uploadProgress.classList.remove('active');
  successMessage.classList.remove('active');
  progressBar.style.width = '0%';
  submitBtn.disabled = false;
  submitBtn.textContent = 'Submit Assignment';
}

// Save as draft
function saveAsDraft() {
  const assignmentTitle = document.getElementById('assignmentTitle').value;
  const course = document.getElementById('course').value;
  const description = document.getElementById('description').value;
  
  if (!assignmentTitle && !course && selectedFiles.length === 0) {
    alert('Nothing to save as draft');
    return;
  }
  
  // In real implementation, save to backend
  console.log('Saving draft:', {
    assignmentTitle,
    course,
    description,
    files: selectedFiles.map(f => f.name)
  });
  
  alert('Draft saved successfully!');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateSubmitButton();
});
