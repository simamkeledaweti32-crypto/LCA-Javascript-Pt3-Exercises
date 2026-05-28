document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Stop page reload
    
    clearErrors();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let isValid = true;

    if (username === '') {
      showError('username', 'Username cannot be empty.');
      isValid = false;
    }

    if (email === '') {
      showError('email', 'Email cannot be empty.');
      isValid = false;
    } else if (!email.includes('@')) {
      showError('email', 'Email must contain an @ symbol.');
      isValid = false;
    }

    if (password === '') {
      showError('password', 'Password cannot be empty.');
      isValid = false;
    } else if (password.length < 6) {
      showError('password', 'Password must be at least 6 characters long.');
      isValid = false;
    }

    if (confirmPassword === '') {
      showError('confirmPassword', 'Confirm Password cannot be empty.');
      isValid = false;
    } else if (password !== confirmPassword) {
      showError('confirmPassword', 'Passwords must match.');
      isValid = false;
    }

    if (isValid) {
      formMessage.textContent = 'Registration successful!';
      console.log('Collected form data:', { username, email });
      form.reset();
    }
  });

  function showError(field, message) {
    document.getElementById(`${field}Error`).textContent = message;
    document.getElementById(field).classList.add('invalid');
  }

  function clearErrors() {
    formMessage.textContent = '';
    document.querySelectorAll('.error').forEach(div => div.textContent = '');
    document.querySelectorAll('input').forEach(input => input.classList.remove('invalid'));
  }
});
