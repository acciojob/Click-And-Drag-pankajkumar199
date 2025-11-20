const list = document.querySelector('.items');
let dragSrc = null;

document.querySelectorAll('.item').forEach(item => {

  item.addEventListener('dragstart', e => {
    dragSrc = item;
    item.classList.add('dragging');
    e.dataTransfer.setData('text/plain', '');
  });

  item.addEventListener('dragover', e => {
    e.preventDefault();
  });

  item.addEventListener('dragenter', e => {
    if (item !== dragSrc) {
      item.classList.add('over');
    }
  });

  item.addEventListener('dragleave', e => {
    item.classList.remove('over');
  });

  item.addEventListener('drop', e => {
    e.preventDefault();
    if (item !== dragSrc) {
      list.insertBefore(dragSrc, item);
    }
    item.classList.remove('over');
  });

  item.addEventListener('dragend', e => {
    item.classList.remove('dragging');
    document.querySelectorAll('.item').forEach(i => i.classList.remove('over'));
  });

});
