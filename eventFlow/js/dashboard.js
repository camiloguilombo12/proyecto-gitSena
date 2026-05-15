/* COUNTERS */
function animateCounters() {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
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

    button.addEventListener("click", () => {
        const table = document.getElementById("events-table");
        
        // ✅ CORRECCIÓN QA-004: Verificar si el evento ya existe
        const eventName = "Cybersecurity Summit";
        const existingEvents = Array.from(table.querySelectorAll("tr td:first-child"));
        
        // Buscar si ya existe un evento con ese nombre
        const eventExists = existingEvents.some(td => 
            td.textContent.trim() === eventName
        );
        
        if(eventExists) {
            // ✅ Mostrar mensaje si el evento ya existe
            alert("⚠️ Este evento ya existe en la lista");
            console.warn(`El evento "${eventName}" ya está registrado`);
            return; // Detener la ejecución
        }
        
        // Si no existe, agregar el nuevo evento
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${eventName}</td>
            <td>June 15</td>
            <td>Room 204</td>
            <td class="active">Active</td>
        `;

        table.appendChild(row);
        
        // ✅ Mensaje de confirmación
        console.log(`✅ Evento "${eventName}" agregado correctamente`);
    });
}

/* NAVBAR EFFECT */
function setupNavbarEffects(){
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // ✅ Prevenir comportamiento por defecto
            
            links.forEach(item =>
                item.classList.remove("active-link")
            );
            link.classList.add("active-link");
        });
    });
}

/* INICIALIZAR DASHBOARD */
function initializeDashboard(){
    console.log("✅ Inicializando dashboard...");
    
    animateCounters();
    setupCreateEventButton();
    setupNavbarEffects();
    
    console.log("✅ Dashboard inicializado correctamente");
}