const app = document.getElementById("app");

async function loadLogin(){

    try{

        const response = await fetch("login.html");

        // Validar respuesta
        if(!response.ok){
            throw new Error("Error loading login");
        }

        const html = await response.text();

        app.innerHTML = html;

    }catch(error){

        app.innerHTML = `
            <div class="fetch-error">
                <h2>Error loading login</h2>
                <p>Please try again later</p>
            </div>
        `;

        console.error(error);

        return;
    }

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

    try{

        const response = await fetch("dashboard.html");

        // Validar respuesta
        if(!response.ok){
            throw new Error("Error loading dashboard");
        }

        const html = await response.text();

        app.innerHTML = html;

        initializeDashboard();

    }catch(error){

        app.innerHTML = `
            <div class="fetch-error">
                <h2>Error loading dashboard</h2>
                <p>Please try again later</p>
            </div>
        `;

        console.error(error);
    }
}

// Iniciar aplicación
loadLogin();