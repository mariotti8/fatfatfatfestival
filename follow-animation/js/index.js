console.clear();

const DAMPING_COEFF = 0.4;
const SPRING_CONSTANT = 0.075;
const container = document.getElementById('container');
const wrapper = document.getElementById('wrapper');

const globalState = {
  mouseX: wrapper.offsetLeft + wrapper.offsetWidth / 2,
  mouseY: wrapper.offsetTop + wrapper.offsetHeight / 2,
  updates: []
};

window.addEventListener("resize", event => {
  globalState.mouseX = wrapper.offsetLeft + wrapper.offsetWidth / 2;
  globalState.mouseY = wrapper.offsetTop + wrapper.offsetHeight / 2;
});

container.addEventListener("mousemove", event => {
  globalState.mouseX = event.pageX;
  globalState.mouseY = event.pageY;
});

container.addEventListener("touchstart", event => {
  globalState.mouseX = event.pageX;
  globalState.mouseY = event.pageY;
});

container.addEventListener("mouseleave", () => {
  globalState.mouseX = wrapper.offsetLeft + wrapper.offsetWidth / 2;
  globalState.mouseY = wrapper.offsetTop + wrapper.offsetHeight / 2;
});

const createSpring = ({ getTargetX, getTargetY, draw }) => {
  const state = {
    posX: wrapper.offsetLeft + wrapper.offsetWidth / 2,
    posY: wrapper.offsetTop + wrapper.offsetHeight / 2,
    velX: 0,
    velY: 0
  };

  return {
    getX: () => state.posX,
    getY: () => state.posY,

    update: () => {
      state.posX += state.velX;
      state.posY += state.velY;

      const potentialX = state.posX - getTargetX();
      const potentialY = state.posY - getTargetY();

      state.velX += calcVelocity(potentialX, state.velX);
      state.velY += calcVelocity(potentialY, state.velY);

      draw(state);
    }
  };
};

const calcVelocity = (potential, currentVelocity) => {
  return potential * -1 * SPRING_CONSTANT - DAMPING_COEFF * currentVelocity;
};

const translateString = (x, y) => {
  return `translate3d(${x}px, ${y}px, 0)`;
};

const composeSprings = ({ seedX, seedY, registerSpring, drawFunctions }) => {
  return drawFunctions.reduce((springs, drawFn) => {
    const prevSpring = springs[springs.length - 1];
    const newSpring = createSpring({
      getTargetX: prevSpring ? prevSpring.getX : seedX,
      getTargetY: prevSpring ? prevSpring.getY : seedY,
      draw: drawFn
    });
    registerSpring(newSpring);
    return [...springs, newSpring];
  }, []);
};

const drawFns = [
  ...container.querySelectorAll('.blobby-bit')
].map(el => {
  const halfX = el.getBoundingClientRect().width / 2;
  const halfY = el.getBoundingClientRect().height / 2;
  return state => {
    el.style.transform = translateString(state.posX - halfX, state.posY - halfY)
  };
});

composeSprings({
  seedX: () => globalState.mouseX,
  seedY: () => globalState.mouseY,
  registerSpring: spring => globalState.updates.push(spring.update),
  drawFunctions: drawFns,
});

(function loop() {
  globalState.updates.forEach(fn => fn());
  requestAnimationFrame(loop);
})();