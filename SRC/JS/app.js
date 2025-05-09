/**
 * Archivo principal de JavaScript con carga dinámica de certificados desde JSON
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

    /**
     * Funcionalidad de Modal para Certificaciones con carga desde JSON
     */

    // Elementos del DOM para el modal
    const modal = document.getElementById('certificateModal');
    const modalTitle = document.getElementById('modalTitle');
    const certificateViewer = document.getElementById('certificateViewer');
    const certificateImage = document.getElementById('certificateImage');
    const downloadBtn = document.getElementById('downloadCertificate');
    const closeBtn = document.querySelector('.modal__close');
    const certificationsGrid = document.querySelector('.certifications__grid');

    // Objeto para almacenar los certificados cargados desde el JSON
    let certificados = {};

    // Función para cargar certificados desde JSON
    function cargarCertificados() {
        fetch('build/data/certificates.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo de certificados');
                }
                return response.json();
            })
            .then(data => {
                // Crear un objeto de certificados para acceso rápido por ID
                data.certificates.forEach(cert => {
                    certificados[cert.id] = cert;
                });

                // Generar HTML para las tarjetas de certificación
                if (certificationsGrid) {
                    certificationsGrid.innerHTML = ''; // Limpiar contenido existente

                    data.certificates.forEach(cert => {
                        const cardHTML = `
                            <div class="cert__card" data-cert="${cert.id}">
                                <div class="cert__icon">
                                    <i class="${cert.icon}"></i>
                                </div>
                                <h3 class="cert__title">${cert.title}</h3>
                                <p class="cert__issuer">${cert.issuer}</p>
                                <p class="cert__date">${cert.date}</p>
                                <div class="cert__view">
                                    <i class="fa-solid fa-magnifying-glass-plus"></i> Ver certificado completo
                                </div>
                            </div>
                        `;

                        certificationsGrid.innerHTML += cardHTML;
                    });

                    // Una vez generadas las tarjetas, añadir los event listeners
                    configurarTarjetasCertificados();
                }
            })
            .catch(error => {
                console.error('Error cargando los certificados:', error);
                // Si hay un error cargando el JSON, usa los certificados predefinidos
                usarCertificadosPredefinidos();
            });
    }

    // Función de respaldo para usar certificados predefinidos si no se puede cargar el JSON
    function usarCertificadosPredefinidos() {
        certificados = {
            'react-fundamentals': {
                title: 'React Fundamentals',
                issuer: 'Meta (Facebook)',
                file: 'build/certificates/react-fundamentals.pdf',
                imageAlt: 'build/certificates/react-fundamentals.jpg'
            },
            'nodejs-backend': {
                title: 'Node.js Backend Development',
                issuer: 'Udemy',
                file: 'build/certificates/nodejs-backend.pdf',
                imageAlt: 'build/certificates/nodejs-backend.jpg'
            },
            'javascript-avanzado': {
                title: 'JavaScript Avanzado',
                issuer: 'Platzi',
                file: 'build/certificates/javascript-avanzado.pdf',
                imageAlt: 'build/certificates/javascript-avanzado.jpg'
            },
            'sql-database': {
                title: 'SQL & Database Management',
                issuer: 'SQL Academy',
                file: 'build/certificates/sql-database.pdf',
                imageAlt: 'build/certificates/sql-database.jpg'
            },
            'css-sass': {
                title: 'CSS Avanzado y SASS',
                issuer: 'Codecademy',
                file: 'build/certificates/css-sass.pdf',
                imageAlt: 'build/certificates/css-sass.jpg'
            },
            'git-github': {
                title: 'Control de Versiones con Git',
                issuer: 'GitHub Learning Lab',
                file: 'build/certificates/git-github.pdf',
                imageAlt: 'build/certificates/git-github.jpg'
            }
        };

        // Usar los certificados predefinidos directamente con las tarjetas existentes
        configurarTarjetasCertificados();
    }

    // Función para configurar los event listeners de las tarjetas
    function configurarTarjetasCertificados() {
        const certCards = document.querySelectorAll('.cert__card');

        if (certCards.length === 0) return;

        // Event listeners para las tarjetas de certificación
        certCards.forEach(card => {
            // Añadir un poco de animación al hacer hover en el ícono de lupa
            const viewBtn = card.querySelector('.cert__view');
            if (viewBtn) {
                const icon = viewBtn.querySelector('i');
                if (icon) {
                    // Añadir un ligero efecto de pulsación al pasar el mouse
                    icon.addEventListener('mouseenter', function () {
                        this.style.transform = 'scale(1.2)';
                    });

                    icon.addEventListener('mouseleave', function () {
                        this.style.transform = 'scale(1)';
                    });
                }
            }

            // Evento principal de clic en la tarjeta
            card.addEventListener('click', function () {
                const certId = this.getAttribute('data-cert');
                openModal(certId);
            });

            // Añadir efecto visual al pasar el mouse
            card.addEventListener('mouseenter', function () {
                const viewBtn = this.querySelector('.cert__view');
                if (viewBtn) {
                    viewBtn.classList.add('active');
                }
            });

            card.addEventListener('mouseleave', function () {
                const viewBtn = this.querySelector('.cert__view');
                if (viewBtn) {
                    viewBtn.classList.remove('active');
                }
            });
        });
    }

    // Comprobar si los elementos del modal existen en la página
    if (modal && modalTitle && certificateViewer && certificateImage && downloadBtn && closeBtn) {
        // Cargar los certificados desde el JSON
        cargarCertificados();

        // Función para abrir el modal
        function openModal(certId) {
            if (certificados[certId]) {
                const cert = certificados[certId];

                // Actualizar título
                modalTitle.textContent = `${cert.title} - ${cert.issuer}`;

                // Actualizar visor de PDF y alternativa de imagen
                certificateViewer.setAttribute('data', cert.file);
                certificateImage.setAttribute('src', cert.imageAlt);
                certificateImage.setAttribute('alt', cert.title);

                // Actualizar enlace de descarga
                downloadBtn.setAttribute('href', cert.file);
                downloadBtn.setAttribute('download', `${cert.title}.pdf`);

                // Mostrar modal con animación
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo

                // Efecto de zoom en el botón al abrir
                const viewBtns = document.querySelectorAll('.cert__view');
                viewBtns.forEach(btn => btn.classList.remove('active'));

                // Mostrar mensaje temporal para informar que se puede cerrar haciendo clic fuera
                setTimeout(() => {
                    modal.classList.add('hint-visible');

                    // Ocultar el mensaje después de 5 segundos
                    setTimeout(() => {
                        modal.classList.remove('hint-visible');
                    }, 5000);
                }, 1000);

                // Detectar si el PDF carga correctamente
                setTimeout(() => {
                    try {
                        if (certificateViewer.contentDocument && certificateViewer.contentDocument.body.childElementCount === 0) {
                            // Si el PDF no carga, mostrar la imagen alternativa
                            certificateViewer.style.display = 'none';
                            document.querySelector('.certificate-fallback').style.display = 'flex';
                        } else {
                            certificateViewer.style.display = 'block';
                            document.querySelector('.certificate-fallback').style.display = 'none';
                        }
                    } catch (error) {
                        // Si hay un error de seguridad al acceder al contentDocument,
                        // probablemente estamos cargando un PDF de otro dominio
                        console.log('Usando visualizador de PDF embebido del navegador');
                    }
                }, 1000);
            }
        }

        // Función para cerrar el modal con animación
        function closeModal() {
            // Primero añadir clase para animación de salida
            modal.classList.add('closing');

            // Esperar a que termine la animación
            setTimeout(() => {
                modal.classList.remove('show');
                modal.classList.remove('closing');
                modal.classList.remove('hint-visible');
                document.body.style.overflow = 'auto'; // Restaurar scroll

                // Limpiar contenido después de cerrar
                setTimeout(() => {
                    if (!modal.classList.contains('show')) {
                        certificateViewer.setAttribute('data', '');
                        certificateImage.setAttribute('src', '');
                    }
                }, 300);
            }, 300);
        }

        // Cerrar modal con el botón X
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation(); // Evitar que el clic se propague al modal
            closeModal();
        });

        // Cerrar modal al hacer clic fuera del contenido
        modal.addEventListener('click', function (e) {
            // Cerrar solo si se hizo clic fuera del contenido del modal
            if (e.target === modal) {
                closeModal();
            }
        });

        // Evitar que el clic dentro del contenido cierre el modal
        const modalContent = document.querySelector('.modal__content');
        if (modalContent) {
            modalContent.addEventListener('click', function (e) {
                e.stopPropagation(); // Detener la propagación del clic
            });
        }

        // Cerrar modal con la tecla ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        // Añadir efecto al botón de descarga
        if (downloadBtn) {
            downloadBtn.addEventListener('mouseenter', function () {
                this.classList.add('btn--hover');
            });

            downloadBtn.addEventListener('mouseleave', function () {
                this.classList.remove('btn--hover');
            });
        }
    }
});