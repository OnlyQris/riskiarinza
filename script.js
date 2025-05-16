const themeToggle = document.getElementById("themeToggle");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const slides = slider.querySelectorAll("img");
let currentSlide = 0;

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  // Tambahkan animasi rotasi
  themeToggle.classList.add("animate");

  // Ganti ikon berdasarkan tema
  if (document.body.classList.contains("light")) {
    themeToggle.innerHTML = "☀️"; // Sun icon
  } else {
    themeToggle.innerHTML = "🌙"; // Moon icon
  }

  // Hapus animasi setelah selesai
  setTimeout(() => {
    themeToggle.classList.remove("animate");
  }, 400);
});

// Set theme on page load
function updateThemeIcon() {
  themeToggle.innerHTML = document.body.classList.contains("light") ? "☀️" : "🌙";
}

localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  }
  updateThemeIcon();
});

// Hamburger toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Slider Functions
function showSlide(index) {
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlideFunc() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlideFunc);

// Auto Slide
setInterval(nextSlide, 5000);

const dotsContainer = document.getElementById("sliderDots");

// Buat dot sesuai jumlah slide
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("slider-dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
    updateDots();
  });
  dotsContainer.appendChild(dot);
});

function updateDots() {
  const dots = document.querySelectorAll(".slider-dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}
