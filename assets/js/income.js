
//toggle Add income modal
function toggleAddIncomeOn() {
  overlayOn();
  document.getElementById('addIncomeModal').style.transform ='translate(-50%, -50%)';
};

function toggleAddIncomeOff() {
  overlayOff();
  document.getElementById('addIncomeModal').style.transform ='translate(-50%, -400%)';
};

function toggleEditIncomeOn() {
  overlayOn();
  document.getElementById('editIncomeModal').style.transform ='translate(-50%, -50%)';
}; 

function toggleEditIncomeOff() {
  overlayOff();
  document.getElementById('editIncomeModal').style.transform ='translate(-50%, -400%)';
};


//GET USERNAME AND INCOME ARRAY FROM LOCAL STORAGE
const username = localStorage.getItem('username');

const incomeList = JSON.parse(localStorage.getItem(`${username}Income`)) || [];
renderIncome();

firstItemOnPage();

balColorCheck();

function firstItemOnPage() {
  if (incomeList.length == 0) {
    document.getElementById('firstIncomePrompt').classList.remove('d-none');
    document.getElementById('firstIncomePrompt').classList.add('d-flex');
    document.getElementById('incomeHeader').classList.remove('d-block');
    document.getElementById('incomeHeader').classList.add('d-none');
  }
  else {
    document.getElementById('firstIncomePrompt').classList.remove('d-flex');
    document.getElementById('firstIncomePrompt').classList.add('d-none');
    document.getElementById('incomeHeader').classList.remove('d-none');
    document.getElementById('incomeHeader').classList.add('d-block');
  
  }
};

//ADD income function
function addIncome() {

  let incomeName  = document.getElementById('incomeName').value;
  let incomeDate = document.getElementById('incomeDate').value;
  let incomeAmount = document.getElementById('incomeAmount').value;
  let incomeCategory = document.getElementById('incomeCategory').value;


  if (incomeName == '' || incomeName.trim() == '') {
    createError('incomeName');

    setTimeout(refreshError, 1000, 'incomeName'); 
  } 
  else 
  if (incomeDate == '' || incomeDate.trim() == '') {
    createError('incomeDate');

    setTimeout(refreshError, 1000, 'incomeDate'); 
  }
  else
  if (incomeAmount == '' || incomeAmount.trim() == '' || validateAmount(incomeAmount) == false) {
    createError('incomeAmount');

    setTimeout(refreshError, 1000, 'incomeAmount'); 
  }
  else
  {
    incomeList.push({
      incomeName,
      incomeDate,
      incomeAmount,
      incomeCategory
    });
      

    //update the user's income array in localStorage
      updateIncomeRecord();

      //update user account balance
      updateAddBalance();


    //render the income on the page;
      renderIncome();

      
    //clear all the previous values in the income fields
    clearAddIncomeFields();
      

      //clear modal
      toggleAddIncomeOff();
      updateIncomeOnPage();
      

      balColorCheck();
  }
};


function clearAddIncomeFields() {
  document.getElementById('incomeName').value = '';
      document.getElementById('incomeDate').value = '';
      document.getElementById('incomeAmount').value = '';
      document.getElementById('incomeCategory').value = '';
};

function clearEditIncomeFields() {
  document.getElementById('editIncomeName').value = '';
      document.getElementById('editIncomeDate').value = '';
      document.getElementById('editIncomeAmount').value = '';
      document.getElementById('editIncomeCategory').value = '';
};

function editIncome() {
  let newIncomeName = document.getElementById('editIncomeName').value;
  let newIncomeDate = document.getElementById('editIncomeDate').value;  
  let newIncomeAmount = document.getElementById('editIncomeAmount').value; 
  let newIncomeCategory = document.getElementById('editIncomeCategory').value; 

  let index = localStorage.getItem('index');

  if (newIncomeName == '' || newIncomeName.trim() == '') {
    createError('editIncomeName');

    setTimeout(refreshError, 1000, 'editIncomeName'); 
  } 
  else 
  if (newIncomeDate == '' || newIncomeDate.trim() == '') {
    createError('editIncomeDate');

    setTimeout(refreshError, 1000, 'editIncomeDate'); 
  }
  else
  if (newIncomeAmount == '' || newIncomeAmount.trim() == '' || validateAmount(newIncomeAmount) == false) {
    createError('editIncomeAmount');

    setTimeout(refreshError, 1000, 'editIncomeAmount'); 
  }
  else {
    let userBalance = localStorage.getItem(`${username}Main`);
    let oldAmount = incomeList[index].incomeAmount;

    let newAmount = newIncomeAmount;

    let result = (+userBalance - +oldAmount) + +newAmount;

    localStorage.setItem(`${username}Main`, result);

    //remove index from local storage
    localStorage.removeItem('index');

    incomeList[index].incomeName = newIncomeName;
    incomeList[index].incomeDate = newIncomeDate;
    incomeList[index].incomeCategory = newIncomeCategory;
    incomeList[index].incomeAmount = newIncomeAmount;

    renderIncome();
    clearEditIncomeFields();
    
    updateIncomeRecord();
    updateIncomeOnPage();

    balColorCheck();

    toggleEditIncomeOff();

    
  }
  
};

function renderIncome() {
  let incomeTotalHTML = '';
  let userCurrency = localStorage.getItem(`${username}Currency`);

  for (let i = 0; i < incomeList.length; i++) {
    const incomeObject = incomeList[i];

    let incomeName = incomeObject.incomeName;
    let incomeDate = incomeObject.incomeDate;
    let incomeAmount = incomeObject.incomeAmount;
    let incomeCategory = incomeObject.incomeCategory;


    let incomeHTML = ``;
    if (incomeCategory == 'Salary') {
       incomeHTML = `
      <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
      <div style=" flex: 1; text-align: start;"><p class="incomeTitle">${incomeName}</p></div>
      <div style=" flex: 1.5; text-align: center;"><p class="incomeDate">${incomeDate}</p></div>
      <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${incomeAmount}</p></div>
      <div style=" flex: 1.5; text-align: center;"><p class="salary incomeCategory">${incomeCategory}</p></div>
      <div style=" flex: 1; text-align: center;">
      <button class=" btn btn-success" onclick="
      toggleEditIncomeOn();
      document.getElementById('editIncomeName').value = '${incomeName}';
      document.getElementById('editIncomeDate').value = '${incomeDate}';
      document.getElementById('editIncomeAmount').value = '${incomeAmount}';
      document.getElementById('editIncomeCategory').value = '${incomeCategory}';

      localStorage.setItem('index', ${i});
      ">
          Edit
        </button>
        <button class="btn btn-danger" onclick="
          let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

          let incomeBeforeSplice = 0;
          let incomeAfterSplice = 0

          for (let i = 0; i < incomeList.length; i++) {
            let currentIndex = incomeList[i];
            incomeBeforeSplice += +currentIndex.incomeAmount; 
          }

          incomeList.splice(${i}, 1);

          for (let i = 0; i < incomeList.length; i++) {
            let currentIndex = incomeList[i];
            incomeAfterSplice += +currentIndex.incomeAmount; 
          };

          let deleteAmount = incomeAfterSplice - incomeBeforeSplice;

          let result = +userBalance + +deleteAmount;

          localStorage.setItem('${username}Main', JSON.stringify(result));

          renderIncome();
          updateIncomeRecord();
          updateIncomeOnPage();
          firstItemOnPage();
          balColorCheck()
        ">
          Delete
        </button>
      </div>
    </div>`
    } else

    if (incomeCategory == 'Wages') {
       incomeHTML = `
       <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
       <div style=" flex: 1; text-align: start;"><p class="incomeTitle">${incomeName}</p></div>
       <div style=" flex: 1.5; text-align: center;"><p class="incomeDate">${incomeDate}</p></div>
       <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${incomeAmount}</p></div>
       <div style=" flex: 1.5; text-align: center;"><p class="wages incomeCategory">${incomeCategory}</p></div>
       <div style=" flex: 1; text-align: center;">
       <button class=" btn btn-success" onclick="toggleEditIncomeOn();
       document.getElementById('editIncomeName').value = '${incomeName}';
      document.getElementById('editIncomeDate').value = '${incomeDate}';
      document.getElementById('editIncomeAmount').value = '${incomeAmount}';
      document.getElementById('editIncomeCategory').value = '${incomeCategory}';

      localStorage.setItem('index', ${i});
       ">
          Edit
        </button>
         <button class="btn btn-danger" onclick="
         let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

         let incomeBeforeSplice = 0;
         let incomeAfterSplice = 0

         for (let i = 0; i < incomeList.length; i++) {
           let currentIndex = incomeList[i];
           incomeBeforeSplice += +currentIndex.incomeAmount; 
         }

         incomeList.splice(${i}, 1);

         for (let i = 0; i < incomeList.length; i++) {
           let currentIndex = incomeList[i];
           incomeAfterSplice += +currentIndex.incomeAmount; 
         };

         let deleteAmount = incomeAfterSplice - incomeBeforeSplice;

         let result = +userBalance + +deleteAmount;

         localStorage.setItem('${username}Main', JSON.stringify(result));

         renderIncome();
         updateIncomeRecord();
         updateIncomeOnPage();
         firstItemOnPage();
         balColorCheck()
       ">
           Delete
         </button>
       </div>
     </div>`
    } else

    if (incomeCategory == 'Paycheck') {
       incomeHTML = `
       <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
       <div style=" flex: 1; text-align: start;"><p class="incomeTitle">${incomeName}</p></div>
       <div style=" flex: 1.5; text-align: center;"><p class="incomeDate">${incomeDate}</p></div>
       <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${incomeAmount}</p></div>
       <div style=" flex: 1.5; text-align: center;"><p class="paycheck incomeCategory">${incomeCategory}</p></div>
       <div style=" flex: 1; text-align: center;">
       <button class=" btn btn-success" onclick="toggleEditIncomeOn();
       document.getElementById('editIncomeName').value = '${incomeName}';
       document.getElementById('editIncomeDate').value = '${incomeDate}';
       document.getElementById('editIncomeAmount').value = '${incomeAmount}';
       document.getElementById('editIncomeCategory').value = '${incomeCategory}';
 
       localStorage.setItem('index', ${i});
       ">
          Edit
        </button>
         <button class="btn btn-danger" onclick="
         let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

         let incomeBeforeSplice = 0;
         let incomeAfterSplice = 0

         for (let i = 0; i < incomeList.length; i++) {
           let currentIndex = incomeList[i];
           incomeBeforeSplice += +currentIndex.incomeAmount; 
         }

         incomeList.splice(${i}, 1);

         for (let i = 0; i < incomeList.length; i++) {
           let currentIndex = incomeList[i];
           incomeAfterSplice += +currentIndex.incomeAmount; 
         };

         let deleteAmount = incomeAfterSplice - incomeBeforeSplice;

         let result = +userBalance + +deleteAmount;

         localStorage.setItem('${username}Main', JSON.stringify(result));

         renderIncome();
         updateIncomeRecord();
         updateIncomeOnPage();
         firstItemOnPage();
         balColorCheck()
       ">
           Delete
         </button>
       </div>
     </div>`
    } else

    if (incomeCategory == 'Gift') {
      incomeHTML = `
      <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
      <div style=" flex: 1; text-align: start;"><p class="incomeTitle">${incomeName}</p></div>
      <div style=" flex: 1.5; text-align: center;"><p class="incomeDate">${incomeDate}</p></div>
      <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${incomeAmount}</p></div>
      <div style=" flex: 1.5; text-align: center;"><p class="gift incomeCategory">${incomeCategory}</p></div>
      <div style=" flex: 1; text-align: center;">
        <button class=" btn btn-success" onclick="toggleEditIncomeOn();
        document.getElementById('editIncomeName').value = '${incomeName}';
        document.getElementById('editIncomeDate').value = '${incomeDate}';
        document.getElementById('editIncomeAmount').value = '${incomeAmount}';
        document.getElementById('editIncomeCategory').value = '${incomeCategory}';
  
        localStorage.setItem('index', ${i});
        
        ">
          Edit
        </button>
        <button class="btn btn-danger" onclick="
        let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

        let incomeBeforeSplice = 0;
        let incomeAfterSplice = 0

        for (let i = 0; i < incomeList.length; i++) {
          let currentIndex = incomeList[i];
          incomeBeforeSplice += +currentIndex.incomeAmount; 
        }

        incomeList.splice(${i}, 1);

        for (let i = 0; i < incomeList.length; i++) {
          let currentIndex = incomeList[i];
          incomeAfterSplice += +currentIndex.incomeAmount; 
        };

        let deleteAmount = incomeAfterSplice - incomeBeforeSplice;

        let result = +userBalance + +deleteAmount;

        localStorage.setItem('${username}Main', JSON.stringify(result));

        renderIncome();
        updateIncomeRecord();
        updateIncomeOnPage();
        firstItemOnPage();
        balColorCheck();
      ">
          Delete
        </button>
        
      </div>
    </div>`
   } else 

   if (incomeCategory == 'Interest') {
    incomeHTML = `
    <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
    <div style=" flex: 1; text-align: start;"><p class="incomeTitle">${incomeName}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="incomeDate">${incomeDate}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${incomeAmount}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="interest incomeCategory">${incomeCategory}</p></div>
    <div style=" flex: 1; text-align: center;">
    <button class=" btn btn-success" onclick="toggleEditIncomeOn();
    document.getElementById('editIncomeName').value = '${incomeName}';
    document.getElementById('editIncomeDate').value = '${incomeDate}';
    document.getElementById('editIncomeAmount').value = '${incomeAmount}';
    document.getElementById('editIncomeCategory').value = '${incomeCategory}';

    localStorage.setItem('index', ${i});
    
    ">
          Edit
        </button>
      <button class="btn btn-danger" onclick="
      let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

      let incomeBeforeSplice = 0;
      let incomeAfterSplice = 0

      for (let i = 0; i < incomeList.length; i++) {
        let currentIndex = incomeList[i];
        incomeBeforeSplice += +currentIndex.incomeAmount; 
      }

      incomeList.splice(${i}, 1);

      for (let i = 0; i < incomeList.length; i++) {
        let currentIndex = incomeList[i];
        incomeAfterSplice += +currentIndex.incomeAmount; 
      };

      let deleteAmount = incomeAfterSplice - incomeBeforeSplice;

      let result = +userBalance + +deleteAmount;

      localStorage.setItem('${username}Main', JSON.stringify(result));

      renderIncome();
      updateIncomeRecord();
      updateIncomeOnPage();
      firstItemOnPage();
      balColorCheck()
    ">
        Delete
      </button>
    </div>
  </div>`
 } else 

  if (incomeCategory == 'Sales') {
    incomeHTML = `
    <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
    <div style=" flex: 1; text-align: start;"><p class="incomeTitle">${incomeName}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="incomeDate">${incomeDate}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${incomeAmount}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="sales incomeCategory">${incomeCategory}</p></div>
    <div style=" flex: 1; text-align: center;">
    <button class=" btn btn-success" onclick="toggleEditIncomeOn();
    document.getElementById('editIncomeName').value = '${incomeName}';
    document.getElementById('editIncomeDate').value = '${incomeDate}';
    document.getElementById('editIncomeAmount').value = '${incomeAmount}';
    document.getElementById('editIncomeCategory').value = '${incomeCategory}';

    localStorage.setItem('index', ${i});
    
    
    ">
          Edit
        </button>
      <button class="btn btn-danger" onclick="
      let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

      let incomeBeforeSplice = 0;
      let incomeAfterSplice = 0

      for (let i = 0; i < incomeList.length; i++) {
        let currentIndex = incomeList[i];
        incomeBeforeSplice += +currentIndex.incomeAmount; 
      }

      incomeList.splice(${i}, 1);

      for (let i = 0; i < incomeList.length; i++) {
        let currentIndex = incomeList[i];
        incomeAfterSplice += +currentIndex.incomeAmount; 
      };

      let deleteAmount = incomeAfterSplice - incomeBeforeSplice;

      let result = +userBalance + +deleteAmount;

      localStorage.setItem('${username}Main', JSON.stringify(result));

      renderIncome();
      updateIncomeRecord();
      updateIncomeOnPage();
      firstItemOnPage();
      balColorCheck();
    ">
        Delete
      </button>
    </div>
  </div>`
  } else

  if (incomeCategory == 'investmentReturns') {
    incomeHTML = `
    <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
    <div style=" flex: 1; text-align: start;"><p class="incomeTitle">${incomeName}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="incomeDate">${incomeDate}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${incomeAmount}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="investmentReturns incomeCategory">Investment Returns</p></div>
    <div style=" flex: 1; text-align: center;">
    <button class=" btn btn-success" onclick="toggleEditIncomeOn();
    document.getElementById('editIncomeName').value = '${incomeName}';
    document.getElementById('editIncomeDate').value = '${incomeDate}';
    document.getElementById('editIncomeAmount').value = '${incomeAmount}';
    document.getElementById('editIncomeCategory').value = '${incomeCategory}';

    localStorage.setItem('index', ${i});
    
    ">
          Edit
        </button>
      <button class="btn btn-danger" onclick="
      let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

      let incomeBeforeSplice = 0;
      let incomeAfterSplice = 0

      for (let i = 0; i < incomeList.length; i++) {
        let currentIndex = incomeList[i];
        incomeBeforeSplice += +currentIndex.incomeAmount; 
      }

      incomeList.splice(${i}, 1);

      for (let i = 0; i < incomeList.length; i++) {
        let currentIndex = incomeList[i];
        incomeAfterSplice += +currentIndex.incomeAmount; 
      };

      let deleteAmount = incomeAfterSplice - incomeBeforeSplice;

      let result = +userBalance + +deleteAmount;

      localStorage.setItem('${username}Main', JSON.stringify(result));

      renderIncome();
      updateIncomeRecord();
      updateIncomeOnPage();
      firstItemOnPage();
      balColorCheck();
    ">
        Delete
      </button>
    </div>
  </div>`
 } else 

  if (incomeCategory == 'Royalties') {
    incomeHTML = `
    <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
    <div style=" flex: 1; text-align: start;"><p class="incomeTitle">${incomeName}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="incomeDate">${incomeDate}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${incomeAmount}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="royalties incomeCategory">${incomeCategory}</p></div>
    <div style=" flex: 1; text-align: center;">
    <button class=" btn btn-success" onclick="toggleEditIncomeOn();
    document.getElementById('editIncomeName').value = '${incomeName}';
    document.getElementById('editIncomeDate').value = '${incomeDate}';
    document.getElementById('editIncomeAmount').value = '${incomeAmount}';
    document.getElementById('editIncomeCategory').value = '${incomeCategory}';

    localStorage.setItem('index', ${i});
    
    ">
          Edit
        </button>
      <button class="btn btn-danger" onclick="
      let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

      let incomeBeforeSplice = 0;
      let incomeAfterSplice = 0

      for (let i = 0; i < incomeList.length; i++) {
        let currentIndex = incomeList[i];
        incomeBeforeSplice += +currentIndex.incomeAmount; 
      }

      incomeList.splice(${i}, 1);

      for (let i = 0; i < incomeList.length; i++) {
        let currentIndex = incomeList[i];
        incomeAfterSplice += +currentIndex.incomeAmount; 
      };

      let deleteAmount = incomeAfterSplice - incomeBeforeSplice;

      let result = +userBalance + +deleteAmount;

      localStorage.setItem('${username}Main', JSON.stringify(result));

      renderIncome();
      updateIncomeRecord();
      updateIncomeOnPage();
      firstItemOnPage();
      balColorCheck();
    ">
        Delete
      </button>
    </div>
  </div>`
  } else  {
    incomeHTML = `
    <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
    <div style=" flex: 1; text-align: start;"><p class="incomeTitle">${incomeName}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="incomeDate">${incomeDate}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${incomeAmount}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="other incomeCategory">${incomeCategory}</p></div>
    <div style=" flex: 1; text-align: center;">
    <button class=" btn btn-success" onclick="toggleEditIncomeOn();
    
    document.getElementById('editIncomeName').value = '${incomeName}';
    document.getElementById('editIncomeDate').value = '${incomeDate}';
    document.getElementById('editIncomeAmount').value = '${incomeAmount}';
    document.getElementById('editIncomeCategory').value = '${incomeCategory}';

    localStorage.setItem('index', ${i});
    ">
          Edit
        </button>
      <button class="btn btn-danger" onclick="
      let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

      let incomeBeforeSplice = 0;
      let incomeAfterSplice = 0

      for (let i = 0; i < incomeList.length; i++) {
        let currentIndex = incomeList[i];
        incomeBeforeSplice += +currentIndex.incomeAmount; 
      }

      incomeList.splice(${i}, 1);

      for (let i = 0; i < incomeList.length; i++) {
        let currentIndex = incomeList[i];
        incomeAfterSplice += +currentIndex.incomeAmount; 
      };

      let deleteAmount = incomeAfterSplice - incomeBeforeSplice;

      let result = +userBalance + +deleteAmount;

      localStorage.setItem('${username}Main', JSON.stringify(result));

      renderIncome();
      updateIncomeRecord();
      updateIncomeOnPage();
      firstItemOnPage();
      balColorCheck();
    ">
        Delete
      </button>
    </div>
  </div>`
  } 

    incomeTotalHTML += incomeHTML;
  };
  

  document.getElementById('incomeContainer').innerHTML = incomeTotalHTML;

};

function updateAddBalance() {
  let mainBalance = +JSON.parse(localStorage.getItem(`${username}Main`));
  let incomeAmount = +incomeList[incomeList.length - 1].incomeAmount;

  mainBalance += +incomeAmount;

  localStorage.setItem( `${username}Main`, JSON.stringify(mainBalance));
};

function updateIncomeRecord() {
  let incomeRecords = JSON.stringify(incomeList);
  localStorage.setItem(`${username}Income`, incomeRecords);
};

function updateIncomeOnPage() {
  document.getElementById('bal-sidebar').innerHTML = userCurrency + localStorage.getItem(`${username}Main`);
};


let searchInput = document.getElementById('searchByTitle');


//SEARCH BY TITLE FUNCTION
searchInput.addEventListener('input', (e) => {
  const searchValue = e.target.value.toLowerCase();
  console.log(searchValue);

   //const incomeContainer = document.getElementById('incomeContainer');
    const incomeItem = Array.from(document.querySelectorAll('div.addedIncome'));
    const incomeTitle = document.querySelectorAll('p.incomeTitle');

   // console.log(incomeTitle);

    for (let i = 0; i < incomeTitle.length; i++) {
      let match = incomeTitle[i].innerText.toLowerCase();
      
      let incomeIndex = incomeItem[i];
      console.log(incomeItem[2]);
      
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






//
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

}

function validateAmount(amount) {
  return moneyRegex.test(amount);
}



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


//Filter bar toggle 
function openfNav() {
  
  document.getElementById('overlay').style.display = 'block';
  setTimeout(overlayColorOn, 170);
  document.getElementById("filterSidenav").style.width = "300px";
}

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


//log out of fundTrackr
function logOut(){

  localStorage.removeItem('username');
  localStorage.removeItem('password');
  localStorage.removeItem('firstname');
  localStorage.removeItem('lastname');
  localStorage.removeItem('email');
  window.location.href = "../login/login.html"
};



//FILTER FUNCIONS
function filter() {
  let filterByCategory = document.getElementById('category');
  let filterByTime = document.getElementById('time');

  if (filterByCategory.checked == false && filterByTime.checked == false) {
    noFilter();
  } else
  if (filterByCategory.checked == true && filterByTime.checked == false) {
    categoryFilter();
  }
  else 
  if(filterByCategory.checked == false && filterByTime.checked == true) {
    timeFilter();
  }
  else 
  if (filterByCategory.checked == true && filterByTime.checked == true) {
    jointFilter();
  }
}


//FILTER BY DATE AND MONTH
function timeFilter() {
 const dateList = document.querySelectorAll('.incomeDate');
 const incomeItem = document.querySelectorAll('.addedIncome');
 const matchMonth = document.getElementById('filterMonth').value;
 const matchYear = document.getElementById('filterYear').value;
 

  for(let i = 0; i < dateList.length; i++) {

    let incomeIndex = incomeItem[i];
    let dateItem = dateList[i].innerText;
    let month = dateItem.slice(5, 7);
    let year = dateItem.slice(0, 4);

    if(matchMonth == 'all') {
      if(year == matchYear) {
        incomeIndex.classList.remove('d-none');
        incomeIndex.classList.add('d-flex');
      } 
      else {
        incomeIndex.classList.remove('d-flex');
        incomeIndex.classList.add('d-none');
      }
    }

    if (matchMonth != 'all') {
      if (month == matchMonth && year == matchYear) {
        incomeIndex.classList.remove('d-none');
        incomeIndex.classList.add('d-flex');
      }
      else {
        incomeIndex.classList.remove('d-flex');
        incomeIndex.classList.add('d-none');
      }
    }
    
  }

  closefNav();
}




//FILTER BY CATEGORY
function categoryFilter() {
  let match = document.getElementById('filter-category').value;
  const categoryList = document.querySelectorAll('.incomeCategory');


  const incomeItem = document.querySelectorAll('.addedIncome');

  for (let i = 0; i < incomeItem.length; i++) {

    let categoryIndex = categoryList[i].innerText;
    let incomeIndex = incomeItem[i];
    
    if (match == categoryIndex) {
      incomeIndex.classList.remove('d-none');
      incomeIndex.classList.add('d-flex');
    }
    
    else 
    if (match == 'all') {
      incomeIndex.classList.remove('d-none');
      incomeIndex.classList.add('d-flex');
    }
    else
    if (match != categoryIndex) {
      incomeIndex.classList.remove('d-flex');
      incomeIndex.classList.add('d-none');
    }
    
  }

  closefNav();
}


//filter by Date, month, and category
function jointFilter() {
  //GET THE NODE LIST OF ALL THE INCOME DATES AND CATEGORIES
  const dateList = document.querySelectorAll('.incomeDate');
  const categoryList = document.querySelectorAll('.incomeCategory');

  //the containers of all the income items
  const incomeItem = document.querySelectorAll('.addedIncome');

  //the values of the user - month, year, and category
  const matchMonth = document.getElementById('filterMonth').value;
  const matchYear = document.getElementById('filterYear').value;
  let categoryMatch = document.getElementById('filter-category').value;


  for (let i = 0; i < incomeItem.length; i++) {
    let incomeIndex = incomeItem[i];

    let categoryItem = categoryList[i].innerText;
    let dateItem = dateList[i].innerText;
    let month = dateItem.slice(5, 7);
    let year = dateItem.slice(0, 4);

    if (categoryMatch == 'all') {
      timeFilter();
    }
    else {
      if (matchMonth == 'all') {
        if(year == matchYear && categoryItem == categoryMatch) {
          incomeIndex.classList.remove('d-none');
          incomeIndex.classList.add('d-flex');
        } 
        else {
          incomeIndex.classList.remove('d-flex');
          incomeIndex.classList.add('d-none');
        }
      }
      else
      
      if (month == matchMonth && year == matchYear && categoryItem == categoryMatch) {
        incomeIndex.classList.remove('d-none');
        incomeIndex.classList.add('d-flex');
      }
      else {
        incomeIndex.classList.remove('d-flex');
        incomeIndex.classList.add('d-none');
      }
    }
    
  }

  closefNav();
};


function categoryVisibility() {
  let categoryCheck = document.getElementById('category');
  let filterByCategory = document.getElementById('filterCategory');

  if (categoryCheck.checked == true) {
    filterByCategory.style.display = 'block';
  }
  else {
    filterByCategory.style.display = 'none';
  }

};

function timeVisibility() {
  let timeCheck = document.getElementById('time');
  let filterByTime = document.getElementById('filterTime');

  if (timeCheck.checked == true) {
    filterByTime.style.display = 'flex';
  }
  else {
    filterByTime.style.display = 'none';
  }
};
















///TOASTS AND NOTIFICATONS

function noFilter(){
  const toastLiveExample = document.getElementById('liveToastCategory');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
  
}


function balColorCheck() {
  const balance = JSON.parse(localStorage.getItem(`${username}Main`));

  const balAmount = +balance;
  console.log(balAmount);

  if (balAmount < 0) {
    document.getElementById('bal-sidebar').style.color = 'rgb(255, 49, 39)';
  }
  else {
    document.getElementById('bal-sidebar').style.color = 'rgb(3, 221, 112)';
  }
}