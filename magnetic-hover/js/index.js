
const cursorElementsList = [

  { name: 'text3', speed: 0.6 },
  { name: 'text4', speed: 0.7 },
  { name: 'text5', speed: 0.8 },
  { name: 'text6', speed: 0.9 },
  { name: 'text7', speed: 1.0 },
  { name: 'text8', speed: 1.1 },
  { name: 'text9', speed: 1.2 },
  { name: 'text10', speed: 1.3 },
  { name: 'text11', speed: 1.4 },
  { name: 'text12', speed: 1.5 },
  { name: 'text13', speed: 1.6 },
  { name: 'text14', speed: 1.7 }
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

