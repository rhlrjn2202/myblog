document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  navToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
});
