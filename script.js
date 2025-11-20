const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let activeCube = null;

cubes.forEach(cube => {
  cube.draggable = true;

  cube.addEventListener("dragstart", (e) => {
    activeCube = e.target;
    e.dataTransfer.setData("text/plain", "");
    setTimeout(() => {
      activeCube.style.opacity = "0.3";
    }, 0);
  });

  cube.addEventListener("dragend", () => {
    if (activeCube) activeCube.style.opacity = "1";
    activeCube = null;
  });
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (activeCube) {
    const newX = Math.max(0, Math.min(x - activeCube.offsetWidth / 2, rect.width - activeCube.offsetWidth));
    const newY = Math.max(0, Math.min(y - activeCube.offsetHeight / 2, rect.height - activeCube.offsetHeight));

    activeCube.style.position = "absolute";
    activeCube.style.left = `${newX}px`;
    activeCube.style.top = `${newY}px`;
  }
});
