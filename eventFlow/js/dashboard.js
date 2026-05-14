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

    button.addEventListener("click", () => {
        const table = document.getElementById("events-table");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>Cybersecurity Summit</td>
            <td>June 15</td>
            <td>Room 204</td>
            <td class="active">Active</td>
        `;

        table.appendChild(row);
    });
}

/* NAVBAR EFFECT */
function setupNavbarEffects(){
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(item =>
                item.classList.remove("active-link")
            );
            link.classList.add("active-link");
        });
    });
}

/* INICIALIZAR DASHBOARD - ESTA FUNCIÓN FALTABA */
function initializeDashboard(){
    animateCounters();
    setupCreateEventButton();
    setupNavbarEffects();
}

// ELIMINAR ESTA LÍNEA - loadDashboard(); NO EXISTE AQUÍ