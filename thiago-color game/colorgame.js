
let juego = {
    colores: [],
    colorGanador: "",
    intentos: 0,
    terminado: false,
    probados: [],     
    record: null,    
    modo: "dificil"  
};


let cuadrados = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let mensaje = document.querySelector("#message");
let titulo = document.querySelector("h1");
let botonReset = document.querySelector("#reset");
let botonFacil = document.querySelector("#easy");
let botonDificil = document.querySelector("#hard");

let infoContainer = document.createElement("div");
infoContainer.style.textAlign = "center";
infoContainer.style.color = "white";
infoContainer.style.fontFamily = "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif";
infoContainer.style.margin = "10px 0"; // futurama
infoContainer.innerHTML = 'Intentos: <span id="contadorIntentos">0</span> | Récord: <span id="contadorRecord">-</span>';
document.body.insertBefore(infoContainer, document.querySelector(".container"));

let spanIntentos = document.getElementById("contadorIntentos");
let spanRecord = document.getElementById("contadorRecord");


function colorAleatorio() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generarColores(cantidad) {
    let arr = [];
    for (let i = 0; i < cantidad; i++) {
        arr.push(colorAleatorio());
    }
    return arr;
}

function elegirColor() {
    let indiceAleatorio = Math.floor(Math.random() * juego.colores.length);
    return juego.colores[indiceAleatorio];
}

function nuevoJuego(modo) {
    juego.modo = modo;
    let cantidad = (modo === "facil") ? 3 : 6;

    if (modo === "extremo") {
        cantidad = 9;
        let container = document.querySelector(".container");
        while (cuadrados.length < 9) {
            let nuevoCuadrado = document.createElement("div");
            nuevoCuadrado.classList.add("square");
            container.appendChild(nuevoCuadrado);
        }
        cuadrados = document.querySelectorAll(".square");
    }

    juego.colores = generarColores(cantidad);
    juego.colorGanador = elegirColor();
    juego.intentos = 0;
    juego.terminado = false;
    juego.probados = [];

    mensaje.textContent = "";
    titulo.style.backgroundColor = "transparent";
    botonReset.textContent = "Nuevos Colores";

    spanIntentos.textContent = juego.intentos;

    pintarTablero();
}

function pintarTablero() {
    for (let i = 0; i < cuadrados.length; i++) {
        if (juego.colores[i]) {
            cuadrados[i].style.backgroundColor = juego.colores[i];
            cuadrados[i].style.display = "block";
        } else {
            cuadrados[i].style.display = "none";
        }
    }
    colorDisplay.textContent = juego.colorGanador;
}

function cambiarColores(color) {
    for (let i = 0; i < cuadrados.length; i++) {
        if (juego.colores[i]) {
            cuadrados[i].style.backgroundColor = color;
            cuadrados[i].style.display = "block";
        }
    }
}

function adivinar(numero) {
    if (juego.terminado) {
        mensaje.textContent = "El juego terminó. Usá nuevoJuego()";
        return;
    }

    if (numero < 1 || numero > juego.colores.length) {
        mensaje.textContent = "Ese cuadrado no existe";
        return;
    }

    if (juego.probados.includes(numero)) {
        mensaje.textContent = "Ya probaste ese cuadrado.";
        return;
    }

    juego.probados.push(numero);
    juego.intentos++;
    spanIntentos.textContent = juego.intentos;

    let indiceElegido = numero - 1;
    let colorElegido = juego.colores[indiceElegido];

    if (colorElegido === juego.colorGanador) {
        juego.terminado = true;
        mensaje.textContent = "¡Correcto!";
        cambiarColores(juego.colorGanador);
        titulo.style.backgroundColor = juego.colorGanador;

        botonReset.textContent = "¿Jugar de nuevo?";

        if (juego.record === null || juego.intentos < juego.record) {
            juego.record = juego.intentos;
            spanRecord.textContent = juego.record;
        }
    } else {
        cuadrados[indiceElegido].style.backgroundColor = "#232323";
        cuadrados[indiceElegido].style.display = "none";
        mensaje.textContent = "Intentalo nuevamente";
    }
}


for (let i = 0; i < cuadrados.length; i++) {
    cuadrados[i].addEventListener("click", function () {
        adivinar(i + 1);
    });
}

botonReset.addEventListener("click", function () {
    nuevoJuego(juego.modo);
});

botonFacil.addEventListener("click", function () {
    botonFacil.classList.add("selected");
    botonDificil.classList.remove("selected");
    nuevoJuego("facil");
});

botonDificil.addEventListener("click", function () {
    botonDificil.classList.add("selected");
    botonFacil.classList.remove("selected");
    nuevoJuego("dificil");
});

document.addEventListener("keydown", function(e) {
    let tecla = e.key;
    if (!isNaN(tecla) && tecla >= "1" && tecla <= "9") {
        adivinar(parseInt(tecla));
    } else if (tecla.toLowerCase() === "r") {
        nuevoJuego(juego.modo);
    }
});

nuevoJuego("dificil");
pintarTablero();