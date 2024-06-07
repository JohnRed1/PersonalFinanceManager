//GET USERNAME AND EXPENSE ARRAY FROM LOCAL STORAGE

const username = localStorage.getItem('username');


const savingsList = JSON.parse(localStorage.getItem(`${username}Savings`)) || [];



var JSConfetti=function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}function n(t){return+t.replace(/px/,"")}function s(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=Math.random()*(e-t)+t;return Math.floor(n*Math.pow(10,i))/Math.pow(10,i)}function o(t){return t[s(0,t.length)]}var a=["#fcf403","#62fc03","#f4fc03","#03e7fc","#03fca5","#a503fc","#fc03ad","#fc03c2"];function r(t){return Math.log(t)/Math.log(1920)}var h=function(){function e(i){t(this,e);var n=i.initialPosition,a=i.direction,h=i.confettiRadius,c=i.confettiColors,u=i.emojis,l=i.emojiSize,d=i.canvasWidth,f=s(.9,1.7,3)*r(d);this.confettiSpeed={x:f,y:f},this.finalConfettiSpeedX=s(.2,.6,3),this.rotationSpeed=u.length?.01:s(.03,.07,3)*r(d),this.dragForceCoefficient=s(5e-4,9e-4,6),this.radius={x:h,y:h},this.initialRadius=h,this.rotationAngle="left"===a?s(0,.2,3):s(-.2,0,3),this.emojiSize=l,this.emojiRotationAngle=s(0,2*Math.PI),this.radiusYUpdateDirection="down";var m="left"===a?s(82,15)*Math.PI/180:s(-15,-82)*Math.PI/180;this.absCos=Math.abs(Math.cos(m)),this.absSin=Math.abs(Math.sin(m));var v=s(-150,0),p={x:n.x+("left"===a?-v:v)*this.absCos,y:n.y-v*this.absSin};this.currentPosition=Object.assign({},p),this.initialPosition=Object.assign({},p),this.color=u.length?null:o(c),this.emoji=u.length?o(u):null,this.createdAt=(new Date).getTime(),this.direction=a}return i(e,[{key:"draw",value:function(t){var e=this.currentPosition,i=this.radius,n=this.color,s=this.emoji,o=this.rotationAngle,a=this.emojiRotationAngle,r=this.emojiSize,h=window.devicePixelRatio;n?(t.fillStyle=n,t.beginPath(),t.ellipse(e.x*h,e.y*h,i.x*h,i.y*h,o,0,2*Math.PI),t.fill()):s&&(t.font="".concat(r,"px serif"),t.save(),t.translate(h*e.x,h*e.y),t.rotate(a),t.textAlign="center",t.fillText(s,0,0),t.restore())}},{key:"updatePosition",value:function(t,e){var i=this.confettiSpeed,n=this.dragForceCoefficient,s=this.finalConfettiSpeedX,o=this.radiusYUpdateDirection,a=this.rotationSpeed,r=this.createdAt,h=this.direction,c=e-r;i.x>s&&(this.confettiSpeed.x-=n*t),this.currentPosition.x+=i.x*("left"===h?-this.absCos:this.absCos)*t,this.currentPosition.y=this.initialPosition.y-i.y*this.absSin*c+.00125*Math.pow(c,2)/2,this.rotationSpeed-=this.emoji?1e-4:1e-5*t,this.rotationSpeed<0&&(this.rotationSpeed=0),this.emoji?this.emojiRotationAngle+=this.rotationSpeed*t%(2*Math.PI):"down"===o?(this.radius.y-=t*a,this.radius.y<=0&&(this.radius.y=0,this.radiusYUpdateDirection="up")):(this.radius.y+=t*a,this.radius.y>=this.initialRadius&&(this.radius.y=this.initialRadius,this.radiusYUpdateDirection="down"))}},{key:"getIsVisibleOnCanvas",value:function(t){return this.currentPosition.y<t+100}}]),e}();function c(){var t=document.createElement("canvas");return t.style.position="fixed",t.style.width="100%",t.style.height="100%",t.style.top="0",t.style.left="0",t.style.zIndex="1000",t.style.pointerEvents="none",document.body.appendChild(t),t}function u(t){var e=t.confettiRadius,i=void 0===e?6:e,n=t.confettiNumber,s=void 0===n?t.confettiesNumber||(t.emojis?40:250):n,o=t.confettiColors,r=void 0===o?a:o,h=t.emojis,c=void 0===h?t.emojies||[]:h,u=t.emojiSize,l=void 0===u?80:u;return t.emojies&&console.error("emojies argument is deprecated, please use emojis instead"),t.confettiesNumber&&console.error("confettiesNumber argument is deprecated, please use confettiNumber instead"),{confettiRadius:i,confettiNumber:s,confettiColors:r,emojis:c,emojiSize:l}}var l=function(){function e(i){var n=this;t(this,e),this.canvasContext=i,this.shapes=[],this.promise=new Promise((function(t){return n.resolvePromise=t}))}return i(e,[{key:"getBatchCompletePromise",value:function(){return this.promise}},{key:"addShapes",value:function(){var t;(t=this.shapes).push.apply(t,arguments)}},{key:"complete",value:function(){var t;return!this.shapes.length&&(null===(t=this.resolvePromise)||void 0===t||t.call(this),!0)}},{key:"processShapes",value:function(t,e,i){var n=this,s=t.timeDelta,o=t.currentTime;this.shapes=this.shapes.filter((function(t){return t.updatePosition(s,o),t.draw(n.canvasContext),!i||t.getIsVisibleOnCanvas(e)}))}}]),e}();return function(){function e(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this,e),this.activeConfettiBatches=[],this.canvas=i.canvas||c(),this.canvasContext=this.canvas.getContext("2d"),this.requestAnimationFrameRequested=!1,this.lastUpdated=(new Date).getTime(),this.iterationIndex=0,this.loop=this.loop.bind(this),requestAnimationFrame(this.loop)}return i(e,[{key:"loop",value:function(){var t,e,i,s,o;this.requestAnimationFrameRequested=!1,t=this.canvas,e=window.devicePixelRatio,i=getComputedStyle(t),s=n(i.getPropertyValue("width")),o=n(i.getPropertyValue("height")),t.setAttribute("width",(s*e).toString()),t.setAttribute("height",(o*e).toString());var a=(new Date).getTime(),r=a-this.lastUpdated,h=this.canvas.offsetHeight,c=this.iterationIndex%10==0;this.activeConfettiBatches=this.activeConfettiBatches.filter((function(t){return t.processShapes({timeDelta:r,currentTime:a},h,c),!c||!t.complete()})),this.iterationIndex++,this.queueAnimationFrameIfNeeded(a)}},{key:"queueAnimationFrameIfNeeded",value:function(t){this.requestAnimationFrameRequested||this.activeConfettiBatches.length<1||(this.requestAnimationFrameRequested=!0,this.lastUpdated=t||(new Date).getTime(),requestAnimationFrame(this.loop))}},{key:"addConfetti",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=u(t),i=e.confettiRadius,n=e.confettiNumber,s=e.confettiColors,o=e.emojis,a=e.emojiSize,r=this.canvas.getBoundingClientRect(),c=r.width,d=r.height,f=5*d/7,m={x:0,y:f},v={x:c,y:f},p=new l(this.canvasContext),g=0;g<n/2;g++){var y=new h({initialPosition:m,direction:"right",confettiRadius:i,confettiColors:s,confettiNumber:n,emojis:o,emojiSize:a,canvasWidth:c}),C=new h({initialPosition:v,direction:"left",confettiRadius:i,confettiColors:s,confettiNumber:n,emojis:o,emojiSize:a,canvasWidth:c});p.addShapes(y,C)}return this.activeConfettiBatches.push(p),this.queueAnimationFrameIfNeeded(),p.getBatchCompletePromise()}},{key:"clearCanvas",value:function(){this.activeConfettiBatches=[]}}]),e}()}();


const javaScriptConfetti = new JSConfetti();






renderSavings();
balColorCheck();
firstItemOnPage();







//toggle Add savings modal

function toggleAddSavingsOn() {
  overlayOn();
  document.getElementById('addSavingsModal').style.transform ='translate(-50%, -50%)';
};

function toggleAddSavingsOff() {
  overlayOff();
  document.getElementById('addSavingsModal').style.transform ='translate(-50%, -400%)';
};

function toggleAddAmountOn() {
  overlayOn();
  document.getElementById('addAmount').style.transform ='translate(-50%, -50%)';
};

function toggleAddAmountOff() {
  overlayOff();
  document.getElementById('addAmount').style.transform ='translate(-50%, -400%)';
};

function toggleAlertOn() {
  document.getElementById('alertModal').style.transform ='translate(-50%, -50%)';
};

function toggleAlertOff() {
  document.getElementById('alertModal').style.transform ='translate(-50%, -400%)';
};

function toggleYayOn() {
  document.getElementById('savedmodal').style.transform ='translate(-50%, -50%)';
};

function toggleYayOff() {
  document.getElementById('savedmodal').style.transform ='translate(-50%, -400%)';
};

function firstItemOnPage() {
  if (savingsList.length == 0) {
    document.getElementById('firstPrompt').classList.remove('d-none');
    document.getElementById('firstPrompt').classList.add('d-flex');
    document.getElementById('savingsHeader').classList.remove('d-block');
    document.getElementById('savingsHeader').classList.add('d-none');
  }
  else {
    document.getElementById('firstPrompt').classList.remove('d-flex');
    document.getElementById('firstPrompt').classList.add('d-none');
    document.getElementById('savingsHeader').classList.remove('d-none');
    document.getElementById('savingsHeader').classList.add('d-block');
  
  }
};





//Filter bar toggle 
function openfNav() {
  
  document.getElementById('overlay').style.display = 'block';
  setTimeout(overlayColorOn, 170);
  document.getElementById("filterSidenav").style.width = "300px";
}




function addSavings() {

 
  let savingsTitle  = document.getElementById('savingsTitle').value;

  let savingsGoal = document.getElementById('savingsGoal').value;


  if (savingsTitle == '' || savingsTitle.trim() == '') {
    createError('savingsTitle');

    setTimeout(refreshError, 1000, 'savingsTitle'); 
  } 
  else 
  
  if (savingsGoal == '' || savingsGoal.trim() == '' || validateAmount(savingsGoal) == false) {
    createError('savingsGoal');

    setTimeout(refreshError, 1000, 'savingsGoal'); 
  }
  
  else
  {
    savingsList.push({
      savingsTitle,
      savingsAmount: 0,
      savingsGoal,
      savingsProgress: 0
    });


    

    //update user account balance
    updateSavingsBalance();


    //render the savings on the page;
    renderSavings();

    //update the user's savings array in localStorage
    updateSavingsRecord();

      
    //clear all the previous values in the savings fields
    clearSavingFields();
      

      //clear modal
      toggleAddSavingsOff();

      //updateBalanceOnPage();
      updateBalanceOnPage();

      balColorCheck();
  }
};



function renderSavings() {
  let savingsTotalHTML = '';
  let userCurrency = localStorage.getItem(`${username}Currency`);

  for (let i = 0; i < savingsList.length; i++) {
    const savingsObject = savingsList[i];

    let savingsTitle = savingsObject.savingsTitle;
    let savingsAmount = savingsObject.savingsAmount;
    let savingsGoal = savingsObject.savingsGoal;
    let savingsProgress = savingsObject.savingsProgress;
    let progressPercentage = Math.round((+savingsAmount / +savingsGoal) * 100);



    let savingsHTML = `<div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3 addedSaving">
    <div class="flex align-items-center justify-content-between w-100 ">
      <div class="w-100 "><p class="savingTitle">${savingsTitle}</p></div>
      <div class=" w-100 ps-5 "><p class="savingAmount ms-3">${userCurrency} ${savingsAmount}</p></div>
      <div class="w-100 ps-5"><p class="money savingGoal ms-4 ">${userCurrency} ${savingsGoal}</p></div>
        <div class="me-4 w-100 ps-5 ">

          <div class="other savingProgressBar ms-4 position-relative ">
            <div class="savingProgress" id="savingsProgress${i}"></div>
            <p class="position-absolute savingsProgressNum" id="progressNum${i}">${savingsProgress}%</p>
          </div>   

        </div>
    </div> 
    
    <div class="flex align-items-center justify-content-between ">
    <button class=" btn btn-success me-2 " onclick="
        toggleAddAmountOn();
        localStorage.setItem('index', ${i});
       
    ">
          Add
        </button>
      <button class="btn btn-danger" onclick="
      let userBalance = JSON.parse(localStorage.getItem('${username}Main'));
    
      let savingsBeforeSplice = 0;
      let savingsAfterSplice = 0;

      
      for (let i = 0; i < savingsList.length; i++) {
        let currentIndex = savingsList[i];
        savingsBeforeSplice += +currentIndex.savingsAmount; 
      }

      savingsList.splice(${i}, 1);

      
      for (let i = 0; i < savingsList.length; i++) {
        let currentIndex = savingsList[i];
        savingsAfterSplice += +currentIndex.savingsAmount; 
      };

      let deleteAmount =  savingsBeforeSplice - savingsAfterSplice ;

      let result = +userBalance + +deleteAmount;

      localStorage.setItem('${username}Main', JSON.stringify(result));

      renderSavings();
      updateSavingsRecord();
      updateBalanceOnPage();
      firstItemOnPage();
      balColorCheck();
      ">
        Delete
      </button>
    </div>
  </div>`;

  if (progressPercentage > 99) {
    savingsHTML = `<div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3 addedSaving">
    <div class="flex align-items-center justify-content-between w-100 ">
      <div class="w-100 "><p class="savingTitle">${savingsTitle}</p></div>
      <div class=" w-100 ps-5 "><p class="savingAmount ms-3">${userCurrency}${savingsAmount}</p></div>
      <div class="w-100 ps-5"><p class="money savingGoal ms-4 ">${userCurrency}${savingsGoal}</p></div>
        <div class="me-4 w-100 ps-5 ">

          <div class="other savingProgressBar ms-4 me-2  position-relative" style="transition: all 1s;">
            <div class="savingProgress" id="savingsProgress${i}" style="transition: all 1s;"></div>
            <p class="position-absolute savingsProgressNum" id="progressNum${i}">100%</p>
          </div>   

        </div>
    </div> 
    
    <div class="flex align-items-center justify-content-between ">
    <button class=" btn btn-success p-2  ms-2 fw-bold me-2 rounded-pill completed d-flex align-items-center" onclick="" style="margin-left: 20px !important;" onclick="
      
    ">
    <span class="material-symbols-rounded fs-5 ">
    celebration
    </span>
        </button>
      <button class="btn btn-danger" onclick="
      let userBalance = JSON.parse(localStorage.getItem('${username}Main'));
    
      let savingsBeforeSplice = 0;
      let savingsAfterSplice = 0;

      
      for (let i = 0; i < savingsList.length; i++) {
        let currentIndex = savingsList[i];
        savingsBeforeSplice += +currentIndex.savingsAmount; 
      }

      savingsList.splice(${i}, 1);

      
      for (let i = 0; i < savingsList.length; i++) {
        let currentIndex = savingsList[i];
        savingsAfterSplice += +currentIndex.savingsAmount; 
      };

      let deleteAmount =  savingsBeforeSplice - savingsAfterSplice ;

      let result = +userBalance + +deleteAmount;

      localStorage.setItem('${username}Main', JSON.stringify(result));

      renderSavings();
      updateSavingsRecord();
      updateBalanceOnPage();
      firstItemOnPage();
      balColorCheck();
      ">
        Delete
      </button>
    </div>
  </div>`;
  }

    savingsTotalHTML += savingsHTML;


  };

  document.getElementById('savingsContainer').innerHTML = savingsTotalHTML;
  updateProgress();

};


//search by title
let searchInput = document.getElementById('searchByTitle');
searchInput.addEventListener('input', (e) => {
  const searchValue = e.target.value.toLowerCase();
  //console.log(searchValue);

   //const incomeContainer = document.getElementById('incomeContainer');
    const savingItem = Array.from(document.querySelectorAll('div.addedSaving'));
    const savingTitle = document.querySelectorAll('p.savingTitle');

   // console.log(savingTitle);

    for (let i = 0; i < savingTitle.length; i++) {
      let match = savingTitle[i].innerText.toLowerCase();
      
      let incomeIndex = savingItem[i];
      //console.log(savingItem[2]);
      
      if (match.includes(searchValue)) {
        incomeIndex.classList.remove('d-none');
        incomeIndex.classList.add('d-flex');
      }
      else {
        incomeIndex.classList.remove('d-flex');
        incomeIndex.classList.add('d-none');
      }
    };
});





const  moneyRegex = /^[0-9]+$/;



//create Error for form

function createError(value) {
  let errorOutline = document.getElementById(`${value}`);
  errorOutline.style.outline = "2px solid rgb(230, 11, 11)";
  errorOutline.style.color = "rgb(230, 11, 11) !important";
};

//CLEAR ERROR on the form
function refreshError(value) {
  let errorOutline = document.getElementById(`${value}`);
  errorOutline.style.color = "black";
  errorOutline.style.border = "1px solid gray !important";
  errorOutline.style.outline = "none";

};

function validateAmount(amount) {
  return moneyRegex.test(amount);
};


function saveToPlan() {
 let savedValue =  document.getElementById('AddSavingsAmount').value;
 let mainBal = localStorage.getItem(`${username}Main`);
 
 if (validateAmount(savedValue) == false) {
    createError('AddSavingsAmount');

    setTimeout(refreshError, 1000, 'AddSavingsAmount'); 
    return false;
 }
 else 
  if (+mainBal < +savedValue) {
    toggleAlertOn();
  } 
  else
  {
    let index = localStorage.getItem('index');
    let userBalance = +localStorage.getItem(`${username}Main`);
      let savingValue = document.getElementById('AddSavingsAmount').value;
      let savingsPlan =  savingsList[index];

      let savingsPrev= savingsPlan.savingsAmount;
      //console.log(savingsPrev);


      savingsPlan.savingsAmount += +savingValue;

      let savingsAfter = savingsPlan.savingsAmount;
      

      
      userBalance += (  savingsPrev - savingsAfter  );
      localStorage.setItem(`${username}Main`, userBalance);
      
      updateSavingsRecord();
      renderSavings();
      updateBalanceOnPage();

    
    
    updateProgress();

    let savingsAmount = savingsList[index].savingsAmount;
    let savingsGoal = +savingsList[index].savingsGoal;
    let progressPercentage = Math.round((+savingsAmount / +savingsGoal) * 100);

    console.log(progressPercentage);

    
    if (+progressPercentage > 99) {
      javaScriptConfetti.addConfetti();
      toggleYayOn();
    }


    
    localStorage.removeItem('index');
    

    toggleAddAmountOff();
 }
};

function updateProgress() {
  
  for(let i = 0; i < savingsList.length; i++) {

    let savingPlan = savingsList[i];
    let savingsAmount = savingPlan.savingsAmount;
    let savingsGoal = +savingPlan.savingsGoal;

    let progressBar = document.getElementById(`savingsProgress${i}`);
    let progressNum = document.getElementById(`progressNum${i}`);
    
    let progressPercentage = Math.round((+savingsAmount / +savingsGoal) * 100);
    progressNum.innerHTML = `${progressPercentage}%`;
    if (progressPercentage > 99) {
      progressNum.innerHTML = `100%`;
    }

    progressBar.style.width = `${progressPercentage}%`;

    if (progressPercentage < 31) {
      progressNum.style.color = 'black';
      progressBar.style.backgroundColor = 'rgb(221, 28, 28)';
    }
    else
    if (progressPercentage < 65) {
      progressNum.style.color = 'black';
      progressBar.style.backgroundColor = 'rgb(235, 104, 24)';
    } 
    
    if (progressPercentage >= 65) {
     
      progressNum.style.color = 'white';
      progressBar.style.backgroundColor = 'rgb(240, 179, 37)';
    }
    
    if (progressPercentage > 75) {
     
      progressNum.style.color = 'white';
      progressBar.style.backgroundColor = 'rgb(2, 134, 68)';
    }

    
  } 
}


function filter() {
  let progressMatch = document.getElementById('filterProgress').value;
  let progressTitles = document.querySelectorAll('.savingsProgressNum');

  const savingItems = document.querySelectorAll('.addedSaving');
  console.log(progressTitles);
  for (let i =0; i < savingItems.length; i++) {
    let savingIndex = savingItems[i];

    let indexTitle = progressTitles[i];
    if (progressMatch == 'completed') {
      if (indexTitle.innerText == '100%') {
        savingIndex.classList.remove('d-none');
        savingIndex.classList.add('d-flex');
      }
      else {
        savingIndex.classList.remove('d-flex');
        savingIndex.classList.add('d-none');
      }
    }
    else 
    if (progressMatch == 'ongoing') {
      if (indexTitle.innerText == '100%') {
        savingIndex.classList.remove('d-flex');
        savingIndex.classList.add('d-none');
      }
      else {
        savingIndex.classList.remove('d-none');
        savingIndex.classList.add('d-flex');
      }
    }
    else {
      savingIndex.classList.remove('d-none');
      savingIndex.classList.add('d-flex');
    }
  }

  closefNav();
}


//overlays

//modal overlay controls
function overlayOn() {
  
  document.getElementById('overlay').style.display = 'block';
  setTimeout(overlayColorOn, 170);
 // document.body.style.overflowY = 'hidden';
}

function overlayOff() {
  overlayColorOff();
  setTimeout(closeOverlayDelay, 230);
  //document.body.style.overflowY = 'visible';
};

function overlayColorOn() {
  document.getElementById('overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.562)';
}

function overlayColorOff() {
  document.getElementById('overlay').style.backgroundColor = 'transparent';
}

/* Set the width of the side navigation to 0 */
function closefNav() {
  overlayColorOff();
 
  document.getElementById("filterSidenav").style.width = "0";
  setTimeout(closeOverlayDelay, 230);
  
}

function closeOverlayDelay() {
  document.getElementById('overlay').style.display = 'none';
}


function updateSavingsBalance() {
  let mainBalance = +JSON.parse(localStorage.getItem(`${username}Main`));
  let savingsAmount = +savingsList[savingsList.length - 1].savingsAmount;

  mainBalance -= +savingsAmount;

  localStorage.setItem(`${username}Main`, JSON.stringify(mainBalance));
};








function balColorCheck() {
  const balance = JSON.parse(localStorage.getItem(`${username}Main`));

  const balAmount = +balance;
  //console.log(balAmount);

  if (balAmount < 0) {
    document.getElementById('bal-sidebar').style.color = 'rgb(255, 49, 39)';
  }
  else {
    document.getElementById('bal-sidebar').style.color = 'rgb(3, 221, 112)';
  }
};


//log out of fundTrackr
function logOut(){

  localStorage.removeItem('username');
  localStorage.removeItem('password');
  localStorage.removeItem('firstname');
  localStorage.removeItem('lastname');
  localStorage.removeItem('email');
  window.location.href = "../login/login.html"
};



function updateSavingsRecord() {
  let savingsRecords = JSON.stringify(savingsList);
  localStorage.setItem(`${username}Savings`, savingsRecords);
};

function updateBalanceOnPage() {
  document.getElementById('bal-sidebar').innerHTML = userCurrency + localStorage.getItem(`${username}Main`);
};

function clearSavingFields() {
  document.getElementById('savingsTitle').value = '';
  document.getElementById('savingsGoal').value = '';
};

function clearAddField() {

}







