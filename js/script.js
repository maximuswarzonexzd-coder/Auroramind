/**
 * Aurora Mind — Script Principal
 * Menu, FAQ, planos, checkout, WhatsApp e prova social
 */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '5532999577201';
  const WHATSAPP_BASE = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=';

  /* ============================================
     DOM Elements
     ============================================ */
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const fadeElements = document.querySelectorAll('.fade-in');
  const faqItems = document.querySelectorAll('.faq__item');
  const pricingBtns = document.querySelectorAll('.pricing__btn');
  const navLinkElements = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');
  const pricingToggleBtns = document.querySelectorAll('.pricing__toggle-btn');
  const pricingPanels = document.querySelectorAll('.pricing__panel');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutPlanTabs = document.querySelectorAll('.checkout__plan-tab');
  const checkoutPlanOptions = document.querySelectorAll('.checkout__plan-option');
  const planRadios = document.querySelectorAll('input[name="selectedPlan"]');
  const summaryPlan = document.getElementById('summaryPlan');
  const summaryBilling = document.getElementById('summaryBilling');
  const summaryDiscount = document.getElementById('summaryDiscount');
  const summaryPrice = document.getElementById('summaryPrice');
  const summaryCard = document.getElementById('summaryCard');
  const checkoutPlanInput = document.getElementById('checkoutPlanInput');
  const checkoutBillingInput = document.getElementById('checkoutBillingInput');
  const checkoutPriceInput = document.getElementById('checkoutPriceInput');
  const socialProofEl = document.getElementById('socialProof');
  const stickyCta = document.getElementById('stickyCta');
  const comprarSection = document.getElementById('comprar');

  let selectedPlanData = null;

  /* ============================================
     Helpers
     ============================================ */
  function formatPrice(value) {
    return 'R$ ' + Number(value).toLocaleString('pt-BR');
  }

  function getBillingLabel(billing) {
    return billing === 'mensal' ? 'Plano Mensal' : 'Projeto Único';
  }

  function scrollToElement(el) {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ============================================
     Mobile Menu
     ============================================ */
  function openMenu() {
    navLinks.classList.add('nav__links--open');
    hamburgerBtn.classList.add('nav__hamburger--active');
    navOverlay.classList.add('nav__overlay--visible');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Fechar menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('nav__links--open');
    hamburgerBtn.classList.remove('nav__hamburger--active');
    navOverlay.classList.remove('nav__overlay--visible');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (navLinks.classList.contains('nav__links--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);
  navLinkElements.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('nav__links--open')) {
      closeMenu();
    }
  });

  /* ============================================
     Header Scroll Effect
     ============================================ */
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ============================================
     Scroll Trigger — Fade In
     ============================================ */
  function initScrollTrigger() {
    if (!('IntersectionObserver' in window)) {
      fadeElements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  initScrollTrigger();

  /* ============================================
     Active Nav Link on Scroll
     ============================================ */
  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinkElements.forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* ============================================
     FAQ Accordion
     ============================================ */
  function initFAQ() {
    faqItems.forEach(function (item) {
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');
      if (!question || !answer) return;

      question.addEventListener('click', function () {
        const isActive = item.classList.contains('faq__item--active');

        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove('faq__item--active');
          const otherQuestion = otherItem.querySelector('.faq__question');
          const otherAnswer = otherItem.querySelector('.faq__answer');
          if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.hidden = true;
        });

        if (!isActive) {
          item.classList.add('faq__item--active');
          question.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
        }
      });
    });
  }

  initFAQ();

  /* ============================================
     Pricing Toggle — Projeto / Mensal
     ============================================ */
  function switchPricingPanel(billing) {
    pricingToggleBtns.forEach(function (btn) {
      const isActive = btn.getAttribute('data-billing') === billing;
      btn.classList.toggle('pricing__toggle-btn--active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    pricingPanels.forEach(function (panel) {
      const isActive = panel.getAttribute('data-billing') === billing;
      panel.classList.toggle('pricing__panel--active', isActive);
      panel.hidden = !isActive;
    });
  }

  function initPricingToggle() {
    pricingToggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchPricingPanel(btn.getAttribute('data-billing'));
      });
    });
  }

  initPricingToggle();

  /* ============================================
     Plan Selection & Summary
     ============================================ */
  function updateSummary(data) {
    if (!data) {
      summaryPlan.textContent = 'Selecione um plano';
      summaryBilling.textContent = '—';
      summaryDiscount.textContent = '—';
      summaryPrice.textContent = 'R$ —';
      summaryCard.classList.remove('checkout__summary-card--selected');
      return;
    }

    summaryPlan.textContent = data.plan;
    summaryBilling.textContent = getBillingLabel(data.billing);
    summaryDiscount.textContent = '-R$100 (oferta do mês)';
    summaryPrice.textContent = formatPrice(data.price) + data.period;
    summaryCard.classList.add('checkout__summary-card--selected');

    if (checkoutPlanInput) checkoutPlanInput.value = data.plan;
    if (checkoutBillingInput) checkoutBillingInput.value = data.billing;
    if (checkoutPriceInput) checkoutPriceInput.value = data.price;
  }

  function selectPlanFromData(plan, billing, price, original, period) {
    selectedPlanData = { plan: plan, billing: billing, price: price, original: original, period: period };
    updateSummary(selectedPlanData);

    planRadios.forEach(function (radio) {
      if (
        radio.getAttribute('data-plan') === plan &&
        radio.getAttribute('data-billing') === billing
      ) {
        radio.checked = true;
      }
    });

    switchCheckoutTab(billing);
  }

  function getPlanDataFromRadio(radio) {
    return {
      plan: radio.getAttribute('data-plan'),
      billing: radio.getAttribute('data-billing'),
      price: radio.getAttribute('data-price'),
      original: radio.getAttribute('data-original'),
      period: radio.getAttribute('data-period')
    };
  }

  function switchCheckoutTab(billing) {
    checkoutPlanTabs.forEach(function (tab) {
      const isActive = tab.getAttribute('data-billing') === billing;
      tab.classList.toggle('checkout__plan-tab--active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    checkoutPlanOptions.forEach(function (option) {
      const isMensal = option.classList.contains('checkout__plan-option--mensal');
      if (billing === 'mensal') {
        option.hidden = !isMensal;
      } else {
        option.hidden = isMensal;
      }
    });

    const visibleRadios = Array.from(planRadios).filter(function (radio) {
      const option = radio.closest('.checkout__plan-option');
      return option && !option.hidden;
    });

    const hasCheckedVisible = visibleRadios.some(function (radio) {
      return radio.checked;
    });

    if (!hasCheckedVisible && visibleRadios.length > 0) {
      visibleRadios[0].checked = true;
      selectedPlanData = getPlanDataFromRadio(visibleRadios[0]);
      updateSummary(selectedPlanData);
    } else if (hasCheckedVisible) {
      const checked = visibleRadios.find(function (r) { return r.checked; });
      if (checked) {
        selectedPlanData = getPlanDataFromRadio(checked);
        updateSummary(selectedPlanData);
      }
    }
  }

  function initPlanSelection() {
    checkoutPlanTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        switchCheckoutTab(tab.getAttribute('data-billing'));
      });
    });

    planRadios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        if (radio.checked) {
          selectedPlanData = getPlanDataFromRadio(radio);
          updateSummary(selectedPlanData);
          document.getElementById('errorPlan').textContent = '';
        }
      });
    });
  }

  initPlanSelection();

  /* ============================================
     Pricing Buttons → Checkout
     ============================================ */
  function initPricingButtons() {
    pricingBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const plan = btn.getAttribute('data-plan');
        const billing = btn.getAttribute('data-billing');
        const price = btn.getAttribute('data-price');
        const original = btn.getAttribute('data-original');
        const period = btn.getAttribute('data-period');

        selectPlanFromData(plan, billing, price, original, period);
        scrollToElement(comprarSection);
      });
    });
  }

  initPricingButtons();

  /* ============================================
     Checkout Form Validation & WhatsApp
     ============================================ */
  function clearErrors() {
    document.querySelectorAll('.checkout__error').forEach(function (el) {
      el.textContent = '';
    });
    document.querySelectorAll('.checkout__input--error').forEach(function (el) {
      el.classList.remove('checkout__input--error');
    });
  }

  function setError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.add('checkout__input--error');
    if (error) error.textContent = message;
    return false;
  }

  function validateForm() {
    clearErrors();
    let valid = true;

    if (!selectedPlanData) {
      document.getElementById('errorPlan').textContent = 'Selecione um plano para continuar.';
      valid = false;
    }

    const name = document.getElementById('checkoutName').value.trim();
    const email = document.getElementById('checkoutEmail').value.trim();
    const phone = document.getElementById('checkoutPhone').value.trim();
    const company = document.getElementById('checkoutCompany').value.trim();
    const terms = document.getElementById('checkoutTerms').checked;

    if (!name) { setError('checkoutName', 'errorName', 'Informe seu nome completo.'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('checkoutEmail', 'errorEmail', 'Informe um e-mail válido.');
      valid = false;
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setError('checkoutPhone', 'errorPhone', 'Informe um WhatsApp válido.');
      valid = false;
    }
    if (!company) { setError('checkoutCompany', 'errorCompany', 'Informe o nome da empresa.'); valid = false; }
    if (!terms) {
      document.getElementById('errorTerms').textContent = 'Aceite os termos para continuar.';
      valid = false;
    }

    return valid;
  }

  function buildWhatsAppMessage() {
    const name = document.getElementById('checkoutName').value.trim();
    const email = document.getElementById('checkoutEmail').value.trim();
    const phone = document.getElementById('checkoutPhone').value.trim();
    const doc = document.getElementById('checkoutDoc').value.trim();
    const company = document.getElementById('checkoutCompany').value.trim();
    const segment = document.getElementById('checkoutSegment').value;
    const details = document.getElementById('checkoutDetails').value.trim();

    let msg = '🛒 *NOVO PEDIDO — Aurora Mind*\n\n';
    msg += '📋 *Plano:* ' + selectedPlanData.plan + '\n';
    msg += '📦 *Modalidade:* ' + getBillingLabel(selectedPlanData.billing) + '\n';
    msg += '💰 *Valor:* ' + formatPrice(selectedPlanData.price) + selectedPlanData.period + '\n';
    msg += '🎁 *Desconto:* R$100 OFF (oferta do mês)\n\n';
    msg += '👤 *Dados do Cliente*\n';
    msg += '• Nome: ' + name + '\n';
    msg += '• E-mail: ' + email + '\n';
    msg += '• WhatsApp: ' + phone + '\n';
    if (doc) msg += '• CPF/CNPJ: ' + doc + '\n';
    msg += '• Empresa: ' + company + '\n';
    if (segment) msg += '• Segmento: ' + segment + '\n';
    if (details) msg += '\n📝 *Detalhes do Projeto:*\n' + details + '\n';
    msg += '\n✅ Aguardo confirmação e formas de pagamento!';

    return msg;
  }

  function initCheckoutForm() {
    if (!checkoutForm) return;

    checkoutForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm()) {
        const firstError = checkoutForm.querySelector('.checkout__input--error, .checkout__error:not(:empty)');
        if (firstError) {
          const field = firstError.closest('.checkout__field') || firstError.closest('.checkout__fieldset');
          if (field) field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      const message = buildWhatsAppMessage();
      const url = WHATSAPP_BASE + encodeURIComponent(message);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  initCheckoutForm();

  /* ============================================
     Social Proof Notifications
     ============================================ */
  const socialProofData = [
    { name: 'Carlos M.', city: 'BH', action: 'contratou o Plano Profissional', time: '3 min' },
    { name: 'Ana Paula S.', city: 'SP', action: 'assinou o Plano Mensal Intermediário', time: '7 min' },
    { name: 'Roberto L.', city: 'RJ', action: 'comprou Site Institucional Básico', time: '12 min' },
    { name: 'Fernanda K.', city: 'Curitiba', action: 'contratou Landing Page Profissional', time: '18 min' },
    { name: 'Diego R.', city: 'Fortaleza', action: 'assinou Plano Mensal Profissional', time: '25 min' },
    { name: 'Juliana T.', city: 'Salvador', action: 'comprou Site Intermediário', time: '31 min' },
    { name: 'Marcos V.', city: 'Goiânia', action: 'contratou Cardápio Digital', time: '42 min' },
    { name: 'Patrícia N.', city: 'Recife', action: 'assinou Plano Mensal Básico', time: '55 min' },
    { name: 'Lucas H.', city: 'Porto Alegre', action: 'comprou Plano Profissional', time: '1h' },
    { name: 'Camila F.', city: 'Brasília', action: 'contratou Site Completo', time: '1h' }
  ];

  let socialProofIndex = 0;
  let socialProofTimeout;

  function showSocialProof() {
    if (!socialProofEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const data = socialProofData[socialProofIndex % socialProofData.length];
    socialProofIndex++;

    const toast = document.createElement('div');
    toast.className = 'social-proof__toast';
    toast.innerHTML =
      '<span class="social-proof__icon" aria-hidden="true">✓</span>' +
      '<div class="social-proof__content">' +
        '<p class="social-proof__text"><strong>' + data.name + '</strong> de ' + data.city + ' ' + data.action + '</p>' +
        '<span class="social-proof__time">há ' + data.time + '</span>' +
      '</div>';

    socialProofEl.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add('social-proof__toast--visible');
    });

    setTimeout(function () {
      toast.classList.remove('social-proof__toast--visible');
      toast.classList.add('social-proof__toast--exit');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 500);
    }, 5000);
  }

  function initSocialProof() {
    if (!socialProofEl) return;

    setTimeout(showSocialProof, 4000);

    function scheduleNext() {
      const delay = 8000 + Math.random() * 12000;
      socialProofTimeout = setTimeout(function () {
        showSocialProof();
        scheduleNext();
      }, delay);
    }

    scheduleNext();
  }

  initSocialProof();

  /* ============================================
     Sticky Mobile CTA
     ============================================ */
  function initStickyCta() {
    if (!stickyCta || !comprarSection) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const show = !entry.isIntersecting && window.scrollY > 400;
          stickyCta.classList.toggle('sticky-cta--visible', show);
          stickyCta.setAttribute('aria-hidden', show ? 'false' : 'true');
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(comprarSection);
    observer.observe(document.getElementById('inicio'));
  }

  initStickyCta();

  /* ============================================
     Stats Counter Animation
     ============================================ */
  function animateCounter(element, target) {
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      element.textContent = '+' + current + '%';
      element.classList.add('counting');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = '+' + target + '%';
        element.classList.remove('counting');
      }
    }

    requestAnimationFrame(update);
  }

  function initStatsCounter() {
    const counterEl = document.querySelector('.stats__number[data-target]');
    if (!counterEl) return;

    const target = parseInt(counterEl.getAttribute('data-target'), 10);
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(counterEl, target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterObserver.observe(counterEl.closest('.stats__card'));
  }

  initStatsCounter();

  /* ============================================
     Particles Background (Canvas)
     ============================================ */
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let width, height;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createParticles() {
      const count = Math.min(Math.floor(width * height / 15000), 80);
      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.1
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, ' + p.opacity + ')';
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });

      particles.forEach(function (p1, i) {
        particles.slice(i + 1).forEach(function (p2) {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(139, 92, 246, ' + (0.08 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', function () {
      cancelAnimationFrame(animationId);
      resize();
      createParticles();
      draw();
    });
  }

  initParticles();

  /* ============================================
     Smooth Scroll for Anchor Links
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ============================================
     URL Hash — Pre-select plan from link
     ============================================ */
  function handleUrlHash() {
    const hash = window.location.hash;
    if (hash && hash.includes('plan=')) {
      const params = new URLSearchParams(hash.split('?')[1] || '');
      const plan = params.get('plan');
      const billing = params.get('billing') || 'projeto';
      if (plan) {
        const btn = document.querySelector(
          '.pricing__btn[data-plan="' + plan + '"][data-billing="' + billing + '"]'
        );
        if (btn) {
          selectPlanFromData(
            btn.getAttribute('data-plan'),
            btn.getAttribute('data-billing'),
            btn.getAttribute('data-price'),
            btn.getAttribute('data-original'),
            btn.getAttribute('data-period')
          );
        }
      }
    }
  }

  handleUrlHash();

})();
