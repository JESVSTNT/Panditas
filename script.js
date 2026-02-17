async function cargarFrase() {
    const respuesta = await fetch('frases.json');
    const frases = await respuesta.json();

    const ultima = localStorage.getItem("ultimaFrase");
    let random;

    do {
        random = Math.floor(Math.random() * frases.length);
    } while (frases[random] === ultima);

    localStorage.setItem("ultimaFrase", frases[random]);

    const fraseElemento = document.getElementById("frase");
    fraseElemento.textContent = frases[random];

    cambiarColor(fraseElemento);
}

function cambiarColor(elemento) {
    const colores = [
        "#ff3d68",
        "#ff9800",
        "#4caf50",
        "#2196f3",
        "#9c27b0"
    ];

    const colorRandom = colores[Math.floor(Math.random() * colores.length)];
    elemento.style.color = colorRandom;
}

cargarFrase();

/* 🎉 CONFETI */

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const piezas = [];

for (let i = 0; i < 120; i++) {
    piezas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 50,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        tilt: Math.floor(Math.random() * 10) - 10
    });
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    piezas.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.r, p.r);
    });

    actualizar();
}

function actualizar() {
    piezas.forEach(p => {
        p.y += 3;
        if (p.y > canvas.height) {
            p.y = -10;
        }
    });
}

function animar() {
    dibujar();
    requestAnimationFrame(animar);
}

animar();

function crearGomitas() {
    const contenedor = document.querySelector(".fondo-gomitas");

    for (let i = 0; i < 28; i++) {

        const img = document.createElement("img");
        img.src = "https://yundufillingmachine.com/wp-content/uploads/2025/05/gummy-bears-1514016_1280.webp";
        img.classList.add("gomita");

        // 🎯 Tamaño variable (perspectiva)
        const tamaño = Math.random() * 80 + 40;
        img.style.width = tamaño + "px";

        // 🎯 Distribución casi total pantalla (5% a 95%)
        img.style.left = (Math.random() * 90 + 5) + "%";
        img.style.top = (Math.random() * 90 + 5) + "%";

        // 🎯 Profundidad según tamaño
        if (tamaño > 90) {
            // Más cerca
            img.style.filter = "blur(0px)";
            img.style.opacity = "0.9";
            img.style.zIndex = "0";
            img.style.animationDuration = "6s";
        } else if (tamaño > 60) {
            // Medio
            img.style.filter = "blur(2px)";
            img.style.opacity = "0.6";
            img.style.zIndex = "0";
            img.style.animationDuration = "8s";
        } else {
            // Más lejos
            img.style.filter = "blur(4px)";
            img.style.opacity = "0.4";
            img.style.zIndex = "0";
            img.style.animationDuration = "10s";
        }

        contenedor.appendChild(img);
    }
}

crearGomitas();


