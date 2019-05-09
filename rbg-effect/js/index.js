let speed = 300;
let amount = 20;

let scroll = 0;
let smooth = 0;
let diff = 0;
let timeout;

document.addEventListener('scroll', event => {
  scroll = $(window).scrollTop();
  clearTimeout(timeout);
  document.querySelector('.r').classList.add('filter');
  timeout = setTimeout(() => {
    document.querySelector('.r').classList.remove('filter');
  }, 500);
});

let oldTime = null;
let delta = 0;

const animate = t => {
  if (oldTime) {
    delta = t - oldTime;
  }
  smooth += (scroll - smooth) * delta / speed;
  diff = scroll - smooth;

  let translateCenter = diff * -2 / amount;
  let translateRed = diff * 2 / amount;

  document.querySelector('.center').style.transform = 'translateY(' + translateCenter + 'px)';
  document.querySelector('.r').style.transform = 'translateY(' + translateRed + 'px)';

  oldTime = t;
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);