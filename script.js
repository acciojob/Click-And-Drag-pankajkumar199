const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let dragging = false;
let activeCube = null;
let startX, startY, offsetX, offsetY;

cubes.forEach(cube => {
  cube.addEventListener("pointerdown", (e) => {
    dragging = true;
    activeCube = e.target;

    const rect = activeCube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    startX = rect.left - containerRect.left;
    startY = rect.top - containerRect.top;

    activeCube.setPointerCapture(e.pointerId);
  });

  cube.addEventListener("pointermove", (e) => {
    if (!dragging || activeCube !== e.target) return;

    const containerRect = container.getBoundingClientRect();
    let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;

    // boundaries
    x = Math.max(0, Math.min(x, containerRect.width - activeCube.offsetWidth));
    y = Math.max(0, Math.min(y, containerRect.height - activeCube.offsetHeight));

    activeCube.style.position = "absolute";
    activeCube.style.left = x + "px";
    activeCube.style.top = y + "px";
  });

  cube.addEventListener("pointerup", (e) => {
    dragging = false;
    activeCube = null;
  });
});
