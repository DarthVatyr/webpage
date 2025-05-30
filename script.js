/* script.js */

// Step 1: Toggle navigation menu visibility
function toggleMenu() {
    const nav = document.querySelector('.nav-menu');
    nav.classList.toggle('active');
}

document.querySelector('.hamburger').addEventListener('click', toggleMenu);

// Step 2: Smooth scrolling for navigation links
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// Step 3: Filter projects by category
function filterProjects(category) {
    document.querySelectorAll('.project').forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = '';
        } else {
            project.style.display = 'none';
        }
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        filterProjects(this.dataset.category);
    });
});

// Step 4: Lightbox effect for project images
function openLightbox(imgSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imgSrc}" alt="Project Image">
            <span class="lightbox-close">&times;</span>
        </div>
    `;
    document.body.appendChild(lightbox);

    lightbox.querySelector('.lightbox-close').onclick = () => lightbox.remove();
    lightbox.onclick = (e) => {
        if (e.target === lightbox) lightbox.remove();
    };
}

document.querySelectorAll('.project img').forEach(img => {
    img.addEventListener('click', function() {
        openLightbox(this.src);
    });
});

// Step 5: Contact form validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;

        const name = contactForm.querySelector('[name="name"]');
        const email = contactForm.querySelector('[name="email"]');
        const message = contactForm.querySelector('[name="message"]');

        // Reset previous errors
        contactForm.querySelectorAll('.error').forEach(el => el.textContent = '');

        if (!name.value.trim()) {
            valid = false;
            name.nextElementSibling.textContent = 'Name is required.';
        }

        if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
            valid = false;
            email.nextElementSibling.textContent = 'Valid email is required.';
        }

        if (!message.value.trim()) {
            valid = false;
            message.nextElementSibling.textContent = 'Message is required.';
        }

        if (valid) {
            // Simulate successful submission
            contactForm.reset();
            alert('Thank you for your message!');
        }
    });

    // Real-time feedback
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.nextElementSibling.textContent = '';
            }
        });
    });
}

// Step 6: Debugging helpers
// Uncomment the following line to debug
// console.log('script.js loaded');