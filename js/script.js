/* Formulario */
emailjs.init("S1QwEXDhvRRYJ-h5p");

const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const params = {
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_dmmqxfo", "template_utf86ym", params)
    .then(() => {
        alert("Mensaje enviado correctamente");
        form.reset();
    })
    .catch((error) => {
        console.error(error);
        alert("Error al enviar");
    });
});

const themeBtn = document.getElementById("theme-btn");
const hamburgerBtn = document.getElementById("hamburger-btn");
const navLinks = document.getElementById("nav-links");

/* MENÚ HAMBURGUESA */
hamburgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    hamburgerBtn.setAttribute("aria-expanded", !expanded);
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

/* MODO OSCURO */
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "⚪";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "⚫";
    }
});

window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme === "dark"){
        document.body.classList.add("dark");
        themeBtn.textContent = "⚪";
    }
});

/* Botones de tamaño de texto */
const increaseBtn = document.getElementById("increase-font");
const decreaseBtn = document.getElementById("decrease-font");

let fontSize = parseFloat(localStorage.getItem("fontSize")) || 16;
document.documentElement.style.fontSize = fontSize + "px";

increaseBtn.addEventListener("click", () => {
    if (fontSize < 24) {
        fontSize += 2;
        document.documentElement.style.fontSize = fontSize + "px";
        localStorage.setItem("fontSize", fontSize);
    }
});

decreaseBtn.addEventListener("click", () => {
    if (fontSize > 12) {
        fontSize -= 2;
        document.documentElement.style.fontSize = fontSize + "px";
        localStorage.setItem("fontSize", fontSize);
    }
});

/* ANIMACIÓN DE ENTRADA PARA CARDS */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0, rootMargin: "0px 0px -30px 0px" });

document.querySelectorAll(".card").forEach(card => {
    observer.observe(card);
});