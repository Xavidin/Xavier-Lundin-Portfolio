// === Full Carousel Setup for Multiple Sliders ===
document.querySelectorAll('.slider').forEach((slider, groupIndex) => {
  const slides = slider.querySelectorAll('.slide');
  const thumbnails = slider.parentElement.querySelectorAll('.thumbnails .thumbnail-item');
  const nextBtn = slider.querySelector('#next');
  const prevBtn = slider.querySelector('#prev');

  let currentIndex = 0;
  let autoSlide;

  // === Show current slide and highlight thumbnail ===
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }

  // === Slide navigation ===
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  // === Auto Slide Logic ===
  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000); // Change 5000 to desired delay (ms)
  }

  // === Event Listeners ===
  nextBtn?.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
      resetAutoSlide();
    });
  });

  // === Pause autoplay on hover ===
  slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
  slider.addEventListener('mouseleave', () => resetAutoSlide());

  // === Touch Swipe Support ===
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
      resetAutoSlide();
    } else if (touchEndX > touchStartX + 50) {
      prevSlide();
      resetAutoSlide();
    }
  }

  // === Initialize Carousel ===
  showSlide(currentIndex);
  autoSlide = setInterval(nextSlide, 5000);
});


// === Dark Mode Toggle (Persistent) ===
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = localStorage.getItem('theme') === 'dark';

if (prefersDark) {
  document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// === Carousel for .split-slider ===
document.querySelectorAll('.split-slider').forEach((slider) => {
  const slides = slider.querySelectorAll('.slide');
  const dots = slider.querySelectorAll('.dot');

  let currentIndex = 0;
  let autoSlide;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  // Dot click listeners
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    } else if (touchEndX > touchStartX + 50) {
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
      stopAutoSlide();
      startAutoSlide();
    }
  });

  // Init
  showSlide(currentIndex);
  startAutoSlide();
});


  const slides = document.querySelectorAll('.camera-slide');
  const prevBtn = document.querySelector('.camera-btn.prev');
  const nextBtn = document.querySelector('.camera-btn.next');

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);


  // Auto-slide every 5 seconds
const svg = document.getElementById("floating-graphs");

function createGraphElement(type, x, y, delay) {
  let shape;
  if (type === "bar") {
    shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    shape.setAttribute("x", x);
    shape.setAttribute("y", y);
    shape.setAttribute("width", 4 + Math.random() * 2);
    shape.setAttribute("height", 10 + Math.random() * 30);
    shape.setAttribute("fill", "#00bcd4");
  } else if (type === "pie") {
    shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    shape.setAttribute("cx", x);
    shape.setAttribute("cy", y);
    shape.setAttribute("r", 4 + Math.random() * 4);
    shape.setAttribute("fill", "#ffa726");
  }
  shape.classList.add("graph-shape");
  shape.style.animationDelay = `${delay}s`;
  svg.appendChild(shape);
}

for (let i = 0; i < 20; i++) {
  const type = Math.random() > 0.5 ? "bar" : "pie";
  const x = Math.random() * 100;
  const y = 100 + Math.random() * 100; // starts below the screen
  const delay = Math.random() * 20;
  createGraphElement(type, x, y, delay);
}

