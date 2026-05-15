const app = document.getElementById("app");

async function loadLogin(){

    const response = await fetch("login.html");
    const html = await response.text();

    app.innerHTML = html;

    const loginForm = document.getElementById("loginForm");

    // Inputs
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    // Evento submit
    loginForm.addEventListener("submit", function(event){

        // Evita recargar
        event.preventDefault();

        // Obtener valores
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        /* VALIDAR CAMPOS VACÍOS*/
        if(emailValue === "" || passwordValue === ""){

            alert("All fields are required");

            return;
        }

        /* VALIDAR EMAIL*/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(emailValue)){

            alert("Enter a valid email");

            return;
        }

        /* VALIDAR CONTRASEÑA */

        const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[#\$%\&!])[A-Za-z\d#\$%\&!]{6,}$/;

        if(!passwordRegex.test(passwordValue)){

            alert(
                "Password must contain at least 6 characters, one uppercase letter, one number and one special character (#$%&!)"
            );

            return;
        }

        // Login exitoso
        loadDashboard();

    });
}

async function loadDashboard(){

    const response = await fetch("dashboard.html");
    const html = await response.text();

    app.innerHTML = html;

    // Inicializar dashboard
    initializeDashboard();
}

// Iniciar aplicación
loadLogin();