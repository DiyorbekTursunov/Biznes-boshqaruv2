document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = form.querySelector('button[type="submit"]');
  const phoneInput = document.getElementById("phoneInput");
  const errorMessage = document.createElement("div");
  errorMessage.style.color = "red";
  errorMessage.style.fontSize = "14px";
  errorMessage.style.marginTop = "5px";
  phoneInput.parentNode.appendChild(errorMessage);

  console.log(phoneInput);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("nameInput");
    const phoneValue = phoneInput.value.replace(/\D/g, "");
    const businessInput = document.getElementById("businessInput");

    // Validate phone number (must be exactly 12 digits including +998)
    if (phoneValue.length !== 12 || !phoneValue.startsWith("998")) {
      errorMessage.textContent =
        "Iltimos, telefon raqamini to‘g‘ri formatda kiriting (+998 XX-XXX-XX-XX)";
      phoneInput.focus();
      return;
    }

    errorMessage.textContent = "";
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Yuborilmoqda...";

    // LocalStorage uchun obyekt
    const formDataObj = {
      Ism: nameInput.value,
      BiznesTuri: businessInput.value,
      TelefonRaqam: phoneInput.value,
    };

    // LocalStorage ga saqlash
    localStorage.setItem("formData", JSON.stringify(formDataObj));

    // thankYou sahifasiga o‘tish
    window.location.href = "thankYou.html";
  });

  // Telefon raqam formatlash
  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.startsWith("998")) {
      value = value.substring(3);
    }

    if (value.length > 0) {
      if (value.length <= 2) {
        value = `+998 (${value}`;
      } else if (value.length <= 5) {
        value = `+998 (${value.substring(0, 2)})-${value.substring(2)}`;
      } else if (value.length <= 7) {
        value = `+998 (${value.substring(0, 2)})-${value.substring(
          2,
          5
        )}-${value.substring(5)}`;
      } else {
        value = `+998 (${value.substring(0, 2)})-${value.substring(
          2,
          5
        )}-${value.substring(5, 7)}-${value.substring(7, 9)}`;
      }
    }

    e.target.value = value;
    errorMessage.textContent = "";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const faqBoxes = document.querySelectorAll(".program__mob-box");

  faqBoxes.forEach((box) => {
    const button = box.querySelector(".program__mobOpen");

    button.addEventListener("click", function () {
      faqBoxes.forEach((otherBox) => {
        if (otherBox !== box && otherBox.classList.contains("active")) {
          otherBox.classList.remove("active");
        }
      });

      box.classList.toggle("active");
    });
  });

  faqBoxes.forEach((box) => {
    const items = box.querySelectorAll(".program__mobItem");
    const button = box.querySelector(".program__mobOpen");

    button.addEventListener("click", function () {
      if (box.classList.contains("active")) {
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.transitionDelay = `${index * 0.1}s`;
          }, 0);
        });
      } else {
        items.forEach((item) => {
          item.style.transitionDelay = "0s";
        });
      }
    });
  });

  faqBoxes.forEach((box) => {
    const button = box.querySelector(".program__mobOpen");

    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        button.click();
      }
    });
  });
});

document.querySelectorAll(".hero__button").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default to handle manually
    const formSection = document.querySelector("#form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error('Section with id="form" not found');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const logosContainer = document.querySelector(".partners__logos");
  const logoTrack = document.querySelector(".logo-track");

  // Ensure at least two tracks for seamless looping
  if (logoTrack && logosContainer) {
    const clone = logoTrack.cloneNode(true);
    logosContainer.appendChild(clone);
  }
});
