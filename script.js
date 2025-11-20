// script.js — robust reorder (moves nodes, not just swapping innerHTML)
const list = document.querySelector('.items');
let dragSrc = null;

function handleDragStart(e) {
  dragSrc = this; // the dragged <li>
  this.classList.add('dragging');

  // Required for Firefox — set some data
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', this.dataset.id || this.innerText);
}

function handleDragOver(e) {
  // Allow drop
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDrop(e) {
  e.stopPropagation(); // stops the browser from redirecting.

  if (dragSrc === this) return false;

  // Find current node indices and insert accordingly
  // We'll insert the dragged node before the drop target node
  // If you want dropped-on to go after, change logic accordingly.
  const draggedNode = dragSrc;
  const dropNode = this;

  // Insert draggedNode before dropNode
  list.insertBefore(draggedNode, dropNode);

  return false;
}

function handleDragEnd(e) {
  document.querySelectorAll('.item').forEach(item => {
    item.classList.remove('over');
    item.classList.remove('dragging');
  });
}

// Attach listeners
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('dragstart', handleDragStart);
  item.addEventListener('dragenter', handleDragEnter);
  item.addEventListener('dragover', handleDragOver);
  item.addEventListener('dragleave', handleDragLeave);
  item.addEventListener('drop', handleDrop);
  item.addEventListener('dragend', handleDragEnd);
});
