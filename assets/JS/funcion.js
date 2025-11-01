// Este código se ejecuta cuando la página está lista
document.addEventListener('DOMContentLoaded', function () {

    // 1. CONTADOR DE VISITAS usando LocalStorage
    contarVisitas();

    // 2. FORMULARIO DE CONTACTO
    configurarFormulario();

});

// ========================================
// FUNCIÓN 1: CONTADOR DE VISITAS
// ========================================
function contarVisitas() {
    // Obtener el número de visitas guardado (o 0 si no existe)
    let visitas = localStorage.getItem('numeroVisitas');

    if (visitas === null) {
        visitas = 0;
    }

    // Aumentar en 1
    visitas = parseInt(visitas) + 1;

    // Guardar en LocalStorage
    localStorage.setItem('numeroVisitas', visitas);

    // Mostrar en la página
    document.getElementById('contadorVisitas').textContent = visitas;

    // También guardar en Cookie (compartir entre páginas)
    guardarCookie('visitas', visitas, 365);

    console.log('Total de visitas:', visitas);
}

// ========================================
// FUNCIÓN 2: MANEJAR FORMULARIO DE CONTACTO
// ========================================
function configurarFormulario() {
    const formulario = document.getElementById('formularioContacto');

    formulario.addEventListener('submit', function (evento) {
        // Prevenir que la página se recargue
        evento.preventDefault();

        // Obtener los datos del formulario
        const datosFormulario = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            mensaje: document.getElementById('mensaje').value,
            fecha: new Date().toLocaleString('es-CO')
        };

        // Guardar en LocalStorage
        guardarMensaje(datosFormulario);

        // Mostrar mensaje de éxito
        mostrarMensajeExito();

        // Limpiar el formulario
        formulario.reset();

        console.log('Mensaje guardado:', datosFormulario);
    });
}

// ========================================
// FUNCIÓN 3: GUARDAR MENSAJES EN LOCALSTORAGE
// ========================================
function guardarMensaje(datos) {
    // Obtener mensajes anteriores (o crear array vacío)
    let mensajes = localStorage.getItem('mensajesContacto');

    if (mensajes === null) {
        mensajes = [];
    } else {
        mensajes = JSON.parse(mensajes);
    }

    // Agregar el nuevo mensaje
    mensajes.push(datos);

    // Guardar todo de nuevo en LocalStorage
    localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));

    console.log('Total de mensajes guardados:', mensajes.length);
}

// ========================================
// FUNCIÓN 4: MOSTRAR MENSAJE DE ÉXITO
// ========================================
function mostrarMensajeExito() {
    const mensaje = document.getElementById('mensajeExito');
    mensaje.style.display = 'block';

    // Ocultar después de 5 segundos
    setTimeout(function () {
        mensaje.style.display = 'none';
    }, 5000);
}

// ========================================
// FUNCIÓN 5: GUARDAR COOKIES
// ========================================
function guardarCookie(nombre, valor, dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    const expira = "expires=" + fecha.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expira + ";path=/";
}

// ========================================
// FUNCIÓN 6: LEER COOKIES
// ========================================
function leerCookie(nombre) {
    const nombreCookie = nombre + "=";
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nombreCookie) == 0) {
            return cookie.substring(nombreCookie.length, cookie.length);
        }
    }
    return null;
}

// ========================================
// FUNCIÓN EXTRA: VER TODOS LOS MENSAJES GUARDADOS
// ========================================
// Puedes llamar esta función desde la consola del navegador
function verMensajesGuardados() {
    const mensajes = localStorage.getItem('mensajesContacto');
    if (mensajes) {
        console.table(JSON.parse(mensajes));
    } else {
        console.log('No hay mensajes guardados');
    }
}

// ========================================
// FUNCIÓN EXTRA: LIMPIAR TODOS LOS DATOS
// ========================================
// Útil para pruebas
function limpiarTodo() {
    localStorage.clear();
    console.log('Todos los datos han sido eliminados');
}

// Mensaje de bienvenida en la consola
console.log('%c¡Bienvenido a mi portafolio! 👋', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cPara ver los mensajes guardados, escribe: verMensajesGuardados()', 'color: #888;');