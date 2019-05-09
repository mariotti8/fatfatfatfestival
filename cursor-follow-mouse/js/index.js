

const cursor = document.getElementById('cursor');
const links = document.getElementsByTagName('a');
const elements = document.getElementsByClassName('element');
let x = 13;

window.addEventListener('mousemove', e => {
  // document.getElementById('cursor').style.left = e.clientX - x + 'px';
  // document.getElementById('cursor').style.top = e.clientY - x + 'px';
  
setTimeout(function() {
  $('.cursor')
    .eq(1)
    .css({
      left: e.clientX - x,
      top: e.clientY - x
    });
}, 100);
});

// for (let item of links) {
//   item.addEventListener('mouseover', e => {
//     x = 5;   
//     cursor.style.transform = 'scale(3)';
//     cursor.style.background = 'transparent';
//     cursor.style.border = '0.5px solid #bbb';
//   })

//   item.addEventListener('mouseout', e => {
//     x = 13;
//     cursor.style.transform = 'scale(1)';
//     cursor.style.border = 'none';
//     cursor.style.background = '#bbb';
//   })
// }


// for (let element of elements) {
//   element.addEventListener('mouseover', e => {
//     cursor.children[0].style.display = 'block';
//     cursor.style.transform = 'scale(3)';
//     cursor.style.background = 'transparent';
//     cursor.style.border = '0.5px solid #bbb';
//     document.body.style.cursor = 'none';
//   })

//   element.addEventListener('mouseout', e => {
//     cursor.children[0].style.display = 'none';
//     cursor.style.transform = 'scale(1)';
//     cursor.style.border = 'none';
//     cursor.style.background = '#bbb';
//     document.body.style.cursor = 'url("https://cdn.jsdelivr.net/gh/mariotti8/fatfatfatfestival@68c1027/assets/cursor.png"), pointer';
//   })
// }