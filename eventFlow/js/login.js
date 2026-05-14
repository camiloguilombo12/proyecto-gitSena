// Contenedor principal
const app = document.getElementById("app");

// Función para cargar login
async function loadLogin(){

    // Leer login.html
    const response = await fetch("login.html");

    // Convertir a texto
    const html = await response.text();

    // Inyectar HTML
    app.innerHTML = html;

    // Obtener formulario
    const loginForm = document.getElementById("loginForm");

    // Evento submit
    loginForm.addEventListener("submit", function(event){

        // Evita recargar
        event.preventDefault();

        window.location.href = "dashboard.html";
    });

}

// Ejecutar función
loadLogin();