// Demo card flipping animation
document.querySelectorAll('.demo-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
});

// Auto-flip demo cards for presentation
let demoFlipInterval = setInterval(() => {
    document.querySelectorAll('.demo-card').forEach(card => {
        card.classList.toggle('flipped');
    });
}, 2000);

// Stop the auto-flip when user interacts
document.querySelector('.card-demo').addEventListener('mouseenter', () => {
    clearInterval(demoFlipInterval);
});

// Animation for features on scroll
const features = document.querySelectorAll('.feature');

const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

features.forEach(feature => {
    feature.style.opacity = 0;
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = 'all 0.5s ease';
    featureObserver.observe(feature);
});