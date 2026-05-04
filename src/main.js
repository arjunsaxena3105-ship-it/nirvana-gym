import './style.css'

// CURSOR
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 6 + 'px';
  cursor.style.top = mouseY - 6 + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX - 18 + 'px';
  follower.style.top = followerY - 18 + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .service-card, .gallery-item, .trainer-card, .pricing-card, .why-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    follower.style.transform = 'scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    follower.style.transform = 'scale(1)';
  });
});

// NAVBAR
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// MOBILE MENU
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  hamburger.querySelectorAll('span')[0].style.transform = menuOpen ? 'rotate(45deg) translate(5px,5px)' : '';
  hamburger.querySelectorAll('span')[1].style.opacity = menuOpen ? '0' : '1';
  hamburger.querySelectorAll('span')[2].style.transform = menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

window.closeMobileMenu = function() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
};

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.counter').forEach(startCounter);
      if (entry.target.classList.contains('counter')) startCounter(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => observer.observe(el));

// Also observe sections for counters
document.querySelectorAll('.counter').forEach(el => {
  const section = el.closest('section');
  if (section) {
    const secObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) startCounter(el); });
    }, { threshold: 0.3 });
    secObserver.observe(section);
  }
});

// COUNTER ANIMATION
function startCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = true;
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

// BMI CALCULATOR
function calculateBMI() {
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);

  if (!height || !weight || height < 100 || weight < 30) {
    alert('Please enter valid height and weight values.');
    return;
  }

  const heightM = height / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);

  let category, advice, color;
  if (bmi < 18.5) {
    category = 'Underweight';
    advice = 'You need to gain weight. A personalized nutrition and strength plan can help you build a healthy physique.';
    color = '#6bb5ff';
  } else if (bmi < 25) {
    category = 'Healthy Weight';
    advice = "You're in the healthy range! Join Nirvana to maintain and elevate your fitness to the next level.";
    color = '#AAFF00';
  } else if (bmi < 30) {
    category = 'Overweight';
    advice = 'A structured cardio and diet program can bring you back to your ideal range. Our trainers are ready!';
    color = '#FFB347';
  } else {
    category = 'Obese';
    advice = 'No judgment — just action. Our weight loss specialists have helped hundreds achieve incredible transformations.';
    color = '#FF6B6B';
  }

  const resultEl = document.getElementById('bmiResult');
  document.getElementById('bmiValue').textContent = bmi;
  document.getElementById('bmiValue').style.color = color;
  document.getElementById('bmiCategory').textContent = category;
  document.getElementById('bmiAdvice').textContent = advice;
  resultEl.classList.add('show');
}

document.getElementById('btnBmi').addEventListener('click', calculateBMI);

// FORM SUBMISSION
function submitForm() {
  const name = document.getElementById('formName').value;
  const phone = document.getElementById('formPhone').value;

  if (!name || !phone) {
    alert('Please fill in your name and phone number.');
    return;
  }

  const toast = document.getElementById('toast');
  toast.textContent = "We'll contact you soon, " + name.split(' ')[0] + '!';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);

  document.getElementById('formName').value = '';
  document.getElementById('formPhone').value = '';
  document.getElementById('formEmail').value = '';
  document.getElementById('formMessage').value = '';
}

document.getElementById('btnSubmit').addEventListener('click', submitForm);

// PARALLAX
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.2;
  }
});
