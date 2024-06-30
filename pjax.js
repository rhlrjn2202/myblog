// src/js/pjax.js
import Pjax from 'pjax-api';

const pjax = new Pjax({
  elements: 'a', // default is 'a[href], form[action]'
  selectors: ['main', 'title'], // default is 'title, .js-Pjax'
  cacheBust: false,
  scrollTo: 0,
  analytics: false,
});

document.addEventListener('pjax:send', () => {
  console.log('Pjax request sent');
});

document.addEventListener('pjax:complete', () => {
  console.log('Pjax request completed');
  // Reinitialize Google Analytics
  if (typeof gtag === 'function') {
    gtag('config', 'G-33KK9XWT1K', {
      'page_path': window.location.pathname
    });
  }
});
