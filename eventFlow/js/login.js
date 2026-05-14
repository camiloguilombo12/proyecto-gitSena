 // Obtener formulario
const loginForm = document.getElementById("loginForm");

// Obtener inputs
const email = document.getElementById("email");
const password = document.getElementById("password");
 

// Evento submit
loginForm.addEventListener("submit", function(event){

    // Evita recargar la página
    event.preventDefault();

    // Obtener valores
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();


    // Limpiar formulario
    loginForm.reset();

});
