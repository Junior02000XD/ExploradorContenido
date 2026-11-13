// botones
const btnCita = document.getElementById("btnCita");
const btnPerro = document.getElementById("btnPerro");
const btnGato = document.getElementById("btnGato");
const btnDato = document.getElementById("btnDato");

// para mostrar cargando o el error de cada seccion
function mostrarEstado(elemento, mensaje, esError) {
    elemento.textContent = mensaje;
    if (esError) {
        elemento.classList.add("error");
    } else {
        elemento.classList.remove("error");
    }
}

// citas
async function obtenerCita() {
    const estado = document.getElementById("estadoCita");
    const contenido = document.getElementById("contenidoCita");

    btnCita.disabled = true;
    contenido.classList.add("d-none");
    mostrarEstado(estado, "Cargando...", false);

    try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        if (!response.ok) {
            throw new Error("Error " + response.status);
        }
        const datos = await response.json();

        document.getElementById("textoCita").textContent = '"' + datos.quote + '"';
        document.getElementById("autorCita").textContent = "- " + datos.author;
        contenido.classList.remove("d-none");
        mostrarEstado(estado, "", false);
    } catch (error) {
        console.log(error);
        mostrarEstado(estado, "No se pudo obtener la cita. Revisa tu conexion e intenta de nuevo.", true);
    } finally {
        btnCita.disabled = false;
    }
}

// perros
async function obtenerPerro() {
    const estado = document.getElementById("estadoPerro");
    const img = document.getElementById("imgPerro");

    btnPerro.disabled = true;
    img.classList.add("d-none");
    mostrarEstado(estado, "Cargando...", false);

    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!response.ok) {
            throw new Error("Error " + response.status);
        }
        const datos = await response.json();

        // la url de la imagen viene en message
        // si repite la misma imagen no se dispara load, por eso la muestro aca
        if (img.src == datos.message) {
            img.classList.remove("d-none");
            mostrarEstado(estado, "", false);
        }
        img.src = datos.message;
    } catch (error) {
        console.log(error);
        mostrarEstado(estado, "No se pudo obtener el perro. Revisa tu conexion e intenta de nuevo.", true);
    } finally {
        btnPerro.disabled = false;
    }
}

// gatos
async function obtenerGato() {
    const estado = document.getElementById("estadoGato");
    const img = document.getElementById("imgGato");

    btnGato.disabled = true;
    img.classList.add("d-none");
    mostrarEstado(estado, "Cargando...", false);

    try {
        const response = await fetch("https://cataas.com/cat?json=true");
        if (!response.ok) {
            throw new Error("Error " + response.status);
        }
        const datos = await response.json();

        // con el id armo la url de la imagen
        const url = "https://cataas.com/cat/" + datos.id;
        if (img.src == url) {
            img.classList.remove("d-none");
            mostrarEstado(estado, "", false);
        }
        img.src = url;
    } catch (error) {
        console.log(error);
        mostrarEstado(estado, "No se pudo obtener el gato. Revisa tu conexion e intenta de nuevo.", true);
    } finally {
        btnGato.disabled = false;
    }
}

// datos curiosos
async function obtenerDato() {
    const estado = document.getElementById("estadoDato");
    const texto = document.getElementById("textoDato");

    btnDato.disabled = true;
    texto.textContent = "";
    mostrarEstado(estado, "Cargando...", false);

    try {
        const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
        if (!response.ok) {
            throw new Error("Error " + response.status);
        }
        const datos = await response.json();

        texto.textContent = datos.text;
        mostrarEstado(estado, "", false);
    } catch (error) {
        console.log(error);
        mostrarEstado(estado, "No se pudo obtener el dato curioso. Revisa tu conexion e intenta de nuevo.", true);
    } finally {
        btnDato.disabled = false;
    }
}

// cuando la imagen termina de cargar o falla
const imgPerro = document.getElementById("imgPerro");
const imgGato = document.getElementById("imgGato");

imgPerro.addEventListener("load", function () {
    imgPerro.classList.remove("d-none");
    mostrarEstado(document.getElementById("estadoPerro"), "", false);
});
imgPerro.addEventListener("error", function () {
    mostrarEstado(document.getElementById("estadoPerro"), "No se pudo cargar la imagen del perro. Intenta de nuevo.", true);
});

imgGato.addEventListener("load", function () {
    imgGato.classList.remove("d-none");
    mostrarEstado(document.getElementById("estadoGato"), "", false);
});
imgGato.addEventListener("error", function () {
    mostrarEstado(document.getElementById("estadoGato"), "No se pudo cargar la imagen del gato. Intenta de nuevo.", true);
});

btnCita.addEventListener("click", obtenerCita);
btnPerro.addEventListener("click", obtenerPerro);
btnGato.addEventListener("click", obtenerGato);
btnDato.addEventListener("click", obtenerDato);

// al entrar a la pagina cargo todo
obtenerCita();
obtenerPerro();
obtenerGato();
obtenerDato();
