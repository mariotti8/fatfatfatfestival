// var hoverMouse = function($el) {
//   console.log($el);

//   Object.keys($el).forEach(key => {
//     var $self = $el[key];
//     var hover = false;


//     var offsetHoverMax = $self.getAttribute("offset-hover-max") + 8 || 2.7;
//     var offsetHoverMin = $self.getAttribute("offset-hover-min") + 8 || 2.5;

//     var attachEventsListener = function() {
//       document.addEventListener("mousemove", function(e) {
//         //
//         var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

//         // cursor
//         var cursor = {
//           x: e.clientX,
//           y: e.clientY
//         };

//         // size
//         // var width = $self.offsetWidth;
//         // var height = $self.offsetHeight;
//         var width = 80;
//         var height = 80;

//         // position
//         var offset = $self.getBoundingClientRect();
//         var elPos = {
//           x: offset.left + width,
//           y: offset.top + height
//         };


//         // comparaison
//         var x = cursor.x - elPos.x;
//         var y = cursor.y - elPos.y;

//         // dist
//         var dist = Math.sqrt(x * x + y * y);

//         // mutex hover
//         var mutHover = false;

//         // anim
//         if (dist < width * hoverArea) {
//           mutHover = true;
//           if (!hover) {
//             hover = true;
//           }
//           onHover(x, y, key);
//         }

//         // reset
//         if (!mutHover && hover) {
//           onLeave();
//           hover = false;
//         }
//       });
//     };

//     var onHover = function(x, y, key) {
//       TweenMax.to($self, 0.4 + 1, {
//         x: x * 0.8,
//         y: y * 0.8,
//         //scale: .9,
//         rotation: 0,
//       });
//     };
//     var onLeave = function() {
//       TweenMax.to($self, 0.7 + parseInt(key, 10), {
//         x: 0,
//         y: 0,
//         scale: 1,
//         rotation: 0,
//         // ease: Elastic.easeOut.config(1.2, 0.4)
//       });
//       console.log('leave');
//     };

//     attachEventsListener();
//   });
// };

// const el = document.getElementsByClassName('hover_button');

// hoverMouse(el);



var container = document.getElementById("container");
var circle1 = document.querySelector(".circle1");
var circle2 = document.querySelector(".circle2");

TweenMax.set(circle1, {xPercent: -50, yPercent: -50 });
TweenMax.set(circle2, {xPercent: -50, yPercent: -50 });

container.addEventListener("pointerenter", e => {
  TweenMax.to(circle1, 0.2, {top: 0, left: 0 });
  TweenMax.to(circle2, 0.1, {top: 0, left: 0 });
  positionCircle(e);
});

container.addEventListener("pointerleave", e => {
  // TweenMax.to(circle1, 0.7, {
  //   x: 0,
  //   y: 0,
  //   // top: '50%', 
  //   // scale: 1,
  //   top: 'auto',
  //   left: 'auto',
  //   transition: 'none',
  //   scale: 1,
  //   // rotation: 0,
  //   // ease: Elastic.easeOut.config(1.2, 0.4)
  // });
  console.log("leave");
  
  TweenMax.to([circle2, circle1], 1.5, {
    
    top: '50%',
    left: '50%',
    transition: 'none',
    // xPercent: -50,
    scale: 1,
    x: 0,
    y: 0,
    // rotation: 0,
    // ease: Elastic.easeOut.config(1.2, 0.4)
  });
  // TweenMax.to(circle1, 0.2, { scale: 0, opacity: 0 });
  // TweenMax.to(circle2, 0.1, { scale: 0, opacity: 0 });
  // positionCircle(e);
});

container.addEventListener("pointermove", e => {
  positionCircle(e);
});

function positionCircle(e) {
  var rect = container.getBoundingClientRect();
  var relX = e.pageX - container.offsetLeft;
  var relY = e.pageY - container.offsetTop;

  TweenMax.to(circle1, 0.2, {x: relX, y: relY });
  TweenMax.to(circle2, 0.1, {x: relX, y: relY });
}

