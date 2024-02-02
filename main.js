document.addEventListener('DOMContentLoaded', () => {
  // Mostrar mensaje de carga

  Swal.fire({
    title: 'procesando contraseñas seguras para ustedes...',
    allowOutsideClick: false,
    showConfirmButton: false,
    background: '#ffffff'
  
  });

  // Contador regresivo de 3 a 1 antes de mostrar la página
  let count = 3;
  const countdownInterval = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(countdownInterval);
      Swal.close(); // Ocultar el mensaje de carga
      showPage();  // Mostrar la página principal
    }
  }, 1000);
});

function showPage() {
  const container = document.querySelector('.container');
  container.style.visibility = 'visible';
  container.classList.add('animate__animated', 'animate__fadeIn');
}

const generateBtn = document.getElementById('generateBtn');
const passwordDisplay = document.getElementById('passwordDisplay');
const passwordListElement = document.getElementById('passwordList');
const userDataForm = document.getElementById('userDataForm');
const messageElement = document.getElementById('message');
const addReviewBtn = document.getElementById('addReviewBtn');
const reviewsListElement = document.getElementById('reviewsList');
const storedPasswords = localStorage.getItem('passwordList');
const passwordList = storedPasswords ? JSON.parse(storedPasswords) : [];
const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

generateBtn.addEventListener('click', () => {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;

  if (!firstName.trim() || !lastName.trim() || !isValidName(firstName) || !isValidName(lastName) || !isValidEmail(email)) {
    showErrorMessage('Por favor, ingresa datos válidos en todos los campos.');
    return;
  }

  const generatedPassword = generatePassword();
  displayPassword(generatedPassword);
  savePassword(generatedPassword, firstName, lastName, email);

  userDataForm.reset();

  passwordDisplay.classList.add('animate__animated', 'animate__rubberBand');

  showMessage('La contraseña se mostrará por 5 segundos por motivos de seguridad.');
  setTimeout(() => {
    passwordDisplay.innerHTML = '';
    messageElement.innerHTML = '';
    clearPasswordList();
    showMessage('Las contraseñas han sido borradas por seguridad y enviadas a su correo personal.');
  }, 5000);

  setTimeout(() => {
    messageElement.innerHTML = '';
  }, 8000);
});

addReviewBtn.addEventListener('click', () => {
  const reviewName = document.getElementById('reviewName').value;
  const reviewText = document.getElementById('reviewText').value;

  if (reviewName && reviewText) {
    const review = {
      name: reviewName,
      text: reviewText,
    };

    reviews.push(review);
    updateReviewsList();
    clearReviewForm();

    localStorage.setItem('reviews', JSON.stringify(reviews));
  } else {
    showReviewErrorMessage('Por favor, completa todos los campos de la reseña.');
  }
});

function showMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.innerHTML = message;
  messageElement.style.display = 'block';
}

function showErrorMessage(message) {
  const errorMessageElement = document.createElement('div');
  errorMessageElement.className = 'alert alert-danger mt-2';
  errorMessageElement.innerHTML = message;

  const formContainer = document.getElementById('userDataForm');
  formContainer.insertBefore(errorMessageElement, formContainer.firstChild);

  setTimeout(() => {
    errorMessageElement.remove();
  }, 5000);
}

function showReviewErrorMessage(message) {
  const errorMessageElement = document.createElement('div');
  errorMessageElement.className = 'alert alert-danger mt-2';
  errorMessageElement.innerHTML = message;

  const formContainer = document.getElementById('reviewForm'); // Cambiado a 'reviewForm'
  formContainer.insertBefore(errorMessageElement, formContainer.firstChild);

  setTimeout(() => {
    errorMessageElement.remove();
  }, 5000);
}

function updateReviewsList() {
  reviewsListElement.innerHTML = '';

  reviews.forEach((review) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item text-dark'; // Agregué la clase text-dark para cambiar el color del texto a negro
    listItem.innerHTML = `<strong>${review.name}:</strong> ${review.text}`;
    reviewsListElement.appendChild(listItem);
  });
}

function isValidName(name) {
  return /^[a-zA-Z]+$/.test(name);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generatePassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const passwordLength = 12;
  let password = '';

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}

function displayPassword(password) {
  const passwordElement = document.createElement('div');
  passwordElement.innerHTML = `<strong>Contraseña generada:</strong> ${password}`;
  passwordDisplay.insertBefore(passwordElement, passwordDisplay.firstChild);
}

function savePassword(password, firstName, lastName, email) {
  const newPassword = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  passwordList.unshift(newPassword);
  updatePasswordList();
  localStorage.setItem('passwordList', JSON.stringify(passwordList));
}

function updatePasswordList() {
  passwordListElement.innerHTML = '';

  passwordList.forEach((review) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item text-dark';
    listItem.innerHTML = `<strong>${review.name}:</strong> ${review.text}`;
    reviewsListElement.appendChild(listItem);
  });
}

function clearPasswordList() {
  passwordListElement.innerHTML = '';
  passwordList.length = 0;
  localStorage.removeItem('passwordList');
}

function clearReviewForm() {
  document.getElementById('reviewName').value = '';
  document.getElementById('reviewText').value = '';
}
function getExamplePasswords() {
  return fetch('data.json')
    .then(response => response.json())
    .catch(error => console.error('Error al obtener contraseñas de ejemplo:', error));
}

function updatePasswordList() {
  passwordListElement.innerHTML = '';

  passwordList.forEach((entry) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item text-dark';
    listItem.innerHTML = `<strong>${entry.firstName} ${entry.lastName} (${entry.email}):</strong> ${entry.password}`;
    passwordListElement.appendChild(listItem);
  });
}
