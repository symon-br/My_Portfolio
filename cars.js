const cars = [
    {
        name: 'Apex GT',
        tagline: 'The ultimate blend of speed, tech, and luxury.',
        category: 'Hypercar',
        image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200',
        features: ['V8 twin-turbo', 'All-wheel drive', 'Carbon-fiber frame'],
        topSpeed: '320 km/h',
        acceleration: '2.9 sec',
        range: '520 km',
        engine: '4.0L V8 Twin Turbo',
        drive: 'AWD',
        interior: 'Carbon fiber + Alcantara',
        score: { accel: 96, handling: 92, tech: 90, luxury: 88 },
        description: 'Precision-engineered for instant power and razor-sharp handling, this hypercar delivers an adrenaline rush with premium comfort and intelligent driving features.'
    },
    {
        name: 'Nova Cruiser',
        tagline: 'A modern GT with polished comfort and performance.',
        category: 'Grand Tourer',
        image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200',
        features: ['Adaptive cruise', 'Luxury cabin', 'Hybrid efficiency'],
        topSpeed: '295 km/h',
        acceleration: '3.4 sec',
        range: '650 km',
        engine: '3.2L V6 Hybrid',
        drive: 'RWD',
        interior: 'Leather + Ambient lighting',
        score: { accel: 86, handling: 88, tech: 94, luxury: 92 },
        description: 'Designed for long-distance cruises, the Nova Cruiser pairs elegant comfort with an advanced hybrid powertrain, delivering a smooth ride and high-tech cockpit experience.'
    },
    {
        name: 'Volt Racer',
        tagline: 'Electric precision with instant response.',
        category: 'Electric',
        image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200',
        features: ['Dual motor', 'Instant torque', 'Smart cockpit'],
        topSpeed: '285 km/h',
        acceleration: '2.6 sec',
        range: '540 km',
        engine: 'Dual electric motors',
        drive: 'AWD',
        interior: 'Minimalist digital cabin',
        score: { accel: 98, handling: 89, tech: 96, luxury: 84 },
        description: 'This electric champion delivers shockingly fast acceleration and futuristic controls, built for drivers who want maximum performance with zero emissions.'
    },
    {
        name: 'Titan SUV',
        tagline: 'Premium utility, rugged comfort, and intelligent safety.',
        category: 'SUV',
        image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200',
        features: ['Off-road mode', 'Smart assist', 'Spacious interior'],
        topSpeed: '250 km/h',
        acceleration: '4.5 sec',
        range: '610 km',
        engine: '4.6L V8 Turbo',
        drive: 'AWD',
        interior: 'Luxury suede seating',
        score: { accel: 80, handling: 86, tech: 88, luxury: 90 },
        description: 'A full-size performance SUV that balances rugged capability with refined luxury, perfect for adventurous drivers who value space and intelligent systems.'
    }
];

const grid = document.querySelector('.model-grid');
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

    const duration = 1200; // milliseconds
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
            
            // Update percentage text
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

function createCard(car, index) {
    const card = document.createElement('article');
    card.className = 'model-card';
    card.dataset.index = index;
    card.innerHTML = `
        <div class="model-card-image">
            <img src="${car.image}" alt="${car.name} photo" loading="lazy">
        </div>
        <h3>${car.name}</h3>
        <p>${car.tagline}</p>
        <span class="model-tag">${car.category}</span>
        <div class="feature-list">
            ${car.features.map(feature => `<div class="feature-item">${feature}</div>`).join('')}
        </div>
    `;
    card.addEventListener('click', () => selectCar(index));
    return card;
}

function renderCards() {
    const cards = cars.map((car, index) => createCard(car, index));
    grid.append(...cards);
}

function selectCar(index) {
    const active = document.querySelector('.model-card.active');
    if (active) active.classList.remove('active');

    const selectedCard = grid.querySelector(`.model-card[data-index='${index}']`);
    selectedCard.classList.add('active');

    const car = cars[index];
    detailName.textContent = car.name;
    detailTagline.textContent = car.tagline;
    detailTopSpeed.textContent = car.topSpeed;
    detailAcceleration.textContent = car.acceleration;
    detailRange.textContent = car.range;
    detailEngine.textContent = car.engine;
    detailDrive.textContent = car.drive;
    detailInterior.textContent = car.interior;
    detailDescription.textContent = car.description;
    detailImage.src = car.image;
    detailImage.alt = `${car.name} photo`;

    // Reset bars to 0 before animating
    barAccel.style.width = '0%';
    barHandling.style.width = '0%';
    barTech.style.width = '0%';
    barLuxury.style.width = '0%';
    
    // Animate to target values
    setTimeout(() => {
        animateProgressBars(car.score);
    }, 50);
}

renderCards();
selectCar(0);
