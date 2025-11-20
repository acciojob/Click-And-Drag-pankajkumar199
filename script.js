// Your code here 
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.style.position = "absolute"; // make draggable
  cube.addEventListener("mousedown", startDrag);
});

function startDrag(e) {
  activeCube = e.target;

  
  activeCube.style.zIndex = 999;

  
  const rect = activeCube.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  document.addEventListener("mousemove", dragCube);
  document.addEventListener("mouseup", stopDrag);
}

function dragCube(e) {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();

 
  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;


  x = Math.max(0, Math.min(x, containerRect.width - activeCube.offsetWidth));
  y = Math.max(0, Math.min(y, containerRect.height - activeCube.offsetHeight));

  activeCube.style.left = x + "px";
  activeCube.style.top = y + "px";
}

function stopDrag() {
  if (activeCube) {
    activeCube.style.zIndex = 1;
  }
  activeCube = null;
  document.removeEventListener("mousemove", dragCube);
  document.removeEventListener("mouseup", stopDrag);
}
