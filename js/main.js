window.onload = function () {
  window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  localStorage.removeItem('lang');
  let currentLang = 'en';

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("UserName");
  const emailInput = document.getElementById("UserEmail");
  const phoneInput = document.getElementById("UserPhone");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const messageError = document.getElementById("messageError");
  const formSuccess = document.getElementById("formSuccess");

  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarSupportedContent');
  const navbar = document.querySelector(".navbar");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{8,15}$/;

  if (nameError) nameError.textContent = "";
  if (emailError) emailError.textContent = "";
  if (phoneError) phoneError.textContent = "";
  if (messageError) messageError.textContent = "";

  function clearErrorOnInput(inputEl, errorEl, validatorFn = null) {
    if (inputEl && errorEl) {
      inputEl.addEventListener('input', () => {
        if (!validatorFn || validatorFn(inputEl.value.trim())) {
          errorEl.textContent = "";
        }
      });
    }
  }

  clearErrorOnInput(nameInput, nameError, value => value !== "");
  clearErrorOnInput(emailInput, emailError, value => emailRegex.test(value));
  clearErrorOnInput(phoneInput, phoneError, value => phoneRegex.test(value));
  clearErrorOnInput(messageInput, messageError, value => value.length >= 5);

  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  if (navbarCollapse) {
    navbarCollapse.addEventListener("show.bs.collapse", function () {
      navbar.classList.add("show-bg");
    });
    navbarCollapse.addEventListener("hide.bs.collapse", function () {
      navbar.classList.remove("show-bg");
    });
  }

  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      scrollToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (navLinks && navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const isNavbarVisible = window.getComputedStyle(navbarCollapse).display !== 'none';
        if (isNavbarVisible && window.innerWidth < 992) {
          const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
          if (collapseInstance) {
            collapseInstance.hide();
          }
        }
      });
    });
  }

  const langFlags = document.querySelectorAll('.lang-flag');
  const supportedLanguages = ['en', 'de', 'fr', 'it'];

  function updateLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en][data-de][data-fr][data-it]').forEach(el => {
      const translation = el.getAttribute(`data-${lang}`);
      if (translation) {
        el.setAttribute('data-current', translation);
        if ('placeholder' in el && el.placeholder !== undefined) {
          el.placeholder = translation;
        } else if (el.textContent.trim() !== "") {
          el.textContent = translation;
        }
      }
    });
    langFlags.forEach(flag => {
      flag.classList.toggle('active', flag.dataset.lang === lang);
    });
  }

  if (langFlags.length) {
    updateLanguage(currentLang);
    langFlags.forEach(flag => {
      flag.addEventListener('click', () => {
        const lang = flag.dataset.lang;
        if (supportedLanguages.includes(lang)) {
          updateLanguage(lang);
        }
      });
    });
  }

  if (form && nameInput && emailInput && phoneInput && messageInput && nameError && emailError && phoneError && messageError && formSuccess) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;
      formSuccess.classList.add("d-none");

      nameError.textContent = "";
      emailError.textContent = "";
      phoneError.textContent = "";
      messageError.textContent = "";

      if (nameInput.value.trim() === "") {
        nameError.textContent = nameError.getAttribute(`data-${currentLang}`);
        isValid = false;
      }

      if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = emailError.getAttribute(`data-${currentLang}`);
        isValid = false;
      }

      if (!phoneRegex.test(phoneInput.value.trim())) {
        phoneError.textContent = phoneError.getAttribute(`data-${currentLang}`);
        isValid = false;
      }

      if (messageInput.value.trim().length < 5) {
        messageError.textContent = messageError.getAttribute(`data-${currentLang}`);
        isValid = false;
      }

      if (isValid) {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const message = messageInput.value.trim();

        const whatsappNumber = "96898083317";
        const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        const formData = { name, email, phone, message };
        localStorage.setItem("contactFormData", JSON.stringify(formData));

        formSuccess.classList.remove("d-none");
        setTimeout(() => {
          formSuccess.classList.add("d-none");
        }, 10000);

        form.reset();
        window.open(whatsappURL, "_blank");
      }
    });
  }

  const destinationsSwiper = new Swiper(".destinationsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    navigation: {
      nextEl: ".destinations-next",
      prevEl: ".destinations-prev",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
    },
  });

  if (document.querySelector(".mySwiper")) {
    const swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        576: { slidesPerView: 2, spaceBetween: 30 },
        992: { slidesPerView: 3, spaceBetween: 50 }
      }
    });
  }

  AOS.init({
    offset: 120,
    duration: 1000,
    easing: "ease-in-out"
  });
});