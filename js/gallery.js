document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');

    // Add click event to all gallery images
    const galleryImages = document.querySelectorAll('.gallery-card img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            const figcaption = img.nextElementSibling;
            if (figcaption) {
                caption.innerHTML = figcaption.innerHTML;
            }
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        }
    });
});

const grid = document.querySelector('.paper-grid');
const detailName = document.getElementById('detailName');
const detailTagline = document.getElementById('detailTagline');
const detailTopSpeed = document.getElementById('detailTopSpeed');
const detailAcceleration = document.getElementById('detailAcceleration');
const detailRange = document.getElementById('detailRange');
const detailEngine = document.getElementById('detailEngine');
const detailDrive = document.getElementById('detailDrive');
const detailInterior = document.getElementById('detailInterior');
const detailDescription = document.getElementById('detailDescription');
const detailImage = document.getElementById('detailImage');
const barAccel = document.getElementById('barAccel');
const barHandling = document.getElementById('barHandling');
const barTech = document.getElementById('barTech');
const barLuxury = document.getElementById('barLuxury');
const uploadForm = document.getElementById('paperUploadForm');
const uploadInput = document.getElementById('paperFile');
const paperName = document.getElementById('paperName');
const paperYear = document.getElementById('paperYear');
const paperSubject = document.getElementById('paperSubject');
const uploadPreviewGrid = document.getElementById('uploadPreviewGrid');

let animationInProgress = false;

function animateProgressBars(targetScores) {
    if (animationInProgress) return;
    animationInProgress = true;

    const bars = [
        { element: barAccel, target: targetScores.accel, label: 'barAccelLabel' },
        { element: barHandling, target: targetScores.handling, label: 'barHandlingLabel' },
        { element: barTech, target: targetScores.tech, label: 'barTechLabel' },
        { element: barLuxury, target: targetScores.luxury, label: 'barLuxuryLabel' }
    ];

    const duration = 1200;
    const frameRate = 60;
    const frames = (duration / 1000) * frameRate;
    const increment = 1 / frames;
    let progress = 0;

    function updateBars() {
        progress += increment;
        if (progress >= 1) progress = 1;

        bars.forEach(bar => {
            const currentValue = Math.floor(bar.target * progress);
            bar.element.style.width = `${currentValue}%`;
            const labelElement = document.getElementById(bar.label);
            if (labelElement) {
                labelElement.textContent = `${currentValue}%`;
            }
        });

        if (progress < 1) {
            requestAnimationFrame(updateBars);
        } else {
            animationInProgress = false;
        }
    }

    updateBars();
}

function createCard(paper, index) {
    const card = document.createElement('article');
    card.className = 'paper-card';
    card.dataset.index = index;
    card.innerHTML = `
        <div class="paper-card-image">
            <img src="${paper.image}" alt="${paper.name} preview" loading="lazy">
        </div>
        <h3>${paper.name}</h3>
        <p>${paper.tagline}</p>
        <span class="paper-tag">${paper.category}</span>
        <div class="feature-list">
            ${paper.features.map(feature => `<div class="feature-item">${feature}</div>`).join('')}
        </div>
    `;
    card.addEventListener('click', () => selectPaper(index));
    return card;
}

function renderCards() {
    grid.innerHTML = '';
    const cards = papers.map((paper, index) => createCard(paper, index));
    grid.append(...cards);
}

function updateActiveCard(index) {
    const active = document.querySelector('.paper-card.active');
    if (active) active.classList.remove('active');
    const selectedCard = grid.querySelector(`.paper-card[data-index='${index}']`);
    if (selectedCard) selectedCard.classList.add('active');
}

function selectPaper(index) {
    const paper = papers[index];
    if (!paper) return;
    updateActiveCard(index);

    detailName.textContent = paper.name;
    detailTagline.textContent = paper.tagline;
    detailTopSpeed.textContent = paper.board;
    detailAcceleration.textContent = paper.year;
    detailRange.textContent = paper.pages;
    detailEngine.textContent = paper.subject;
    detailDrive.textContent = paper.difficulty;
    detailInterior.textContent = paper.focus;
    detailDescription.textContent = paper.description;
    detailImage.src = paper.image;
    detailImage.alt = `${paper.name} preview`;

    barAccel.style.width = '0%';
    barHandling.style.width = '0%';
    barTech.style.width = '0%';
    barLuxury.style.width = '0%';

    setTimeout(() => {
        animateProgressBars(paper.score);
    }, 50);
}

function createUploadPreview(item, index) {
    if (uploadPreviewGrid.querySelector('.preview-empty')) {
        uploadPreviewGrid.innerHTML = '';
    }

    const preview = document.createElement('div');
    preview.className = 'upload-item';
    preview.innerHTML = `
        <img src="${item.image}" alt="Uploaded paper preview">
        <div class="upload-item-info">
            <h4>${item.name}</h4>
            <p>${item.subject} • ${item.year}</p>
        </div>
    `;
    preview.addEventListener('click', () => selectPaper(index));
    uploadPreviewGrid.prepend(preview);
}

function handleUpload(event) {
    event.preventDefault();
    const file = uploadInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const newPaper = {
            name: paperName.value.trim() || 'Uploaded Paper',
            tagline: 'A fresh past paper scan for your revision.',
            category: paperSubject.value.trim() || 'Study',
            image: e.target.result,
            features: [
                `Year ${paperYear.value.trim() || 'Unknown'}`,
                'Uploaded scan',
                'Revision-ready'
            ],
            board: 'Uploaded',
            year: paperYear.value.trim() || 'Unknown',
            pages: 'Scan',
            subject: paperSubject.value.trim() || 'General',
            difficulty: 'Varied',
            focus: 'Exam practice',
            score: { accel: 78, handling: 82, tech: 80, luxury: 74 },
            description: 'This paper has been added to your library so you can review, revise, and strengthen your exam preparation.'
        };

        papers.unshift(newPaper);
        renderCards();
        selectPaper(0);
        createUploadPreview(newPaper, 0);
        uploadForm.reset();
    };
    reader.readAsDataURL(file);
}

uploadForm.addEventListener('submit', handleUpload);
renderCards();
selectPaper(0);
