const app = document.getElementById("app");

/* ✅ HOTFIX: VERIFICAR SESIÓN AL INICIAR */
function checkSession(){
    const session = localStorage.getItem("eventflow_session");
    
    if(session) {
        console.log("✅ Sesión activa detectada, cargando dashboard...");
        loadDashboard();
        return true;
    }
    
    console.log("❌ No hay sesión activa, mostrando login...");
    return false;
}

async function loadLogin(){

    try{

        const response = await fetch("login.html");

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

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const message = document.getElementById("message");

    const loginBtn = document.getElementById("loginBtn");

    loginForm.addEventListener("submit", function(event){

        event.preventDefault();

        loginBtn.disabled = true;
        loginBtn.textContent = "Loading...";

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

        /* ✅ HOTFIX: LOGIN EXITOSO - GUARDAR SESIÓN */

        message.textContent = "Login successful";
        message.style.color = "green";

        // Guardar sesión en localStorage
        const sessionData = {
            email: emailValue,
            loginTime: new Date().toISOString(),
            isAuthenticated: true
        };

        localStorage.setItem("eventflow_session", "active");
        localStorage.setItem("eventflow_user", JSON.stringify(sessionData));

        console.log("✅ Sesión guardada en localStorage");

        setTimeout(() => {
            loadDashboard();
        }, 1000);

    });
}

async function loadDashboard(){

    try{

        const response = await fetch("dashboard.html");

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

/* ✅ HOTFIX: INICIAR APLICACIÓN CON VERIFICACIÓN DE SESIÓN */
console.log("🚀 Iniciando EventFlow...");

if(!checkSession()) {
    loadLogin();
}