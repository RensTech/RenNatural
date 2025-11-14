// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - Initializing RenNatural website');
    
    // FIX: Force load and display all images immediately
    function loadAndDisplayAllImages() {
        const allImages = document.querySelectorAll('img');
        console.log('Found images:', allImages.length);
        
        allImages.forEach((img, index) => {
            // Immediately set images to visible
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.display = 'block';
            
            // Log image status for debugging
            if (img.complete) {
                console.log(`Image ${index} (${img.src}) - Already loaded`);
            } else {
                img.addEventListener('load', function() {
                    console.log(`Image ${index} (${this.src}) - Loaded successfully`);
                    this.style.opacity = '1';
                    this.style.visibility = 'visible';
                    this.style.display = 'block';
                });
                
                img.addEventListener('error', function() {
                    console.error(`Image ${index} (${this.src}) - Failed to load`);
                    // Still show placeholder with alt text
                    this.style.opacity = '1';
                    this.style.visibility = 'visible';
                    this.style.display = 'block';
                });
            }
        });
        
        // Also force display image containers
        const imageContainers = document.querySelectorAll('.hero-image, .about-image, .product-image, .ingredient-icon');
        imageContainers.forEach(container => {
            container.style.opacity = '1';
            container.style.visibility = 'visible';
            container.style.display = 'flex';
        });
    }

    // Call image loading function immediately
    loadAndDisplayAllImages();

    // Navigation Toggle for Mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.querySelector('body');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    }

    // Animasi untuk konten utama saat pertama load
    function initPageAnimations() {
        console.log('Initializing page animations');
        
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        const sections = document.querySelectorAll('.section');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s ease-out';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (heroImage) {
            heroImage.style.opacity = '1'; // Force visible
            heroImage.style.visibility = 'visible';
            heroImage.style.transform = 'translateY(0)';
        }
        
        // Animasi untuk sections lainnya
        sections.forEach((section, index) => {
            if (!section.classList.contains('hero')) {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    section.style.transition = 'all 0.8s ease-out';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 800 + (index * 200));
            }
        });
    }
    
    // Panggil fungsi animasi
    initPageAnimations();
    
    // Scroll Reveal Animation untuk saat scroll
    const revealElements = document.querySelectorAll('.section, .section-header, .hero-content, .about-content, .ingredients-grid, .benefits-grid, .products-grid');
    
    // Create Intersection Observer untuk scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all elements that should be revealed on scroll
    revealElements.forEach(element => {
        if (!element.classList.contains('hero') && !element.classList.contains('hero-content') && !element.classList.contains('hero-image')) {
            element.classList.add('reveal');
            observer.observe(element);
        }
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // WhatsApp button functionality
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn, .whatsapp-float');
    const whatsappMessage = "Hai%20RenNatural%2C%20saya%20ingin%20bertanya%20terlebih%20dahulu%20tentang%20minuman%20ini";
    const whatsappNumber = "6287740812777";
    
    whatsappButtons.forEach(button => {
        button.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        // Add click tracking
        button.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
        });
    });
    
    // Final image check after everything loads
    window.addEventListener('load', function() {
        console.log('Window fully loaded - Final image check');
        loadAndDisplayAllImages();
        
        // Force one more check after a short delay
        setTimeout(() => {
            console.log('Final force display of images');
            document.querySelectorAll('img').forEach(img => {
                img.style.opacity = '1';
                img.style.visibility = 'visible';
                img.style.display = 'block';
            });
        }, 1000);
    });

    // Additional safety check for images
    setTimeout(() => {
        console.log('Safety check - Ensuring all images are visible');
        loadAndDisplayAllImages();
    }, 2000);
});

// Emergency fallback - if DOMContentLoaded doesn't fire
setTimeout(() => {
    if (document.readyState === 'loading') {
        console.log('Emergency image display fallback');
        document.querySelectorAll('img').forEach(img => {
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.display = 'block';
        });
    }
}, 3000);