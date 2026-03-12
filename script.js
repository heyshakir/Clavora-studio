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
        'img-port-4': 'url("portfolio_darkmode.png")'
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
    const sectionsToReveal = document.querySelectorAll('.motivation-content, .pricing-header, .pricing-cards, .footer-top, .portfolio-header, .portfolio-card');
    sectionsToReveal.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // 4. Modal Logic
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

    // Handle form submission (prevent default and close for demo)
    bookCallForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        alert('Thank you! Your request has been submitted.');
        bookCallForm.reset();
        closeModal();
    });
});
