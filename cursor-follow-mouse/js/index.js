

const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  console.log("move")
   document.getElementById('cursor').style.left = e.pageX - 0 + 'px';
   document.getElementById('cursor').style.top = e.pageY - 0 + 'px' ;
})