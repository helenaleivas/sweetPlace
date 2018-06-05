const enviar = document.querySelector('#form');
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const checks = document.querySelectorAll('.form-check-input');
enviar.addEventListener('submit', function (e) {
  e.preventDefault();
  if ((nome.checkValidity()==true)&&(email.checkValidity()==true)){
    window.location = 'index.html';
  }
});
const form = document.querySelector('form');
form.addEventListener('submit', function (e) {
  localStorage.setItem("nome", nome.value);
  localStorage.setItem("email", email.value);
  form.reset();
  e.preventDefault();
});
