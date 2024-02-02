// ui.js
function showPage() {
    const container = document.querySelector('.container');
    container.style.visibility = 'visible';
    container.classList.add('animate__animated', 'animate__fadeIn');
}

function showLoadingMessage() {
    Swal.fire({
        title: 'Cargando contraseñas seguras para ustedes...',
        allowOutsideClick: false,
        showConfirmButton: false,
        background: '#007bff'
    });
}

function closeLoadingMessage() {
    Swal.close(); 
}
