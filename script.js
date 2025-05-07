document.addEventListener('DOMContentLoaded', function() {

    initializeAnimations();

    function initializeAnimations() {
        console.log("Initializing animations...");
        
        // Hero section - Speech Animation
        const wavePaths = document.querySelectorAll('.wave');
        if (wavePaths && wavePaths.length > 0) {
            console.log(`Found ${wavePaths.length} wave elements`);
            wavePaths.forEach((wave, index) => {
                wave.style.animation = `wavePulse 2s ${index * 0.2}s infinite`;
            });
        } else {
            console.log("No wave elements found");
        }
        
        const pulseCircle = document.querySelector('.pulse');
        if (pulseCircle) {
            pulseCircle.style.animation = 'pulse 3s infinite';
            console.log("Pulse animation applied");
        }
        
        // Multilingual wheel animation
        const rotatingLanguages = document.querySelector('.rotating-languages');
        if (rotatingLanguages) {
            rotatingLanguages.style.animation = 'rotate 20s linear infinite';
            const langTexts = document.querySelectorAll('.lang-text');
            if (langTexts && langTexts.length > 0) {
                langTexts.forEach((text, index) => {
                    text.style.animation = `fadeInOut 4s ${index * 0.5}s infinite`;
                });
                console.log(`Applied animations to ${langTexts.length} language texts`);
            }
        }
        
        // Connection dots animation
        const dots = document.querySelectorAll('.dot');
        if (dots && dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.style.animation = `dotMove 2s ${index * 0.3}s infinite`;
            });
            console.log(`Applied animations to ${dots.length} dots`);
        }
        
        // Shield animation
        const shield = document.querySelector('.shield');
        if (shield) {
            shield.style.animation = 'shieldPulse 3s infinite';
            console.log("Shield animation applied");
        }
        
        // Lock animation
        const lock = document.querySelector('.lock');
        const lockBody = document.querySelector('.lock-body');
        if (lock && lockBody) {
            lock.style.animation = 'lockWiggle 2s infinite';
            lockBody.style.animation = 'lockWiggle 2s infinite';
            console.log("Lock animations applied");
        }
    }


    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Accessibility panel toggle
    const accessibilityBtn = document.querySelector('.accessibility-btn');
    const accessibilityPanel = document.querySelector('.accessibility-panel');
    
    accessibilityBtn.addEventListener('click', function() {
        accessibilityPanel.classList.toggle('active');
    });

    // Font size controls
    const fontSizeIncrease = document.querySelector('.font-size-increase');
    const fontSizeDecrease = document.querySelector('.font-size-decrease');
    const fontSizeReset = document.querySelector('.font-size-reset');
    
    let currentFontSize = parseInt(window.getComputedStyle(document.documentElement).fontSize);
    
    fontSizeIncrease.addEventListener('click', function() {
        if (currentFontSize < 22) {
            currentFontSize += 2;
            document.documentElement.style.fontSize = currentFontSize + 'px';
        }
    });
    
    fontSizeDecrease.addEventListener('click', function() {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            document.documentElement.style.fontSize = currentFontSize + 'px';
        }
    });
    
    fontSizeReset.addEventListener('click', function() {
        currentFontSize = 16;
        document.documentElement.style.fontSize = currentFontSize + 'px';
    });

    // Newsletter form submit
    const waitlistForm = document.getElementById('waitlist-form');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email-input').value;
            const submitButton = this.querySelector('button');
            const originalButtonText = submitButton.textContent;
            
            // Check if honeypot field is filled (likely a bot)
            const honeypot = document.querySelector('input[name="website"]');
            if (honeypot && honeypot.value) {
                // Silently fail - don't submit and don't show error
                return;
            }
            
            if (email && email.includes('@')) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Get script URL from config
                const scriptURL = config.GOOGLE_SCRIPT_URL;
                
                // Use URLSearchParams for more reliable form submission
                const formData = new URLSearchParams();
                formData.append('email', email);
                
                // Send the data
                fetch(scriptURL, {
                    method: 'POST',
                    mode: 'no-cors', // Important for cross-origin requests
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData
                })
                .then(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Subscribed!';
                    submitButton.style.backgroundColor = 'var(--success)';
                    document.getElementById('email-input').value = '';
                    
                    setTimeout(() => {
                        submitButton.textContent = originalButtonText;
                        submitButton.style.backgroundColor = '';
                    }, 3000);
                })
                .catch(error => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    console.error('Error!', error);
                    alert('Something went wrong. Please try again.');
                });
            } else {
                // Show error
                document.getElementById('email-input').style.borderColor = 'red';
                document.getElementById('email-input').style.boxShadow = '0 0 0 2px rgba(255, 0, 0, 0.2)';
                
                setTimeout(() => {
                    document.getElementById('email-input').style.borderColor = '';
                    document.getElementById('email-input').style.boxShadow = '';
                }, 3000);
            }
        });
    }

    // Testimonial slider auto-scroll
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    if (testimonialSlider && testimonialCards.length > 0) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            const scrollPosition = testimonialCards[currentIndex].offsetLeft - testimonialSlider.offsetLeft;
            
            testimonialSlider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }, 5000);
    }

    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .privacy-feature, .mission-image, .multilingual-image, .privacy-image');

    const animateOnScroll = () => {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Active navigation link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    } // This closing brace was missing in your original code

    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink(); // Initial check

    // Staggered animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animated');
        }, 100 + (index * 150));
    });

    // Staggered animation for privacy features
    const privacyFeatures = document.querySelectorAll('.privacy-feature');
    privacyFeatures.forEach((feature, index) => {
        setTimeout(() => {
            feature.classList.add('animated');
        }, 100 + (index * 150));
    });
});