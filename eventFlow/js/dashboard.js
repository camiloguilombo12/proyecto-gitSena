
/* ========================================
   FLAG DE INICIALIZACIÓN
   ======================================== */
let dashboardInitialized = false;

/* COUNTERS */
function animateCounters() {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        if(counter.dataset.animated === "true") {
            console.log("⏭️ Contador ya animado, saltando...");
            return;
        }

        const target = +counter.dataset.target;
        let current = 0;
        const increment = target / 50;

        const updateCounter = () => {
            current += increment;

            if(current < target){
                counter.innerText = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
                counter.dataset.animated = "true";
            }
        };

        updateCounter();
    });
}

/* BUTTON */
function setupCreateEventButton(){
    const button = document.getElementById("create-event-btn");

    if(!button) {
        console.error("❌ Botón create-event-btn no encontrado");
        return;
    }

    if(button.dataset.hasListener === "true") {
        console.log("⏭️ Botón ya tiene listener, saltando...");
        return;
    }

    const handleClick = () => {
        const table = document.getElementById("events-table");
        const eventName = "Cybersecurity Summit";
        const existingEvents = Array.from(table.querySelectorAll("tr td:first-child"));
        
        const eventExists = existingEvents.some(td => 
            td.textContent.trim() === eventName
        );
        
        if(eventExists) {
            alert("⚠️ Este evento ya existe en la lista");
            console.warn(`El evento "${eventName}" ya está registrado`);
            return;
        }
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${eventName}</td>
            <td>June 15</td>
            <td>Room 204</td>
            <td class="active">Active</td>
        `;

        table.appendChild(row);
        console.log(`✅ Evento "${eventName}" agregado correctamente`);
    };

    button.addEventListener("click", handleClick);
    button.dataset.hasListener = "true";
}

/* NAVBAR EFFECT */
function setupNavbarEffects(){
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        if(link.dataset.hasListener === "true") {
            console.log("⏭️ Link ya tiene listener, saltando...");
            return;
        }

        const handleClick = (e) => {
            const href = link.getAttribute("href");
            
            if(href === "#" || href === "" || !href) {
                e.preventDefault();
                console.log("🔗 Link placeholder detectado, previniendo navegación");
            } else {
                console.log(`🔗 Navegando a: ${href}`);
            }
            
            links.forEach(item =>
                item.classList.remove("active-link")
            );
            link.classList.add("active-link");
        };

        link.addEventListener("click", handleClick);
        link.dataset.hasListener = "true";
    });
}

/* ✅ HOTFIX: LOGOUT FUNCTION */
function setupLogoutButton(){
    const logoutBtn = document.getElementById("logout-btn");
    
    if(!logoutBtn) {
        console.error("❌ Botón logout no encontrado");
        return;
    }
    
    if(logoutBtn.dataset.hasListener === "true") {
        console.log("⏭️ Logout ya tiene listener, saltando...");
        return;
    }
    
    logoutBtn.addEventListener("click", () => {
        console.log("🔓 Cerrando sesión...");
        
        // Confirmar logout
        const confirmLogout = confirm("¿Estás seguro que deseas cerrar sesión?");
        
        if(!confirmLogout) {
            console.log("❌ Logout cancelado");
            return;
        }
        
        // Limpiar localStorage
        localStorage.removeItem("eventflow_session");
        localStorage.removeItem("eventflow_user");
        
        console.log("✅ Sesión cerrada correctamente");
        
        // Resetear dashboard
        resetDashboard();
        
        // Volver al login
        loadLogin();
    });
    
    logoutBtn.dataset.hasListener = "true";
}

/* ✅ HOTFIX: CARGAR DATOS DE USUARIO */
function loadUserData(){
    const userData = localStorage.getItem("eventflow_user");
    
    if(userData) {
        try {
            const user = JSON.parse(userData);
            const usernameElement = document.getElementById("username");
            
            if(usernameElement) {
                usernameElement.textContent = user.email.split("@")[0];
                console.log(`👤 Usuario cargado: ${user.email}`);
            }
        } catch(error) {
            console.error("Error al cargar datos de usuario:", error);
        }
    }
}

/* INICIALIZAR DASHBOARD */
function initializeDashboard(){
    if(dashboardInitialized) {
        console.warn("⚠️ Dashboard ya está inicializado, saltando...");
        return;
    }

    console.log("✅ Inicializando dashboard...");
    
    animateCounters();
    setupCreateEventButton();
    setupNavbarEffects();
    setupLogoutButton(); // ✅ HOTFIX: Agregar logout
    loadUserData(); // ✅ HOTFIX: Cargar datos de usuario
    
    dashboardInitialized = true;
    
    console.log("✅ Dashboard inicializado correctamente");
}

/* RESETEAR DASHBOARD */
function resetDashboard(){
    dashboardInitialized = false;
    
    document.querySelectorAll(".counter").forEach(counter => {
        counter.dataset.animated = "false";
    });
    
    const button = document.getElementById("create-event-btn");
    if(button) button.dataset.hasListener = "false";
    
    document.querySelectorAll(".nav-link").forEach(link => {
        link.dataset.hasListener = "false";
    });
    
    const logoutBtn = document.getElementById("logout-btn");
    if(logoutBtn) logoutBtn.dataset.hasListener = "false";
    
    console.log("🔄 Dashboard reseteado");
}