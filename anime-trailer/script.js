// use stickmode

// slider
const slides = document.querySelectorAll(".slide");
const slideBtn = document.querySelectorAll(".slideBtn");
let currentSlide = 1;

window.addEventListener("DOMContentLoaded", () => {
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
});
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

const navList = document.querySelector(".nav-list");
const listSection = document.querySelector(".list-section");
const animePlayer = document.querySelector(".player");
const darkBg = document.querySelector(".bg-overlay");

navList.addEventListener("click", (e) => {
  e.preventDefault();
  listSection.scrollIntoView({
    behavior: "smooth",
  });
});

// main-functionality
const watchBtn = document.querySelectorAll(".watch-btn");
const list = document.querySelector(".list-container");
const slideWatch = document.querySelectorAll(".main-btn");

[...slideWatch].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let button = e.target;
    if (button.classList.contains("anime-1")) {
      trailer("naruto");
    }
    if (button.classList.contains("anime-2")) {
      trailer("piece");
    }
    if (button.classList.contains("anime-3")) {
      trailer("hunter");
    }
    if (button.classList.contains("anime-4")) {
      trailer("attack");
    }
  });
});

[...watchBtn].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let button = e.target;
    if (button.classList.contains("bleach")) {
      trailer("bleach");
    }
    if (button.classList.contains("dragon")) {
      trailer("dragon");
    }
    if (button.classList.contains("attack")) {
      trailer("attack");
    }
    if (button.classList.contains("hunter")) {
      trailer("hunter");
    }
    if (button.classList.contains("jojo")) {
      trailer("jojo");
    }
    if (button.classList.contains("hero")) {
      trailer("hero");
    }
    if (button.classList.contains("naruto")) {
      trailer("naruto");
    }
    if (button.classList.contains("piece")) {
      trailer("piece");
    }
  });
});

function trailer(anime) {
  fetch("/trailers.json")
    .then((result) => result.json())
    .then((data) => data[anime])
    .then((animeInfo) => showPlayer(animeInfo))
    .catch((err) => console.log(err));
}

function showPlayer(info) {
  animePlayer.innerHTML = `
  <i class="fas fa-times"></i>
  <p class="anime-title">${info.title}</p>
  <p class="anime-episodes">Episodes: ${info.episodes}</p>
  <p class="anime-releaced"> Aired On: ${info.release}</p>
  <video 
      id="my-player"
      class="video-js vjs-big-play-centered"
      controls
      preload="auto"
      autoplay
      width="900"
      height="506"
      data-setup="{}"
      >
  <source loading="lazy" class="animeVideo" src=${info.trailer}>
          
  </video> 
  <p class="anime-info"> <span class="summary">Synopsis-</span> <br> ${info.animeInfo}</p>
  `;
  unHide();
}

animePlayer.addEventListener("click", (e) => {
  let button = e.target;
  if (button.classList.contains("fa-times")) {
    hide();
    let video = document.querySelector(".video-js");
    document.querySelector(".player").removeChild(video);
  }
});

document.addEventListener("keypress", (e) => {
  if (e.key === escape) {
    hide();
  }
});

function hide() {
  animePlayer.classList.add("hidden");
  darkBg.classList.add("hidden");
  // animePlayer.classList.remove("ratio");
}
function unHide() {
  animePlayer.classList.remove("hidden");
  darkBg.classList.remove("hidden");
  animePlayer.classList.add("ratio");
}
