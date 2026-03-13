document.addEventListener('DOMContentLoaded', () => {
    // 1. Assign generated images to the grid cells and office mockup
    const imageMap = {
        'img-phone-fold': 'url("phone_mockup.png")',
        'img-laptop-open': 'url("laptop_clean.png")',
        'img-phone-stand': 'url("phone_mockup.png")', // Reusing phone for stand
        'img-laptop-red-glow': 'url("laptop_orange_glow.png")',
        'img-laptop-dark': 'url("laptop_orange_glow.png")', // Reusing dark laptop
        'img-laptop-red-lines': 'url("laptop_orange_glow.png")',
        'img-laptop-corner': 'url("laptop_clean.png")', // Reusing clean laptop
        'img-office-bw': 'url("office_bw.png")',
        'img-port-1': 'url("portfolio_dashboard.png")',
        'img-port-2': 'url("portfolio_mobile.png")',
        'img-port-3': 'url("portfolio_ecommerce.png")',
        'img-port-4': 'url("portfolio_darkmode.png")',
        'portfolio-img-bg': 'url("portfolio_dashboard.png")',
        'work-1-p1': 'url("portfolio_dashboard.png")',
        'work-1-p2': 'url("laptop_clean.png")',
        'work-1-p3': 'url("phone_mockup.png")',
        'work-2-p1': 'url("portfolio_mobile.png")',
        'work-2-p2': 'url("laptop_orange_glow.png")',
        'work-2-p3': 'url("phone_mockup.png")',
        'work-3-p1': 'url("portfolio_ecommerce.png")',
        'work-3-p2': 'url("laptop_clean.png")',
        'work-3-p3': 'url("office_bw.png")'
    };

    for (const [id, url] of Object.entries(imageMap)) {
        const el = document.getElementById(id);
        if (el) {
            el.style.backgroundImage = url;
        }
    }

    // 2. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Simple reveal animation on scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to sections
    const sectionsToReveal = document.querySelectorAll('.motivation-content, .pricing-header, .pricing-cards, .footer-top, .portfolio-header, .portfolio-card, .service-item-detailed, .benefit-card, .services-hero, .reviews-header, .portfolio-hero, .portfolio-card-detailed, .work-stack-card, .works-header-centered');
    sectionsToReveal.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // 4. Portfolio Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card-detailed');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || filter === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // 5. Mobile Menu Logic
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 6. Sticky Stack Scaling Effect
    const stackCards = document.querySelectorAll('.work-stack-card');
    if (stackCards.length > 0) {
        window.addEventListener('scroll', () => {
            stackCards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();

                // If the card is stuck (top position reached)
                if (rect.top <= 81 && index < stackCards.length - 1) {
                    // Small scale down effect for cards underneath
                    const nextCard = stackCards[index + 1];
                    const nextCardRect = nextCard.getBoundingClientRect();

                    // Ratio of how much the next card has overlapped
                    const overlapRatio = Math.max(0, Math.min(1, (window.innerHeight - nextCardRect.top) / window.innerHeight));
                    const scale = 1 - (overlapRatio * 0.05);
                    const brightness = 1 - (overlapRatio * 0.2);

                    card.style.transform = `scale(${scale})`;
                    card.style.filter = `brightness(${brightness})`;
                } else {
                    card.style.transform = 'scale(1)';
                    card.style.filter = 'brightness(1)';
                }
            });
        });
    }

    // 5. Modal Logic
    const modalOverlay = document.getElementById('bookCallModal');
    const closeModalBtn = document.getElementById('closeModal');
    const bookCallForm = document.getElementById('bookCallForm');

    // Open modal when any 'Book Call' button is clicked
    document.querySelectorAll('a[href="#book-call"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
        });
    });

    // Close modal functions
    const closeModal = () => {
        modalOverlay.classList.remove('active');
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Handle form submission to Google Sheets
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxekkWPEu1ZuTnH4T6F7rGeyUdPu1PbLe3f-5hrS3ZhWwsH4Igu0yhiXDL5QkV-uDlA/exec';

    bookCallForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const inputs = bookCallForm.querySelectorAll('input');

        inputs.forEach(input => {
            const formGroup = input.parentElement;
            if (!input.checkValidity()) {
                formGroup.classList.add('invalid');
                isValid = false;
            } else {
                formGroup.classList.remove('invalid');
            }
        });

        if (!isValid) return;

        const submitBtn = bookCallForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(bookCallForm)
        })
            .then(response => {
                alert('Thank you! Your request has been submitted successfully.');
                bookCallForm.reset();
                closeModal();
                // Clear any validation classes
                bookCallForm.querySelectorAll('.form-group').forEach(group => group.classList.remove('invalid'));
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('Something went wrong. Please try again later.');
            })
            .finally(() => {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
    });

    // Add real-time validation feedback
    bookCallForm.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            // Strictly enforce numeric only and max 10 digits for mobile
            if (input.id === 'mobile') {
                input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
            }

            const formGroup = input.parentElement;
            if (input.checkValidity()) {
                formGroup.classList.remove('invalid');
            }
        });
    });
});
