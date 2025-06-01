document.addEventListener('DOMContentLoaded', function() {
  

  
  // Проверка и инициализация particles.js
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#4CAF50"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#4CAF50",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });
  }

  // Табы
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }

  // Аккордеон FAQ
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  
  if (accordionBtns.length) {
    accordionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const content = btn.nextElementSibling;
        
        if (btn.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = '0';
        }
      });
    });
  }

  // Слайдер галереи
  const sliderInit = () => {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!track || !slides.length || !prevBtn || !nextBtn) return;
    
    // Клонируем первый и последний слайды
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    
    // Добавляем клоны в начало и конец
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);
    
    const totalSlides = slides.length;
    let currentSlide = 1; // Начинаем с первого настоящего слайда
    let autoSlideInterval;
    let isTransitioning = false;

    // Обновление позиции слайдера
    const updateSliderPosition = () => {
      track.style.transition = 'transform 0.5s ease';
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    // Перемещение слайдов
    const moveSlide = (direction) => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      currentSlide += direction;
      updateSliderPosition();
      updateIndicators();
      resetAutoSlide();

      // Проверяем необходимость перехода
      if (currentSlide === 0) {
        setTimeout(() => {
          track.style.transition = 'none';
          currentSlide = totalSlides;
          track.style.transform = `translateX(-${currentSlide * 100}%)`;
          setTimeout(() => {
            track.style.transition = 'transform 0.5s ease';
            isTransitioning = false;
          }, 50);
        }, 500);
      } else if (currentSlide === totalSlides + 1) {
        setTimeout(() => {
          track.style.transition = 'none';
          currentSlide = 1;
          track.style.transform = `translateX(-${currentSlide * 100}%)`;
          setTimeout(() => {
            track.style.transition = 'transform 0.5s ease';
            isTransitioning = false;
          }, 50);
        }, 500);
      } else {
        setTimeout(() => {
          isTransitioning = false;
        }, 500);
      }
    };

    // Создаем индикаторы слайдов
    const createIndicators = () => {
      const indicatorsContainer = document.createElement('div');
      indicatorsContainer.className = 'slider-indicators';
      
      for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('span');
        indicator.className = 'indicator';
        if (i === currentSlide - 1) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
          if (!isTransitioning) {
            goToSlide(i + 1);
          }
        });
        indicatorsContainer.appendChild(indicator);
      }
      
      track.parentElement.appendChild(indicatorsContainer);
    };

    // Обновление индикаторов
    const updateIndicators = () => {
      const indicators = document.querySelectorAll('.indicator');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === (currentSlide - 1) % totalSlides);
      });
    };

    // Переход к конкретному слайду
    const goToSlide = (slideIndex) => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      currentSlide = slideIndex;
      updateSliderPosition();
      updateIndicators();
      resetAutoSlide();

      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    };

    // Автопрокрутка
    const startAutoSlide = () => {
      // Очищаем существующий интервал перед созданием нового
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
      autoSlideInterval = setInterval(() => {
        moveSlide(1);
      }, 5000);
    };

    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    };

    const resetAutoSlide = () => {
      stopAutoSlide();
      startAutoSlide();
    };

    // Обработчики событий
    const setupEventListeners = () => {
      // Кнопки навигации
      prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        moveSlide(-1);
        startAutoSlide();
      });
      nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        moveSlide(1);
        startAutoSlide();
      });
      
      // Свайп на мобильных
      track.addEventListener('touchstart', touchStart);
      track.addEventListener('touchmove', touchMove);
      track.addEventListener('touchend', touchEnd);
      
      // Для десктопа
      track.addEventListener('mousedown', dragStart);
      track.addEventListener('mousemove', dragMove);
      track.addEventListener('mouseup', dragEnd);
      track.addEventListener('mouseleave', dragEnd);
      
      // Пауза при наведении
      track.addEventListener('mouseenter', stopAutoSlide);
      track.addEventListener('mouseleave', startAutoSlide);
      
      // Клавиатура
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') moveSlide(-1);
        if (e.key === 'ArrowRight') moveSlide(1);
      });
    };

    // Функции для свайпа/перетаскивания
    let isDragging = false;
    let startPosX = 0;

    const getPositionX = (event) => {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    };

    const touchStart = (e) => {
      startPosX = getPositionX(e);
      isDragging = true;
      stopAutoSlide();
    };

    const touchMove = (e) => {
      if (!isDragging) return;
      const currentPosition = getPositionX(e);
      const diff = currentPosition - startPosX;
      
      track.style.transform = `translateX(calc(-${currentSlide * 100}% + ${diff}px))`;
    };

    const touchEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      
      const endPosX = e.changedTouches[0].clientX;
      const diff = endPosX - startPosX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          moveSlide(-1);
        } else {
          moveSlide(1);
        }
      } else {
        updateSliderPosition();
      }
      
      startAutoSlide();
    };

    // Аналогичные функции для мыши
    const dragStart = (e) => {
      e.preventDefault();
      startPosX = e.pageX;
      isDragging = true;
      stopAutoSlide();
      track.style.cursor = 'grabbing';
    };

    const dragMove = (e) => {
      if (!isDragging) return;
      const currentPosition = e.pageX;
      const diff = currentPosition - startPosX;
      track.style.transform = `translateX(calc(-${currentSlide * 100}% + ${diff}px))`;
    };

    const dragEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      track.style.cursor = 'grab';
      
      const endPosX = e.pageX;
      const diff = endPosX - startPosX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          moveSlide(-1);
        } else {
          moveSlide(1);
        }
      } else {
        updateSliderPosition();
      }
      
      startAutoSlide();
    };

    // Инициализация слайдера
    createIndicators();
    updateSliderPosition();
    startAutoSlide();
    setupEventListeners();
  };

  // Инициализация слайдера
  sliderInit();

  // Параллакс эффект для героя
  const heroImage = document.querySelector('.hero-image img');
  
  if (heroImage) {
    window.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth - e.pageX) / 50;
      const y = (window.innerHeight - e.pageY) / 50;
      heroImage.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // Инициализация tilt.js для карточек
  if (typeof VanillaTilt !== 'undefined') {
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => {
      VanillaTilt.init(card, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
      });
    });
  }

  // Плавная прокрутка для якорей
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Мобильное меню
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Сохранение масштаба (если нужно)
  const savedZoom = localStorage.getItem('pageZoom');
  if (savedZoom) {
    document.body.style.zoom = savedZoom;
    document.body.style.transform = `scale(${savedZoom})`;
    document.body.style.transformOrigin = 'top left';
  }
  
  window.addEventListener('resize', function() {
    const currentZoom = document.body.style.zoom || '1';
    localStorage.setItem('pageZoom', currentZoom);
  });
});