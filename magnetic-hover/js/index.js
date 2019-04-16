
const cursorElementsList = [
  { name: 'text1', speed: 0.3 }, 
  { name: 'text2', speed: 0.4 }
];
const container = document.getElementById("container");

const cursorElements = cursorElementsList.map(element => {
  return {
    name: document.querySelector(`.${element.name}`), 
    speed: element.speed
  };
})

cursorElements.forEach(element => {
  TweenMax.set(element.name, { 
    xPercent: -50, 
    yPercent: -50 
  });
});

container.addEventListener("pointerenter", e => {
  cursorElements.forEach(element => {
    TweenMax.to(element.name, element.speed, 
      { top: 0, 
        left: 0 
      });
  });
  positionCircle(e);
});

container.addEventListener("pointerleave", e => {
  console.log("leave");
  cursorElements.forEach(element => {
    TweenMax.to(element.name, 1.5, {
      top: '50%',
      left: '50%',
      transition: 'none',
      scale: 1,
      x: 0,
      y: 0,
    });
  })
});

container.addEventListener("pointermove", e => {
  positionCircle(e);
});

function positionCircle(e) {
  var relX = e.pageX - container.offsetLeft;
  var relY = e.pageY - container.offsetTop;
  cursorElements.forEach(element => {
    TweenMax.to(element.name, element.speed, { 
      x: relX, 
      y: relY 
    });
  });
}

