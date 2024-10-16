const mainImage = document.getElementById('mainImage');
const titleimg = document.getElementById('titleimg');
const date = document.getElementById('date')
const imageDescription = document.getElementById('imageDescription');
const newImageBtn = document.getElementById('newImageBtn');
const loadingOverlay = document.querySelector('.loading-overlay');
const container = document.querySelector('.container');
const darkModeToggle = document.getElementById('darkModeToggle');

async function fetchNewImage() {
    try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=1GuMYH0ETZtDkh8sjDiewYgeowuOaDlfJHmtYMQo&count=1');
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
}

async function updateImage() {
    loadingOverlay.classList.add('active');
    container.classList.remove('slide-in');
    
    const imageData = await fetchNewImage();
    
    if (imageData) {
        mainImage.src = imageData.hdurl;
        mainImage.alt = imageData.alt_description || 'Random image from Unsplash';
        titleimg.textContent = imageData.title;
        date.textContent = imageData.date;
        imageDescription.textContent = imageData.explanation || 'No description available';
        
        mainImage.onload = () => {
            loadingOverlay.classList.remove('active');
            container.classList.add('slide-in');
            mainImage.classList.add('fade-in');
            setTimeout(() => mainImage.classList.remove('fade-in'), 500);
        };
    } else {
        loadingOverlay.classList.remove('active');
        imageDescription.textContent = 'Error loading image. Please try again.';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

newImageBtn.addEventListener('click', updateImage);
darkModeToggle.addEventListener('change', toggleDarkMode);

// Initial load
updateImage();