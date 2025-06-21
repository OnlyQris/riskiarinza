// Tema Mode
let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

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

// Hamberger Animtion
const hamburger = document.getElementById("hamburger")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
})
// End Hamberger Animation

// Slider Image
let currentSlide = 0
const slider = document.getElementById("slider")
const prevBtn = document.getElementById("prevSlide")
const nextBtn = document.getElementById("nextSlide")
const slides = slider.querySelectorAll("img")

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

// Swep pakai jari
let startX = 0
let isDragging = false

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX
  isDragging = true
})

slider.addEventListener("touchmove", (e) => {
  if (!isDragging) return
  const currentX = e.touches[0].clientX
  const diff = startX - currentX

  if (Math.abs(diff) > 50) {
    if (diff > 0) nextSlide()      // geser ke kiri
    else prevSlideFunc()           // geser ke kanan
    isDragging = false
  }
})

slider.addEventListener("touchend", () => {
  isDragging = false
})

// Mouse drag (opsional untuk desktop)
slider.addEventListener("mousedown", (e) => {
  startX = e.clientX
  isDragging = true
})

slider.addEventListener("mousemove", (e) => {
  if (!isDragging) return
  const currentX = e.clientX
  const diff = startX - currentX

  if (Math.abs(diff) > 50) {
    if (diff > 0) nextSlide()
    else prevSlideFunc()
    isDragging = false
  }
})

slider.addEventListener("mouseup", () => {
  isDragging = false
})
slider.addEventListener("mouseleave", () => {
  isDragging = false
})
// End Slider Image