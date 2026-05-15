/* ========================================
   FLAG DE INICIALIZACIÓN
   ======================================== */
let dashboardInitialized = false;

/* COUNTERS */
function animateCounters() {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        // ✅ HOTFIX: Verificar si ya fue animado
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
                // ✅ HOTFIX: Marcar como animado
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

    // ✅ HOTFIX: Remover listeners anteriores si existen
    if(button.dataset.hasListener === "true") {
        console.log("⏭️ Botón ya tiene listener, saltando...");
        return;
    }

    // ✅ HOTFIX: Crear función manejadora para poder removerla si es necesario
    const handleClick = () => {
        const table = document.getElementById("events-table");
        
        // Verificar si el evento ya existe
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
    
    // ✅ HOTFIX: Marcar que ya tiene listener
    button.dataset.hasListener = "true";
}

/* NAVBAR EFFECT */
function setupNavbarEffects(){
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        // ✅ HOTFIX: Verificar si ya tiene listener
        if(link.dataset.hasListener === "true") {
            console.log("⏭️ Link ya tiene listener, saltando...");
            return;
        }

        const handleClick = (e) => {
            e.preventDefault();
            
            links.forEach(item =>
                item.classList.remove("active-link")
            );
            link.classList.add("active-link");
        };

        link.addEventListener("click", handleClick);
        
        // ✅ HOTFIX: Marcar que ya tiene listener
        link.dataset.hasListener = "true";
    });
}

/* INICIALIZAR DASHBOARD */
function initializeDashboard(){
    // ✅ HOTFIX: Prevenir múltiples inicializaciones
    if(dashboardInitialized) {
        console.warn("⚠️ Dashboard ya está inicializado, saltando...");
        return;
    }

    console.log("✅ Inicializando dashboard...");
    
    animateCounters();
    setupCreateEventButton();
    setupNavbarEffects();
    
    // ✅ HOTFIX: Marcar como inicializado
    dashboardInitialized = true;
    
    console.log("✅ Dashboard inicializado correctamente");
}

/* ✅ HOTFIX: Función para resetear el dashboard (opcional) */
function resetDashboard(){
    dashboardInitialized = false;
    
    // Limpiar flags de contadores
    document.querySelectorAll(".counter").forEach(counter => {
        counter.dataset.animated = "false";
    });
    
    // Limpiar flags de listeners
    const button = document.getElementById("create-event-btn");
    if(button) button.dataset.hasListener = "false";
    
    document.querySelectorAll(".nav-link").forEach(link => {
        link.dataset.hasListener = "false";
    });
    
    console.log("🔄 Dashboard reseteado");
}   