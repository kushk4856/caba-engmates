
document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 300,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    loop: true, // Enable continuous loop
    loopedSlides: 3, // Adjust this to match how many slides should be duplicated
    loopAdditionalSlides: 3, // Ensures proper duplication for smooth looping
  });

  // Pause autoplay on hover
  var swiperContainer = document.querySelector('.mySwiper');
  swiperContainer.addEventListener('mouseenter', function () {
    swiper.autoplay.stop(); // Stop autoplay when hovering
  });
  swiperContainer.addEventListener('mouseleave', function () {
    swiper.autoplay.start(); // Resume autoplay when hover ends
  });
});




document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownLinks = document.querySelectorAll('.nav-link');
  const toggleImg = document.getElementById('toggle_img')
  console.log(toggleImg)

  // Toggle menu
  menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      if(navMenu.classList.contains('active')){
        toggleImg.src = './images/close.svg'
      }else{
        toggleImg.src = './images/more.svg'
      }

  });



  // Handle dropdowns
  dropdownLinks.forEach(link => {
      const chevron = link.querySelector('.chevron');
      if (chevron) {
          link.addEventListener('click', function(e) {
              e.preventDefault();
              const dropdownContent = this.nextElementSibling;
              const isOpen = dropdownContent.classList.contains('active');
              
              // Close all dropdowns
              document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                  dropdown.classList.remove('active');
                  const chevron = dropdown.previousElementSibling.querySelector('.chevron');
                  if (chevron) chevron.classList.remove('up');
              });

              // Toggle clicked dropdown
              if (!isOpen) {
                  dropdownContent.classList.add('active');
                  chevron.classList.add('up');
              }
          });
      }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
          navMenu.classList.remove('active');
      }
  });
});

// ----------navbar end ---------

const slider = document.getElementById("slider");
const mainImage = document.querySelector(".fade-image");
const cardWidth = slider.children[0].offsetWidth;
let isAnimating = false;

// Function to update main image with fade effect
function updateMainImage(newSrc) {
  mainImage.classList.add("fade-out");
  setTimeout(() => {
    mainImage.src = newSrc;
    mainImage.classList.remove("fade-out");
  }, 300);
}

// Function to update active card
function updateActiveCard() {
  const cards = document.querySelectorAll(".card_small");
  cards.forEach((card) => card.classList.remove("active"));
  cards[2].classList.add("active"); // Middle card is always active
}

// Handle card click with fade effect
function handleCardClick(e) {
  if (isAnimating) return;

  const clickedCard = e.currentTarget;
  const cards = Array.from(slider.children);
  const clickedIndex = cards.indexOf(clickedCard);
  const middleIndex = Math.floor(cards.length / 2);

  // Update main image
  const newImageSrc = clickedCard.querySelector("img").src;
  updateMainImage(newImageSrc);

  if (clickedIndex === middleIndex) return;

  isAnimating = true;

  if (clickedIndex > middleIndex) {
    moveSliderForward();
  } else if (clickedIndex < middleIndex) {
    moveSliderBackward();
  }
}

// Function to move slider forward
function moveSliderForward() {
  slider.style.transition = "transform 0.5s ease";
  slider.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";
    slider.appendChild(slider.children[0]);
    isAnimating = false;
    updateActiveCard();
  }, 500);
}

// Function to move slider backward
function moveSliderBackward() {
  slider.style.transition = "transform 0.5s ease";
  slider.style.transform = `translateX(${cardWidth}px)`;

  setTimeout(() => {
    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";
    slider.prepend(slider.children[slider.children.length - 1]);
    isAnimating = false;
    updateActiveCard();
  }, 500);
}

// Add click event listeners to all cards
function addCardListeners() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", handleCardClick);
  });
}

// Handle navigation buttons
document.querySelector(".prev").addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;

  // Update main image to the previous image
  const prevImage = slider.children[1].querySelector("img").src;
  updateMainImage(prevImage);
  moveSliderBackward();
});

document.querySelector(".next").addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;

  // Update main image to the next image
  const nextImage = slider.children[3].querySelector("img").src;
  updateMainImage(nextImage);
  moveSliderForward();
});

// Initialize card listeners
addCardListeners();
updateActiveCard(); // Set initial active card




// -------job slider -------



const track = document.getElementById("carousel-track");
// let isAnimating = false;
let autoSlideInterval;
let pauseAutoSlide = false;

// Function to calculate card width based on viewport
function getCardWidth() {
    const viewportWidth = window.innerWidth ;
    const track = document.getElementById("carousel-track");
    if (!track.children.length) return 0;
    
    return track.children[0].offsetWidth + 
           (viewportWidth > 992 ? 38 : // Desktop gap
            viewportWidth > 576 ? 30 : // Tablet gap
            20); // Mobile gap
}

function moveTrackForward() {
    if (isAnimating) return;
    isAnimating = true;
    const cardWidth = getCardWidth();
    
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${cardWidth}px)`;
    
    setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        track.appendChild(track.children[0]);
        isAnimating = false;
    }, 500);
}

function moveTrackBackward() {
    if (isAnimating) return;
    isAnimating = true;
    const cardWidth = getCardWidth();
    
    track.style.transition = "none";
    track.insertBefore(
        track.children[track.children.length - 1],
        track.children[0]
    );
    track.style.transform = `translateX(-${cardWidth}px)`;
    
    setTimeout(() => {
        track.style.transition = "transform 0.5s ease";
        track.style.transform = "translateX(0)";
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }, 0);
}

// Auto slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (!pauseAutoSlide && !isAnimating) {
            moveTrackForward();
        }
    }, 3000);
}

function resetAutoSlideTimer() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Event Listeners
document.querySelector(".carousel-prev").addEventListener("click", () => {
    resetAutoSlideTimer();
    moveTrackBackward();
});

document.querySelector(".carousel-next").addEventListener("click", () => {
    resetAutoSlideTimer();
    moveTrackForward();
});

track.addEventListener("mouseenter", () => (pauseAutoSlide = true));
track.addEventListener("mouseleave", () => (pauseAutoSlide = false));

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
    }, 250);
});

// Start the carousel
startAutoSlide();