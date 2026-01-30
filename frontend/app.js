const container = document.querySelector('.auth-container');
const signupBtn = document.getElementById('signup-btn');
const signinBtn = document.getElementById('signin-btn');

signupBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  container.classList.add('active-signup');
});

signinBtn.addEventListener('click', (e) => {
  e.preventDefault();
  container.classList.remove('active-signup');
});

