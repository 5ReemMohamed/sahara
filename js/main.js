window.onload = function () {
  window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const navbar = document.querySelector(".navbar");
  const navbarCollapse = document.getElementById("navbarSupportedContent");

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{8,15}$/;

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Navbar collapse color toggle
  if (navbarCollapse) {
    navbarCollapse.addEventListener("show.bs.collapse", function () {
      navbar.classList.add("show-bg");
    });

    navbarCollapse.addEventListener("hide.bs.collapse", function () {
      navbar.classList.remove("show-bg");
    });
  }

  // ✅ Only run this block if all form elements exist
  if (
    form &&
    nameInput &&
    emailInput &&
    phoneInput &&
    messageInput &&
    nameError &&
    emailError &&
    phoneError &&
    messageError &&
    formSuccess
  ) {
    // Real-time validation
    nameInput.addEventListener("input", () => {
      if (nameInput.value.trim() !== "") nameError.innerHTML = "";
    });

    emailInput.addEventListener("input", () => {
      if (emailRegex.test(emailInput.value.trim())) emailError.innerHTML = "";
    });

    phoneInput.addEventListener("input", () => {
      if (phoneRegex.test(phoneInput.value.trim())) phoneError.innerHTML = "";
    });

    messageInput.addEventListener("input", () => {
      if (messageInput.value.trim().length >= 5) messageError.innerHTML = "";
    });

    // Form submit
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;

      formSuccess.classList.add("d-none");
      nameError.innerHTML = "";
      emailError.innerHTML = "";
      phoneError.innerHTML = "";
      messageError.innerHTML = "";

      if (nameInput.value.trim() === "") {
        nameError.innerHTML = "Name is required";
        isValid = false;
      }

      if (!emailRegex.test(emailInput.value.trim())) {
        emailError.innerHTML = "Enter a valid email address";
        isValid = false;
      }

      if (!phoneRegex.test(phoneInput.value.trim())) {
        phoneError.innerHTML = "Enter a valid phone number (digits only)";
        isValid = false;
      }

      if (messageInput.value.trim().length < 5) {
        messageError.innerHTML = "Message must be at least 5 characters";
        isValid = false;
      }

      if (isValid) {
        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim(),
          message: messageInput.value.trim()
        };

        localStorage.setItem("contactFormData", JSON.stringify(formData));

        formSuccess.classList.remove("d-none");

        setTimeout(() => {
          formSuccess.classList.add("d-none");
        }, 10000);

        form.reset();
      }
    });
  }

  // Swiper
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

  // AOS
  AOS.init({
    offset: 120,
    duration: 1000,
    easing: "ease-in-out"
  });
});
