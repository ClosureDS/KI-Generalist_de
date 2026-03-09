/* ===== Webhook Endpoint (obfuscated) ===== */

const _a = atob('aHR0cHM6Ly9uOG4ua2ktYWdlbnRzLXNvbHV0aW9ucy5kZS93ZWJob29r');
const _b = atob('L2JlMDQ1NTMxLWQwM2MtNGVjOC1iYzZkLTI4MDU1ZWVmYTAwOQ==');
function getEndpoint() { return _a + _b; }

/* ===== Toast System ===== */

function showToast({ title, description, variant }) {
  const container = document.getElementById('toast-container');

  const toast = document.createElement('div');
  toast.className = 'toast' + (variant === 'destructive' ? ' destructive' : '');

  const content = document.createElement('div');
  content.className = 'toast-content';

  const titleEl = document.createElement('div');
  titleEl.className = 'toast-title';
  titleEl.textContent = title;

  const descEl = document.createElement('div');
  descEl.className = 'toast-description';
  descEl.textContent = description;

  content.appendChild(titleEl);
  content.appendChild(descEl);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'toast-close';
  closeBtn.setAttribute('aria-label', 'Schließen');
  closeBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`;
  closeBtn.addEventListener('click', () => dismissToast(toast));

  toast.appendChild(content);
  toast.appendChild(closeBtn);

  container.appendChild(toast);

  // Auto-dismiss after 5s
  setTimeout(() => dismissToast(toast), 5000);
}

function dismissToast(toast) {
  if (toast.classList.contains('closing')) return;
  toast.classList.add('closing');
  toast.addEventListener('animationend', () => toast.remove());
}

/* ===== Email Validation ===== */

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ===== Form Handling ===== */

function initForms() {
  document.querySelectorAll('.waitlist-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const source = form.dataset.source;
      const input = form.querySelector('input[type="email"]');
      const button = form.querySelector('button[type="submit"]');
      const email = input.value.trim();

      // Validation
      if (!email) {
        showToast({
          title: 'Email erforderlich',
          description: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
          variant: 'destructive'
        });
        return;
      }

      if (!validateEmail(email)) {
        showToast({
          title: 'Ungültige E-Mail',
          description: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
          variant: 'destructive'
        });
        return;
      }

      // Loading state
      input.disabled = true;
      button.disabled = true;
      button.innerHTML = `
        <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:0.5rem;">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
        Senden...
      `;

      try {
        const response = await fetch(getEndpoint(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eMailAdress: email, source })
        });

        if (!response.ok) throw new Error('Request failed');

        showToast({
          title: 'Erfolgreich angemeldet!',
          description: 'Sie stehen jetzt auf der Warteliste. Wir melden uns bald bei Ihnen.'
        });

        input.value = '';
      } catch (error) {
        console.error('Waitlist submission error:', error);
        showToast({
          title: 'Fehler',
          description: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
          variant: 'destructive'
        });
      } finally {
        input.disabled = false;
        button.disabled = false;
        button.textContent = 'Anmelden';
      }
    });
  });
}

/* ===== Scroll Animations (IntersectionObserver) ===== */

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.scroll-fade-up, .scroll-fade-left').forEach(el => {
    observer.observe(el);
  });
}

/* ===== Init ===== */

document.addEventListener('DOMContentLoaded', () => {
  initForms();
  initScrollAnimations();
});
