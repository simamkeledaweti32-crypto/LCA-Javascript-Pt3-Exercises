document.addEventListener('DOMContentLoaded', () => {

  // ===== LOGIN FUNCTION =====
  const loginForm = document.querySelector('#loginForm');
  const modal = document.querySelector('.modal');
  const tryAgainBtn = document.querySelector('#tryAgainBtn');

  const correctUsername = 'admin';
  const correctPassword = 'password123';

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const username = document.querySelector('#username').value.trim();
      const password = document.querySelector('#password').value.trim();

      if (username === correctUsername && password === correctPassword) {
        window.location.href = 'index.html';
      } else {
        if (modal) modal.style.display = 'block';
      }
    });
  }

  if (tryAgainBtn && modal) {
    tryAgainBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // ===== SIDEBAR TOGGLE FUNCTION =====
  const toggleBtn = document.querySelector('.btn-toggle-nav');
  const sidebar = document.querySelector('.nav-sidebar');

  if (toggleBtn && sidebar) {
    sidebar.style.width = '50px';
    sidebar.querySelector('ul').style.visibility = 'hidden';
    sidebar.querySelector('ul').style.opacity = '0';

    toggleBtn.addEventListener('click', () => {
      if (sidebar.style.width === '250px') {
        sidebar.style.width = '50px';
        sidebar.querySelector('ul').style.visibility = 'hidden';
        sidebar.querySelector('ul').style.opacity = '0';
      } else {
        sidebar.style.width = '250px';
        sidebar.querySelector('ul').style.visibility = 'visible';
        sidebar.querySelector('ul').style.opacity = '1';
      }
    });
  }

});
