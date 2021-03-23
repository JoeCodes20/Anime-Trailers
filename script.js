// slider
const slides = document.querySelectorAll(".slide");
const slideBtn = document.querySelectorAll(".slideBtn");
let currentSlide = 1;

const manualNav = function (manual) {
  slides.forEach((slide) => {
    slide.classList.remove("active");

    slideBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
  });
  slides[manual].classList.add("active");
  slideBtn[manual].classList.add("active");
};

slideBtn.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});

function repeat(i) {
  let active = document.getElementsByClassName("active");

  const repeater = () => {
    setTimeout(function () {
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove("active");
      });
      slides[i].classList.add("active");
      slideBtn[i].classList.add("active");
      i++;

      if (slides.length == i) {
        i = 0;
      }
      if (i >= slides.length) {
        return;
      }
      repeater();
    }, 5000);
  };
  repeater();
}
repeat(currentSlide);

const navList = document.querySelector(".nav-list");
const list = document.querySelector(".list-section");

navList.addEventListener("click", (e) => {
  e.preventDefault();
  list.scrollIntoView({
    behavior: "smooth",
  });
});
