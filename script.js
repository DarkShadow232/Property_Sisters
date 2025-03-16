// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Search tab functionality
    const searchTabs = document.querySelectorAll('.search-tab');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            searchTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // You can add more functionality here to change search form based on tab
            const tabType = this.getAttribute('data-tab');
            console.log(`Search type changed to: ${tabType}`);
            
            // Example: Change placeholder text based on tab
            const searchInput = document.querySelector('.search-input input');
            if (searchInput) {
                if (tabType === 'rent') {
                    searchInput.placeholder = 'Where do you want to rent?';
                } else {
                    searchInput.placeholder = 'Enter location, ZIP code, or address';
                }
            }
        });
    });
    
    // Property favorite button functionality
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            
            // Toggle heart icon
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ef4444'; // Red color for favorited
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = ''; // Reset to default
            }
        });
    });
    
    // Simple testimonial slider
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            testimonialDots.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked dot
            this.classList.add('active');
            
            // Calculate the scroll position
            const testimonialSlider = document.querySelector('.testimonial-slider');
            if (testimonialSlider && testimonialCards[index]) {
                const scrollPosition = testimonialCards[index].offsetLeft - testimonialSlider.offsetLeft;
                
                // Smooth scroll to the selected testimonial
                testimonialSlider.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Automatic testimonial slider
    let currentTestimonial = 0;
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
        testimonialDots[currentTestimonial].click();
    }
    
    // Change testimonial every 5 seconds
    const testimonialInterval = setInterval(nextTestimonial, 5000);
    
    // Stop auto-sliding when user interacts with dots
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            clearInterval(testimonialInterval);
        });
    });
    
    // Search functionality
    const searchForm = document.querySelector('.search-bar');
    const searchButton = document.querySelector('.search-btn');
    
    if (searchButton && searchForm) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get search input value
            const searchInput = document.querySelector('.search-input input').value;
            
            // Get selected filters
            const propertyType = document.querySelector('select.filter:nth-child(1)').value;
            const priceRange = document.querySelector('select.filter:nth-child(2)').value;
            const bedrooms = document.querySelector('select.filter:nth-child(3)').value;
            const bathrooms = document.querySelector('select.filter:nth-child(4)').value;
            
            // Get active search tab
            const activeTab = document.querySelector('.search-tab.active').getAttribute('data-tab');
            
            // Log search parameters (in a real app, this would send a search request)
            console.log('Search Parameters:', {
                type: activeTab,
                location: searchInput,
                propertyType,
                priceRange,
                bedrooms,
                bathrooms
            });
            
            // Show a message to the user
            alert('Search functionality would be implemented in a real application. Check console for search parameters.');
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.property-card, .service-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check on page load
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .property-card, .service-card, .testimonial-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .property-card.visible, .service-card.visible, .testimonial-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Add mobile menu CSS
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 70px;
                left: 0;
                right: 0;
                background-color: white;
                padding: 20px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                z-index: 100;
            }
        }
    `;
    document.head.appendChild(mobileStyle);
});
