const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {

  cube.addEventListener("mousedown", (e) => {
    activeCube = e.target;

    const rect = activeCube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    activeCube.style.zIndex = 1000;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", drop);
  });

});

function drag(e) {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // boundaries
  x = Math.max(0, Math.min(x, containerRect.width - activeCube.offsetWidth));
  y = Math.max(0, Math.min(y, containerRect.height - activeCube.offsetHeight));

  activeCube.style.left = x + "px";
  activeCube.style.top = y + "px";
}

function drop() {
  if (activeCube) activeCube.style.zIndex = 1;

  activeCube = null;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", drop);
}
