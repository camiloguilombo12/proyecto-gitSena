const app = document.getElementById("app");

async function loadLogin(){

    const response = await fetch("login.html");
    const html = await response.text();

    app.innerHTML = html;

    const loginForm = document.getElementById("loginForm");

    // Inputs
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    // Mensaje
    const message = document.getElementById("message");
    // Botón login
    const loginBtn = document.getElementById("loginBtn");

    // Evento submit
    loginForm.addEventListener("submit", function(event){

        // Evita recargar
        event.preventDefault();
        // Evitar múltiples clicks
        loginBtn.disabled = true;
        loginBtn.textContent = "Loading...";

        // Obtener valores
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        /* VALIDAR CAMPOS VACÍOS*/
        if(emailValue === "" || passwordValue === ""){

            message.textContent = "All fields are required";
            message.style.color = "red";

            loginBtn.disabled = false;
            loginBtn.textContent = "Login";

            return;
        }

        /* VALIDAR EMAIL */
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(emailValue)){

            message.textContent = "Enter a valid email";
            message.style.color = "red";

            loginBtn.disabled = false;
            loginBtn.textContent = "Login";

            return;
        }

        /* VALIDAR CONTRASEÑA */
        const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[#\$%\&!])[A-Za-z\d#\$%\&!]{6,}$/;

        if(!passwordRegex.test(passwordValue)){

            message.textContent =
            "Password must contain at least 6 characters, one uppercase letter, one number and one special character (#$%&!)";

            message.style.color = "red";

            loginBtn.disabled = false;
            loginBtn.textContent = "Login";

            
            return;
        }

        /* LOGIN EXITOSO*/

        message.textContent = "Login successful";
        message.style.color = "green";

        // Esperar un poco antes de cargar dashboard
        setTimeout(() => {
            loadDashboard();
        }, 1000);

    });
}

async function loadDashboard(){

    const response = await fetch("dashboard.html");
    const html = await response.text();

    app.innerHTML = html;

    initializeDashboard();
}

// Iniciar aplicación
loadLogin();