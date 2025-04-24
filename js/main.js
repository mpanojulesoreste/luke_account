// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Show active section in navigation based on scroll position
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav ul li a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Activate on scroll if we're on a page with sections that have IDs
    if (document.querySelectorAll('section[id]').length > 0) {
        window.addEventListener('scroll', setActiveNavItem);
    }
    
    // Add animation to cards and elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.theme-card, .principle-card, .transformation-card, .context-card, .journal-entry, .timeline-item, .marker-card');
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .theme-card, .principle-card, .transformation-card, .context-card, .journal-entry, .timeline-item, .marker-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .theme-card.animate, .principle-card.animate, .transformation-card.animate, .context-card.animate, .journal-entry.animate, .timeline-item.animate, .marker-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Handle mobile navigation toggle if it exists
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            nav.classList.toggle('show');
        });
    }
});

// Add additional CSS for mobile responsiveness
(function() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            nav ul {
                display: flex;
                flex-direction: column;
                position: absolute;
                background: white;
                width: 100%;
                top: 100%;
                left: 0;
                padding: 20px;
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                transform: translateY(-100%);
                opacity: 0;
                pointer-events: none;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            nav ul.show {
                transform: translateY(0);
                opacity: 1;
                pointer-events: all;
            }
            
            .mobile-nav-toggle {
                display: block;
            }
            
            .principle-card, .transformation-card, .context-card {
                flex-direction: column;
            }
            
            .principle-number, .before, .after {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);
})();

// Add mobile navigation toggle button
(function() {
    const header = document.querySelector('header .container');
    if (header && !document.querySelector('.mobile-nav-toggle')) {
        const mobileNavToggle = document.createElement('button');
        mobileNavToggle.className = 'mobile-nav-toggle';
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileNavToggle.style.display = 'none'; // Hide by default, show in media query
        header.appendChild(mobileNavToggle);
        
        // Add style for the toggle button
        const style = document.createElement('style');
        style.textContent = `
            .mobile-nav-toggle {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--primary-color);
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .mobile-nav-toggle {
                    display: block;
                }
            }
        `;
        document.head.appendChild(style);
    }
})();