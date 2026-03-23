const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const scrollProgress = document.getElementById("scroll-progress");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");

/* ========================
    TEMA CLARO / OSCURO
======================== */

function applyTheme(theme) {
    if (theme === "dark") {
        body.classList.add("dark");
        themeIcon.textContent = "☀️";
    } else {
        body.classList.remove("dark");
        themeIcon.textContent = "🌙";
    }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme("light");
}

themeToggle.addEventListener("click", () => {
    const isDark = body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
});

/* ========================
    BARRA DE PROGRESO SCROLL
======================== */

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    scrollProgress.style.width = `${scrollPercent}%`;
}

window.addEventListener("scroll", updateScrollProgress);

/* ========================
    MENÚ MOBILE
======================== */

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });
});

/* ========================
    LINK ACTIVO SEGÚN SECCIÓN
======================== */

function updateActiveLink() {
    const scrollPosition = window.scrollY + 160;
    const pageBottom = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    let currentSectionId = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = sectionId;
        }
    });

    if (pageBottom >= pageHeight - 10) {
        currentSectionId = sections[sections.length - 1].getAttribute("id");
    }

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);

/* ========================
    ANIMACIONES AL HACER SCROLL
======================== */

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
        });
    },
    {
        threshold: 0.15,
    }
);

/* ========================
    CARRUSEL MASCOTASAPP
======================== */

const mascotasCarouselImage = document.getElementById("mascotas-carousel-image");
const mascotasCaption = document.getElementById("mascotas-caption");
const mascotasCounter = document.getElementById("mascotas-counter");
const mascotasPrev = document.getElementById("mascotas-prev");
const mascotasNext = document.getElementById("mascotas-next");

const mascotasSlides = [
    {
        image: "./assets/images/mascotasapp-web-home.jpg",
        alt: "MascotasApp web veterinaria",
        caption: "Web veterinaria",
    },
    {
        image: "./assets/images/mascotasapp-gestion.jpg",
        alt: "MascotasApp panel de gestión de veterinarios",
        caption: "Gestión Veterinarios",
    },
    {
        image: "./assets/images/mascotasapp-mobile-lista.jpg",
        alt: "MascotasApp listado de mascotas mobile",
        caption: "Listado de mascotas mobile",
    },
    {
        image: "./assets/images/mascotasapp-mobile-mapa.jpg",
        alt: "MascotasApp mapa interactivo mobile",
        caption: "Mapa interactivo mobile",
    },
];

let mascotasCurrentIndex = 0;

function updateMascotasCarousel() {
    const currentSlide = mascotasSlides[mascotasCurrentIndex];

    mascotasCarouselImage.src = currentSlide.image;
    mascotasCarouselImage.alt = currentSlide.alt;
    mascotasCaption.textContent = currentSlide.caption;
    mascotasCounter.textContent = `${mascotasCurrentIndex + 1} / ${mascotasSlides.length}`;
}

if (mascotasCarouselImage && mascotasCaption && mascotasCounter && mascotasPrev && mascotasNext) {
    mascotasPrev.addEventListener("click", () => {
        mascotasCurrentIndex = (mascotasCurrentIndex - 1 + mascotasSlides.length) % mascotasSlides.length;
        updateMascotasCarousel();
    });

    mascotasNext.addEventListener("click", () => {
        mascotasCurrentIndex = (mascotasCurrentIndex + 1) % mascotasSlides.length;
        updateMascotasCarousel();
    });

    updateMascotasCarousel();
}

/* ========================
    CARRUSEL NEXTGAMELIST
======================== */

const nextGameListCarouselImage = document.getElementById("nextgamelist-carousel-image");
const nextGameListCaption = document.getElementById("nextgamelist-caption");
const nextGameListCounter = document.getElementById("nextgamelist-counter");
const nextGameListPrev = document.getElementById("nextgamelist-prev");
const nextGameListNext = document.getElementById("nextgamelist-next");

const nextGameListSlides = [
    {
        image: "./assets/images/nextgamelist-home.png",
        alt: "NextGameList home conceptual",
        caption: "Home conceptual",
    },
    {
        image: "./assets/images/nextgamelist-mylist.png",
        alt: "NextGameList My Lists conceptual",
        caption: "My Lists conceptual",
    },
    {
        image: "./assets/images/nextgamelist-mobile.png",
        alt: "NextGameList versión mobile conceptual",
        caption: "Versión mobile conceptual",
    },
];

let nextGameListCurrentIndex = 0;

function updateNextGameListCarousel() {
    const currentSlide = nextGameListSlides[nextGameListCurrentIndex];

    nextGameListCarouselImage.src = currentSlide.image;
    nextGameListCarouselImage.alt = currentSlide.alt;
    nextGameListCaption.textContent = currentSlide.caption;
    nextGameListCounter.textContent = `${nextGameListCurrentIndex + 1} / ${nextGameListSlides.length}`;
}

if (nextGameListCarouselImage && nextGameListCaption && nextGameListCounter && nextGameListPrev && nextGameListNext) {
    nextGameListPrev.addEventListener("click", () => {
        nextGameListCurrentIndex = (nextGameListCurrentIndex - 1 + nextGameListSlides.length) % nextGameListSlides.length;
        updateNextGameListCarousel();
    });

    nextGameListNext.addEventListener("click", () => {
        nextGameListCurrentIndex = (nextGameListCurrentIndex + 1) % nextGameListSlides.length;
        updateNextGameListCarousel();
    });

    updateNextGameListCarousel();
}

revealElements.forEach((element) => {
    observer.observe(element);
});

/* ========================
    CONTACT FORM MAILTO
======================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        const subject = encodeURIComponent(`Mensaje desde el portfolio de ${name}`);
        const body = encodeURIComponent(
        `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
        );

        window.location.href = `mailto:dasilveirajonathan7@gmail.com?subject=${subject}&body=${body}`;
    });
}

/* ========================
    ESTADO INICIAL
======================== */

updateScrollProgress();
updateActiveLink();