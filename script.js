document.addEventListener('DOMContentLoaded', function() {
    // Main Product Carousel
    const container = document.querySelector('.carousel-container');
    if (!container) return;

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.product-card');
    const cardCount = cards.length;
    
    if (cardCount === 0) return;

    const cardWidth = cards[0].offsetWidth + 20; // width + gap
    let isAnimating = false;
    let currentIndex = 0;

    if (cardCount === 5) {
        const container = document.querySelector('.carousel-container');
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone');
            container.appendChild(clone);
        });
    }

    // Function to update carousel position
    function updateCarousel(direction) {
        if (isAnimating) return;
        isAnimating = true;

        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % cardCount;
            container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        } else {
            currentIndex = (currentIndex - 1 + cardCount) % cardCount;
            container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }

        if (cardCount === 5) {
            setTimeout(() => {
                if (direction === 'next' && currentIndex === 0) {
                    container.scrollTo({ left: 0, behavior: 'instant' });
                } else if (direction === 'prev' && currentIndex === cardCount - 1) {
                    container.scrollTo({ left: cardWidth * cardCount, behavior: 'instant' });
                }
                isAnimating = false;
            }, 500);
        } else {
            setTimeout(() => { isAnimating = false; }, 500);
        }

        updateFeaturedCard();
    }

    function updateFeaturedCard() {
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        let closestCard = null;
        let smallestDistance = Infinity;
        
        document.querySelectorAll('.product-card').forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(containerCenter - cardCenter);
            
            card.classList.remove('featured');
            card.style.transform = 'scale(1)';
            
            if (distance < smallestDistance && !card.classList.contains('clone')) {
                smallestDistance = distance;
                closestCard = card;
            }
        });
        
        if (closestCard) {
            closestCard.classList.add('featured');
            closestCard.style.transform = 'scale(1.1)';
        }
    }

    prevBtn.addEventListener('click', () => updateCarousel('prev'));
    nextBtn.addEventListener('click', () => updateCarousel('next'));

    // Update on scroll
    container.addEventListener('scroll', updateFeaturedCard);

    updateFeaturedCard();

    if (cardCount === 5) {
        container.addEventListener('scroll', function() {
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;
            
            if (scrollLeft >= scrollWidth - clientWidth - cardWidth) {
                setTimeout(() => {
                    container.scrollTo({ left: 0, behavior: 'instant' });
                }, 500);
            }

            else if (scrollLeft <= 0) {
                setTimeout(() => {
                    container.scrollTo({ left: scrollWidth / 2, behavior: 'instant' });
                }, 500);
            }
        });
    }

    const productSets = document.querySelector('.product-sets');
    if (productSets) {
        const setWidth = 296;
        document.querySelector('.substance-section .next-btn')?.addEventListener('click', function() {
            productSets.scrollBy({
                left: setWidth * 2,
                behavior: 'smooth'
            });
        });
    }
    

    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log('Login attempt:', { email, password });
            alert('Login functionality would be implemented here.');
        });
    }
});