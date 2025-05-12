/**
 * Archivo principal de JavaScript
 * Marco Antonio Rulfo Castro - Portafolio Web
 */

document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const headerNav = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const skillBars = document.querySelectorAll('.skill__progress');
    const contactForm = document.getElementById('contactForm');
    const certificationsGrid = document.querySelector('.certifications__grid');

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

    // Efecto hover para las tarjetas de experiencia
    const experienceCards = document.querySelectorAll('.experience__card');
    if (experienceCards.length > 0) {
        experienceCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                card.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * Funcionalidad para cargar certificaciones
     */

    // Certificados de respaldo en caso de que falle la carga del JSON
    const certificadosRespaldo = [
        {
            id: "etica-uso-responsable-datos",
            title: "Ética: Uso Responsable de Datos",
            issuer: "Universidad Tres Culturas",
            date: "Abril 2025",
            icon: "fa-solid fa-shield-alt",
            url: "https://acreditta.com/credential/cf9e73af-9248-4fb5-8a17-429d3b848844",
            description: "Cuentas con habilidades para identificar sesgos, tomar decisiones informadas y aplicar principios éticos en el uso de inteligencia artificial, machine learning y la recolección responsable de datos.",
            tags: ["Data Science", "Inteligencia Artificial", "Análisis de datos"]
        },
        {
            id: "bases-conceptos-ia",
            title: "Bases y conceptos clave de la IA",
            issuer: "Universidad Tres Culturas",
            date: "Marzo 2025",
            icon: "fa-solid fa-robot",
            url: "https://acreditta.com/credential/04615b1d-713e-423a-aabd-040dee2d62d6",
            description: "Este certificado acredita que el participante ha adquirido conocimientos sobre los principios fundamentales de la inteligencia artificial, incluyendo sus conceptos clave, historia, algoritmos básicos y aplicaciones.",
            tags: ["Inteligencia Artificial"]
        },
        {
            id: "fundamentos-analisis-datos",
            title: "Fundamentos del Análisis de Datos",
            issuer: "Universidad Tres Culturas",
            date: "Abril 2025",
            icon: "fa-solid fa-chart-line",
            url: "https://acreditta.com/credential/5ee14805-b071-4e3e-be0d-598db546d2f2",
            description: "Cuentas conocimientos esenciales en análisis de datos, abarcando su evolución, metodologías y aplicaciones. Acredita competencias en investigación cualitativa y cuantitativa, diseño de proyectos de análisis y procesamiento de datos.",
            tags: ["Inteligencia Artificial", "Análisis de datos"]
        },
        {
            id: "principios-data-science",
            title: "Principios de Data Science",
            issuer: "Universidad Tres Culturas",
            date: "Abril 2025",
            icon: "fa-solid fa-database",
            url: "https://acreditta.com/credential/2deb534f-8cca-4989-8209-17bd93bcaae5",
            description: "Cuentas con los conocimientos fundamentales sobre adquisición, limpieza y análisis exploratorio de datos, así como principios de estadística y probabilidad. Este curso proporciona una base sólida para la interpretación y modelado de datos.",
            tags: ["Data Science", "Inteligencia Artificial", "Análisis de datos"]
        }
    ];

    // Función para cargar certificados desde JSON
    function cargarCertificados() {
        if (!certificationsGrid) return;

        fetch('build/data/certificates.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo de certificados');
                }
                return response.json();
            })
            .then(data => {
                renderizarCertificados(data.certificates);
            })
            .catch(error => {
                console.error('Error cargando los certificados:', error);
                // Si hay un error, usar certificados de respaldo
                renderizarCertificados(certificadosRespaldo);
            });
    }

    // Función para renderizar los certificados en el DOM
    function renderizarCertificados(certificados) {
        if (!certificationsGrid) return;

        certificationsGrid.innerHTML = ''; // Limpiar contenido existente

        certificados.forEach(cert => {
            // Crear HTML para las etiquetas
            let tagsHTML = '';
            if (cert.tags && cert.tags.length > 0) {
                // Tomar solo las primeras 2 etiquetas para no sobrecargar visualmente
                const displayTags = cert.tags.slice(0, 2);
                tagsHTML = `
                    <div class="cert__tags">
                        ${displayTags.map(tag => `<span class="cert__tag">${tag}</span>`).join('')}
                    </div>
                `;
            }

            const cardHTML = `
                <a href="${cert.url}" class="cert__card" target="_blank" rel="noopener noreferrer">
                    <div class="cert__icon">
                        <i class="${cert.icon}"></i>
                    </div>
                    <h3 class="cert__title">${cert.title}</h3>
                    <p class="cert__issuer">${cert.issuer}</p>
                    <p class="cert__date">${cert.date}</p>
                    ${tagsHTML}
                    <div class="cert__view">
                        <i class="fa-solid fa-external-link-alt"></i> Ver certificado
                    </div>
                </a>
            `;

            certificationsGrid.innerHTML += cardHTML;
        });

        // Añadir efecto hover a los iconos
        const certCards = document.querySelectorAll('.cert__card');
        certCards.forEach(card => {
            const viewEl = card.querySelector('.cert__view');
            if (viewEl) {
                const icon = viewEl.querySelector('i');
                if (icon) {
                    card.addEventListener('mouseenter', function () {
                        icon.style.transform = 'translateX(3px)';
                    });

                    card.addEventListener('mouseleave', function () {
                        icon.style.transform = 'translateX(0)';
                    });
                }
            }
        });
    }

    // Iniciar la carga de certificados
    cargarCertificados();

    /**
     * Funcionalidad para el modal de detalles de experiencia
     */

    // Datos de experiencia para el modal
    const experienciasData = [
        {
            id: 'becario-sistemas',
            titulo: 'Becario de Sistemas',
            empresa: 'USA SHOES',
            fecha: 'Octubre 2023 - Febrero 2024',
            descripcion: `
                <p>Colaboré en la implementación y mantenimiento de sistemas informáticos, brindando soporte técnico a usuarios finales y participando en proyectos de desarrollo web con tecnologías modernas.</p>
                <p>Realicé análisis de procesos empresariales para identificar oportunidades de mejora y automatización.</p>
                <p>Trabajé con herramientas de gestión de inventario y sistemas ERP para optimizar procesos internos de la empresa.</p>
            `,
            habilidades: ['Soporte TI', 'HTML/CSS', 'JavaScript', 'SQL', 'Sistemas ERP']
        },
        {
            id: 'soporte-ti',
            titulo: 'Encargado de Soporte TI',
            empresa: 'AICCA',
            fecha: 'Junio 2022 - Julio 2023',
            descripcion: `
                <p>Lideré el área de soporte técnico, gestionando un equipo de 3 personas para garantizar el funcionamiento óptimo de la infraestructura informática de la empresa.</p>
                <p>Implementé soluciones para mejorar la eficiencia operativa y reduje en un 30% el tiempo de resolución de incidencias.</p>
                <p>Coordiné proyectos de actualización de hardware y software para mejorar la productividad empresarial.</p>
            `,
            habilidades: ['Gestión de equipos', 'Redes', 'Windows Server', 'Help Desk', 'Inventario TI']
        },
        {
            id: 'desarrollador-web',
            titulo: 'Desarrollador Web',
            empresa: 'Freelance',
            fecha: 'Enero 2022 - Presente',
            descripcion: `
                <p>Desarrollo de sitios web y aplicaciones personalizadas para diversos clientes, implementando soluciones responsivas y optimizadas para motores de búsqueda.</p>
                <p>Creación de interfaces intuitivas centradas en la experiencia del usuario y el rendimiento.</p>
                <p>Mantenimiento y actualización de aplicaciones existentes para garantizar su funcionamiento y seguridad.</p>
            `,
            habilidades: ['React', 'Node.js', 'PHP', 'SASS', 'Git', 'WordPress', 'SEO']
        },
        {
            id: 'admin-sistemas',
            titulo: 'Administrador de Sistemas',
            empresa: 'Práctica Profesional',
            fecha: 'Febrero 2022 - Mayo 2022',
            descripcion: `
                <p>Administración y configuración de sistemas de planificación de recursos empresariales para optimizar procesos de producción y gestión de inventario.</p>
                <p>Capacitación de usuarios finales y desarrollo de documentación técnica para el uso eficiente del sistema.</p>
                <p>Implementación de mejoras y solución de problemas para maximizar la eficiencia operativa.</p>
            `,
            habilidades: ['Sistemas ERP', 'SQL', 'Excel Avanzado', 'Capacitación', 'Documentación técnica']
        }
    ];

    // Función para inicializar la funcionalidad del modal de experiencia
    function initExperienceModals() {
        // Crear el modal en el DOM si no existe
        if (!document.getElementById('experienceModal')) {
            const modalHTML = `
                <div id="experienceModal" class="modal">
                    <div class="modal__content">
                        <span class="modal__close">&times;</span>
                        <div class="modal__header">
                            <h3 id="modalTitle" class="modal__title">Título del Puesto</h3>
                            <p id="modalCompany" class="modal__company"></p>
                            <p id="modalDate" class="modal__date"></p>
                        </div>
                        <div class="modal__body">
                            <div id="modalDescription" class="modal__description"></div>
                            <div class="modal__skills">
                                <h4>Habilidades aplicadas</h4>
                                <div id="modalSkills" class="modal__skills-tags"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Agregar el modal al final del documento
            document.body.insertAdjacentHTML('beforeend', modalHTML);

            // Estilos para el modal
            const styleElement = document.createElement('style');
            styleElement.textContent = `
                .modal {
                    display: none;
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgba(0,0,0,0.5);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .modal.show {
                    display: block;
                    opacity: 1;
                }
                
                .modal__content {
                    background-color: #ffffff;
                    margin: 10% auto;
                    padding: 20px;
                    border-radius: 8px;
                    width: 80%;
                    max-width: 600px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    transform: scale(0.9);
                    transition: transform 0.3s ease;
                }
                
                .modal.show .modal__content {
                    transform: scale(1);
                }
                
                .modal__close {
                    color: #aaaaaa;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                }
                
                .modal__header {
                    border-bottom: 1px solid #eeeeee;
                    padding-bottom: 15px;
                    margin-bottom: 15px;
                }
                
                .modal__title {
                    color: #232946;
                    font-size: 24px;
                    margin: 0 0 10px 0;
                }
                
                .modal__company {
                    font-size: 18px;
                    color: #4D61FC;
                    margin: 5px 0;
                    font-weight: 500;
                }
                
                .modal__date {
                    font-size: 16px;
                    color: #6B7280;
                    margin: 5px 0;
                }
                
                .modal__description p {
                    margin-bottom: 15px;
                    line-height: 1.6;
                    color: #232946;
                }
                
                .modal__skills {
                    margin-top: 20px;
                }
                
                .modal__skills h4 {
                    font-size: 18px;
                    margin-bottom: 10px;
                    color: #232946;
                }
                
                .modal__skills-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                
                .skill-tag {
                    display: inline-block;
                    background-color: rgba(77, 97, 252, 0.1);
                    color: #4D61FC;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 14px;
                    font-weight: 500;
                }
                
                @media (max-width: 768px) {
                    .modal__content {
                        width: 90%;
                        margin: 15% auto;
                    }
                    
                    .modal__title {
                        font-size: 20px;
                    }
                    
                    .modal__company {
                        font-size: 16px;
                    }
                }
            `;
            document.head.appendChild(styleElement);
        }

        // Referencias a elementos del modal
        const modal = document.getElementById('experienceModal');
        const modalClose = document.querySelector('.modal__close');
        const modalTitle = document.getElementById('modalTitle');
        const modalCompany = document.getElementById('modalCompany');
        const modalDate = document.getElementById('modalDate');
        const modalDescription = document.getElementById('modalDescription');
        const modalSkills = document.getElementById('modalSkills');

        // Agregar evento de click a todos los botones "Más detalles"
        const expButtons = document.querySelectorAll('.experience__button');

        expButtons.forEach((button, index) => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                // Obtener datos de la experiencia
                const experiencia = experienciasData[index];

                // Actualizar contenido del modal
                modalTitle.textContent = experiencia.titulo;
                modalCompany.textContent = experiencia.empresa;
                modalDate.textContent = experiencia.fecha;
                modalDescription.innerHTML = experiencia.descripcion;

                // Actualizar habilidades
                modalSkills.innerHTML = '';
                experiencia.habilidades.forEach(skill => {
                    const skillTag = document.createElement('span');
                    skillTag.className = 'skill-tag';
                    skillTag.textContent = skill;
                    modalSkills.appendChild(skillTag);
                });

                // Mostrar modal con animación
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
            });
        });

        // Cerrar modal con el botón X
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Cerrar modal al hacer clic fuera del contenido
        if (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }

        // Función para cerrar el modal
        function closeModal() {
            modal.classList.remove('show');
            setTimeout(() => {
                if (!modal.classList.contains('show')) {
                    document.body.style.overflow = 'auto'; // Restaurar scroll
                }
            }, 300);
        }

        // Cerrar modal con la tecla ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    /**
 * Generador de CV en PDF
 */

    // Primero, vamos a cargar jsPDF antes de que se necesite
    document.addEventListener('DOMContentLoaded', function () {
        // Cargar jsPDF al inicio
        const jsPDFScript = document.createElement('script');
        jsPDFScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        document.body.appendChild(jsPDFScript);

        // Añadir evento al botón de descarga CV
        const btnDescargarCV = document.querySelector('.btn--secondary');
        if (btnDescargarCV) {
            btnDescargarCV.addEventListener('click', function (e) {
                e.preventDefault();
                generarYDescargarCV();
            });
        }
    });

    function generarYDescargarCV() {
        // Verificar si jsPDF está cargado
        if (typeof window.jspdf === 'undefined') {
            alert('Cargando herramientas para generar el CV, por favor espera un momento y vuelve a intentarlo...');

            // Intentar cargar jsPDF de nuevo
            const jsPDFScript = document.createElement('script');
            jsPDFScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            jsPDFScript.onload = function () {
                setTimeout(function () {
                    generarYDescargarCV();
                }, 1000);
            };
            document.body.appendChild(jsPDFScript);
            return;
        }

        // Mostrar mensaje de generación
        alert('Generando CV, por favor espera un momento...');

        try {
            // Crear el PDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4');

            // Colores
            const azulPrimario = '#4D61FC';
            const grisOscuro = '#232946';
            const gris = '#6B7280';

            // Márgenes
            const margenIzq = 20;
            const margenSup = 20;
            const anchoPagina = 170;

            // Encabezado
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(24);
            doc.setTextColor(grisOscuro);
            doc.text('MARCO ANTONIO RULFO CASTRO', margenIzq, margenSup);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(14);
            doc.setTextColor(azulPrimario);
            doc.text('Desarrollador Web Full Stack & Especialista en TI', margenIzq, margenSup + 10);

            // Contacto
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(gris);
            doc.text('Email: marcorulfo100@gmail.com | Tel: +52 55 3108 3353 | GitHub: github.com/Marcor360', margenIzq, margenSup + 18);
            doc.text('Ubicación: Coret #10, Mártires de Río Blanco, Naucalpan, Estado de México', margenIzq, margenSup + 24);

            // Línea separadora
            doc.setDrawColor(azulPrimario);
            doc.setLineWidth(0.5);
            doc.line(margenIzq, margenSup + 28, 190 - margenIzq, margenSup + 28);

            // Perfil
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(grisOscuro);
            doc.text('PERFIL PROFESIONAL', margenIzq, margenSup + 36);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(gris);
            const perfil = 'Desarrollador web full stack con amplio conocimiento en tecnologías front-end y back-end. ' +
                'Mi expertise incluye HTML5, CSS3, SASS, JavaScript, PHP, React, Node.js y SQL, permitiéndome ' +
                'construir aplicaciones web completas y responsivas. Actualmente en mi último año de Ingeniería ' +
                'en Sistemas Computacionales, combino mi formación académica con experiencia práctica en desarrollo ' +
                'web y soporte técnico.';

            const perfilFormateado = doc.splitTextToSize(perfil, anchoPagina);
            doc.text(perfilFormateado, margenIzq, margenSup + 42);

            // Experiencia
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(grisOscuro);
            doc.text('EXPERIENCIA PROFESIONAL', margenIzq, margenSup + 60);

            // Experiencia 1
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text('Desarrollador Web', margenIzq, margenSup + 68);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(azulPrimario);
            doc.text('Freelance | Enero 2022 - Presente', margenIzq, margenSup + 74);

            doc.setTextColor(gris);
            let posY = margenSup + 80;
            const exp1 = [
                '• Desarrollo de sitios web y aplicaciones personalizadas para diversos clientes.',
                '• Implementación de soluciones responsivas y optimizadas para buscadores.',
                '• Creación de interfaces intuitivas centradas en la experiencia del usuario.',
                '• Mantenimiento y actualización de aplicaciones existentes.'
            ];

            exp1.forEach(item => {
                doc.text(item, margenIzq, posY);
                posY += 6;
            });

            // Experiencia 2
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(grisOscuro);
            doc.text('Becario de Sistemas', margenIzq, posY + 2);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(azulPrimario);
            doc.text('USA SHOES | Octubre 2023 - Febrero 2024', margenIzq, posY + 8);

            doc.setTextColor(gris);
            posY += 14;
            const exp2 = [
                '• Implementación y mantenimiento de sistemas informáticos.',
                '• Soporte técnico a usuarios finales y proyectos de desarrollo.',
                '• Análisis de procesos empresariales para identificar mejoras.',
                '• Trabajo con herramientas de gestión de inventario y sistemas ERP.'
            ];

            exp2.forEach(item => {
                doc.text(item, margenIzq, posY);
                posY += 6;
            });

            // Experiencia 3
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(grisOscuro);
            doc.text('Encargado de Soporte TI', margenIzq, posY + 2);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(azulPrimario);
            doc.text('AICCA | Junio 2022 - Julio 2023', margenIzq, posY + 8);

            posY += 14;
            doc.setTextColor(gris);
            const exp3 = [
                '• Liderazgo del área de soporte técnico, gestionando un equipo de 3 personas.',
                '• Implementación de soluciones para mejorar la eficiencia operativa.',
                '• Reducción del 30% en el tiempo de resolución de incidencias.',
                '• Coordinación de proyectos de actualización de hardware y software.'
            ];

            exp3.forEach(item => {
                doc.text(item, margenIzq, posY);
                posY += 6;
            });

            // Segunda página
            doc.addPage();
            posY = margenSup;

            // Formación académica
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(grisOscuro);
            doc.text('FORMACIÓN ACADÉMICA', margenIzq, posY);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(grisOscuro);
            doc.text('Ingeniería en Sistemas Computacionales', margenIzq, posY + 8);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(azulPrimario);
            doc.text('Universidad Tres Culturas | En curso (último año)', margenIzq, posY + 14);

            // Certificaciones
            posY += 24;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(grisOscuro);
            doc.text('CERTIFICACIONES', margenIzq, posY);

            // Certificación 1
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(grisOscuro);
            doc.text('Ética: Uso Responsable de Datos', margenIzq, posY + 8);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(azulPrimario);
            doc.text('Universidad Tres Culturas | Abril 2025', margenIzq, posY + 14);

            // Certificación 2
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(grisOscuro);
            doc.text('Bases y conceptos clave de la IA', margenIzq, posY + 22);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(azulPrimario);
            doc.text('Universidad Tres Culturas | Marzo 2025', margenIzq, posY + 28);

            // Certificación 3 y 4 (juntas para ahorrar espacio)
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(grisOscuro);
            doc.text('Fundamentos del Análisis de Datos / Principios de Data Science', margenIzq, posY + 36);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(azulPrimario);
            doc.text('Universidad Tres Culturas | Abril 2025', margenIzq, posY + 42);

            // Habilidades
            posY += 50;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(grisOscuro);
            doc.text('HABILIDADES', margenIzq, posY);

            // Columna izquierda: Tecnologías
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(grisOscuro);
            doc.text('Tecnologías Web', margenIzq, posY + 8);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(gris);
            let skillY = posY + 14;
            const skills1 = [
                '• HTML5/CSS3/SASS (95%)',
                '• JavaScript (90%)',
                '• React (85%)',
                '• Node.js (80%)',
                '• PHP (85%)',
                '• SQL (85%)',
                '• Git & GitHub (90%)'
            ];

            skills1.forEach(skill => {
                doc.text(skill, margenIzq, skillY);
                skillY += 6;
            });

            // Columna derecha: Habilidades profesionales
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(grisOscuro);
            doc.text('Habilidades Profesionales', margenIzq + 90, posY + 8);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(gris);
            skillY = posY + 14;
            const skills2 = [
                '• Soporte Técnico (95%)',
                '• Mantenimiento de Equipos (90%)',
                '• Administración de Sistemas (80%)',
                '• Resolución de Problemas (95%)',
                '• Trabajo en Equipo (90%)',
                '• Comunicación Efectiva (90%)'
            ];

            skills2.forEach(skill => {
                doc.text(skill, margenIzq + 90, skillY);
                skillY += 6;
            });

            // Guardar PDF
            doc.save('CV_Marco_Antonio_Rulfo_Castro.pdf');

            alert('¡CV generado correctamente! La descarga ha comenzado.');
        } catch (error) {
            console.error('Error al generar el CV:', error);
            alert('Hubo un error al generar el CV. Por favor, inténtalo de nuevo más tarde.');
        }
    }

    // Inicializar todas las funcionalidades
    initExperienceModals();
});