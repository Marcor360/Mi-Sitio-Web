/**
 * Archivo principal de JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const headerNav = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const skillBars = document.querySelectorAll('.skill__progress');
    const contactForm = document.getElementById('contactForm');

    // Toggle del menú móvil
    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            headerNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth < 768) { // Solo en móvil
                menuToggle.classList.remove('active');
                headerNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Animación de barras de habilidades
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            // Resetear para animación
            bar.style.width = '0';

            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }

    // Ejecutar animación cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Manejar envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Aquí normalmente enviarías los datos del formulario a tu backend
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());

            // Por ahora, solo mostramos un mensaje de éxito simulado
            alert('¡Mensaje enviado con éxito!');
            contactForm.reset();
        });
    }

    // Animación de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset para el header fijo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});