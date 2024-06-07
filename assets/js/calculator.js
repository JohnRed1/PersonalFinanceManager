function toggleCalc() {
  let calcOn = document.getElementById('mydiv').style.transform;
  
  if (calcOn === 'translate(190%, -100%)') {
    //document.getElementById('mydiv').style.display = 'none';
    document.getElementById('mydiv').style.transform = 'translate(190%, -350%)';
  } else {
   // document.getElementById('mydiv').style.display = 'block';
    document.getElementById('mydiv').style.transform = 'translate(190%, -100%)';
  }
};


let calculation = '';
function updateCalculation(value) {
  calculation += value;
  document.querySelector('.js-result').innerHTML = `${calculation}`;

};




//DRAGABBLE EDITING

dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  

    elmnt.onmousedown = dragMouseDown;
  

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}