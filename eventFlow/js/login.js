const app = document.getElementById("app");

async function loadLogin(){
    const response = await fetch("login.html");
    const html = await response.text();
    app.innerHTML = html;

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event){
        event.preventDefault();
        loadDashboard();
    });
}

async function loadDashboard(){
    const response = await fetch("dashboard.html");
    const html = await response.text();
    app.innerHTML = html;

    // Llamar a initializeDashboard después de cargar el HTML
    initializeDashboard();
}

// Iniciar la aplicación
loadLogin();