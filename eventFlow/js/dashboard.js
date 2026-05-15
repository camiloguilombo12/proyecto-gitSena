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
            // ✅ HOTFIX-003: Solo prevenir default si es un placeholder (#)
            const href = link.getAttribute("href");
            
            if(href === "#" || href === "" || !href) {
                // Es un placeholder, prevenir comportamiento por defecto
                e.preventDefault();
                console.log("🔗 Link placeholder detectado, previniendo navegación");
            } else {
                // Es una ruta real, permitir navegación normal
                console.log(`🔗 Navegando a: ${href}`);
                // NO llamar e.preventDefault(), dejar que el navegador maneje la ruta
            }
            
            // Actualizar estado activo de todos modos
            links.forEach(item =>
                item.classList.remove("active-link")
            );
            link.classList.add("active-link");
        };

        link.addEventListener("click", handleClick);
        link.dataset.hasListener = "true";
    });
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
    
    console.log("🔄 Dashboard reseteado");
}