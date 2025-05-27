let darkmode = localStorage.getItem('darkmode')
let currentSlide = 0
const hamburger = document.getElementById("hamburger")
const mobileMenu = document.getElementById("mobileMenu")
const themeSwitch = document.getElementById('theme-switch')
const slider = document.getElementById("slider")
const prevBtn = document.getElementById("prevSlide")
const nextBtn = document.getElementById("nextSlide")
const slides = slider.querySelectorAll("img")

// Hamburger toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  mobileMenu.classList.toggle("active")
})
// End Hamburger toggle

// Tema Mode
themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()
// End Tema Mode

// Slider Functions
function showSlide(index) {
  slider.style.transform = `translateX(-${index * 100}%)`
  updateDots()
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}

function prevSlideFunc() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide)
}

nextBtn.addEventListener("click", nextSlide)
prevBtn.addEventListener("click", prevSlideFunc)

// Auto Slide
setInterval(nextSlide, 5000)

const dotsContainer = document.getElementById("sliderDots")

// Buat dot sesuai jumlah slide
slides.forEach((_, index) => {
  const dot = document.createElement("div")
  dot.classList.add("slider-dot")
  if (index === 0) dot.classList.add("active")
  dot.addEventListener("click", () => {
    currentSlide = index
    showSlide(currentSlide)
    updateDots()
  })
  dotsContainer.appendChild(dot)
})

function updateDots() {
  const dots = document.querySelectorAll(".slider-dot")
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide)
  })
}
// End Slider Functions