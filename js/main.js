/* === MAIN JS === */

document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Nav ---
  const nav = document.getElementById('mainNav');
  const navOffset = nav.offsetTop;
  let navPlaceholder = null;

  function handleStickyNav() {
    if (window.scrollY >= navOffset) {
      if (!nav.classList.contains('sticky')) {
        // Create placeholder to prevent layout jump
        navPlaceholder = document.createElement('div');
        navPlaceholder.style.height = nav.offsetHeight + 'px';
        nav.parentNode.insertBefore(navPlaceholder, nav.nextSibling);
        nav.classList.add('sticky');
      }
    } else {
      if (nav.classList.contains('sticky')) {
        nav.classList.remove('sticky');
        if (navPlaceholder) {
          navPlaceholder.remove();
          navPlaceholder = null;
        }
      }
    }
  }

  window.addEventListener('scroll', handleStickyNav, { passive: true });

  // --- Smooth Scroll for nav links ---
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        const navHeight = nav.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // --- YouTube Lazy Load ---
  document.querySelectorAll('.video-container[data-video-id]').forEach(container => {
    container.addEventListener('click', () => {
      const videoId = container.getAttribute('data-video-id');
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.title = 'YouTube video';
      container.innerHTML = '';
      container.appendChild(iframe);
    });
  });
});
