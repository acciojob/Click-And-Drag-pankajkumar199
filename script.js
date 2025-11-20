const list = document.querySelector('.items');
let dragging = null;

document.querySelectorAll('.item').forEach(item => {

  item.addEventListener('dragstart', e => {
    dragging = item;
    item.classList.add('dragging');
    e.dataTransfer.setData('text/plain', '');
  });

  item.addEventListener('dragenter', e => {
    if (item !== dragging) item.classList.add('over');
  });

  item.addEventListener('dragleave', e => {
    item.classList.remove('over');
  });

  item.addEventListener('dragover', e => {
    e.preventDefault();
  });

  item.addEventListener('drop', e => {
    e.preventDefault();
    if (item !== dragging) {
      list.insertBefore(dragging, item);
    }
    item.classList.remove('over');
  });

  item.addEventListener('dragend', e => {
    item.classList.remove('dragging');
  });

});
