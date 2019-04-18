let speed = 300;
let amount = 30;

let scroll = 0;
let smooth = 0;
let diff = 0;

document.addEventListener('scroll', event => {
  scroll = $(window).scrollTop();
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
  let translateRed = diff * 5 / amount;
  let translateGreen = diff * 4 / amount;
  let translateBlue = diff * 3 / amount;

  document.querySelector('.center').style.transform = 'translateY(' + translateCenter + 'px)';
  document.querySelector('.r').style.transform = 'translateY(' + translateRed + 'px)';
  document.querySelector('.g').style.transform = 'translateY(' + translateGreen + 'px)';
  document.querySelector('.b').style.transform = 'translateY(' + translateBlue + 'px)';

  oldTime = t;
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);