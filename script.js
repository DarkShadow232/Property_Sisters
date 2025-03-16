// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
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
            
            // Change search form based on tab
            const tabText = this.textContent.trim().toLowerCase();
            console.log(`Search type changed to: ${tabText}`);
            
            // Change placeholder text based on tab
            const searchInput = document.querySelector('.search-input input');
            if (searchInput) {
                if (tabText === 'rent') {
                    searchInput.placeholder = 'Where do you want to rent?';
                } else if (tabText === 'new listings') {
                    searchInput.placeholder = 'Find new properties in...';
                } else {
                    searchInput.placeholder = 'Enter location, zipcode, or address';
                }
            }
        });
    });
    
    // Property favorite button functionality with animation
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            
            // Add animation class
            this.classList.add('favorite-animation');
            
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
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('favorite-animation');
            }, 500);
        });
    });
    
    // Enhanced testimonial slider
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    // Function to update active testimonial
    function setActiveTestimonial(index) {
        // Update dots
        testimonialDots.forEach(d => d.classList.remove('active'));
        testimonialDots[index].classList.add('active');
        
        // Scroll to the selected testimonial
        if (testimonialSlider && testimonialCards[index]) {
            const scrollPosition = testimonialCards[index].offsetLeft - testimonialSlider.offsetLeft;
            
            testimonialSlider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Click event for dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            setActiveTestimonial(index);
            clearInterval(testimonialInterval); // Stop auto-sliding
            
            // Restart auto-sliding after user interaction
            testimonialInterval = setInterval(nextTestimonial, 6000);
        });
    });
    
    // Automatic testimonial slider
    let currentTestimonial = 0;
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
        setActiveTestimonial(currentTestimonial);
    }
    
    // Change testimonial every 6 seconds
    let testimonialInterval = setInterval(nextTestimonial, 6000);
    
    // Handle manual scrolling of testimonials
    if (testimonialSlider) {
        testimonialSlider.addEventListener('scroll', function() {
            // Debounce the scroll event
            clearTimeout(testimonialSlider.scrollTimeout);
            testimonialSlider.scrollTimeout = setTimeout(() => {
                // Find which testimonial is most visible
                let closestCard = 0;
                let minDistance = Infinity;
                
                testimonialCards.forEach((card, index) => {
                    const cardPosition = card.offsetLeft - testimonialSlider.offsetLeft;
                    const distance = Math.abs(testimonialSlider.scrollLeft - cardPosition);
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestCard = index;
                    }
                });
                
                // Update the active dot without triggering scroll
                testimonialDots.forEach(d => d.classList.remove('active'));
                testimonialDots[closestCard].classList.add('active');
                currentTestimonial = closestCard;
                
                // Restart auto-sliding
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(nextTestimonial, 6000);
            }, 150);
        });
    }
    
    // Enhanced search functionality
    const searchForm = document.querySelector('.search-bar');
    const searchButton = document.querySelector('.search-btn');
    
    if (searchButton && searchForm) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get search input value
            const searchInput = document.querySelector('.search-input input').value;
            
            // Get selected filters
            const filters = Array.from(document.querySelectorAll('select.filter')).map(select => {
                return {
                    type: select.options[0].text.trim(),
                    value: select.options[select.selectedIndex].text.trim()
                };
            });
            
            // Get active search tab
            const activeTab = document.querySelector('.search-tab.active').textContent.trim();
            
            // Create search parameters object
            const searchParams = {
                type: activeTab,
                location: searchInput,
                filters: filters
            };
            
            // Log search parameters (in a real app, this would send a search request)
            console.log('Search Parameters:', searchParams);
            
            // Animate the search button
            searchButton.classList.add('searching');
            searchButton.textContent = 'Searching...';
            
            // Simulate search delay
            setTimeout(() => {
                // Reset button
                searchButton.classList.remove('searching');
                searchButton.textContent = 'Search';
                
                // Show a message to the user
                alert('Search functionality would be implemented in a real application. Check console for search parameters.');
            }, 1500);
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
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced animation on scroll with staggered effect
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.property-card, .service-card');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                // Add staggered delay based on index
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 100); // 100ms delay between each item
            }
        });
        
        // Animate other elements without stagger
        const otherElements = document.querySelectorAll('.section-header, .cta-content, .footer-column');
        otherElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check on page load
    setTimeout(animateOnScroll, 300);
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        /* Base animations */
        .property-card, .service-card, .section-header, .cta-content, .footer-column {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .property-card.visible, .service-card.visible, .section-header.visible, .cta-content.visible, .footer-column.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Favorite button animation */
        .favorite-animation {
            animation: pulse 0.5s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        /* Search button animation */
        .search-btn.searching {
            background-color: var(--primary-color);
            pointer-events: none;
        }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: var(--text-white);
                flex-direction: column;
                padding: 20px;
                box-shadow: var(--shadow-md);
                z-index: 99;
                text-align: center;
            }
            
            .nav-links.active {
                display: flex;
            }
            
            .nav-links li {
                margin: 10px 0;
            }
            
            .auth-buttons {
                display: none;
            }
            
            .nav-links.active + .auth-buttons {
                display: flex;
                justify-content: center;
                margin-top: 15px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 600) {
                hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            }
        });
    }
    
    // Property image hover effect
    const propertyImages = document.querySelectorAll('.property-image');
    propertyImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });
    
    // Initialize any tooltips or popovers
    const initTooltips = function() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.setAttribute('title', element.getAttribute('data-tooltip'));
        });
    };
    
    initTooltips();
});
