
const dropZone1=document.getElementById('itemsDropZone1');
const dropZone2=document.getElementById('itemsDropZone2');
const charInv=document.getElementById('characterInv');
const item = document.getElementById('item');
const item2 = document.getElementById('item2');
const item3 = document.getElementById('item3');
const item4 = document.getElementById('item4');
const item5 = document.getElementById('item5');
const item6 = document.getElementById('item6');
const item7 = document.getElementById('item7');
const item8 = document.getElementById('item8');
const items = [item, item2,item3,item4,item5,item6,item7,item8];
items.push(item3)

items.forEach((item) => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });

  dropZone1.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  dropZone1.addEventListener('drop', function (event) {
    const itemId = event.dataTransfer.getData('text/plain');
    const draggedItem = document.getElementById(itemId);
    let atkValue=parseInt(document.querySelector('#attackValue').textContent)
    atkValue+=1
    document.querySelector('#attackValue').textContent=atkValue
    if (dropZone1.children.length >= 1) {
        return;
      }
    dropZone1.prepend(draggedItem);
  });

  dropZone2.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  dropZone2.addEventListener('drop', function (event) {
    const itemId = event.dataTransfer.getData('text/plain');
    const draggedItem = document.getElementById(itemId);
    let defValue=parseInt(document.querySelector('#defValue').textContent)
    defValue+=1
    document.querySelector('#defValue').textContent=defValue
    if (dropZone2.children.length >= 1) {
        return;
      }
    dropZone2.prepend(draggedItem);
  });

  charInv.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  charInv.addEventListener('drop', function (event) {
    const itemId = event.dataTransfer.getData('text/plain');
    const draggedItem = document.getElementById(itemId);
    charInv.prepend(draggedItem);
    document.querySelector('#attackValue').innerHTML=1;
    document.querySelector('#defValue').innerHTML=1;
  });
});



//sprawdzanie czy element posiada item, jesli tak -> true, nie -> fałsz
function checkItemLocation(element) {
    if (element.contains(item)) {
        return true;
    } else {
        return false;
    }
}
