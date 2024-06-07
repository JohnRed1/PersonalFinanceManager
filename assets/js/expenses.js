
//toggle Add income modal
function toggleAddExpenseOn() {
  overlayOn();
  document.getElementById('addIncomeModal').style.transform ='translate(-50%, -50%)';
};

function toggleAddExpenseOff() {
  overlayOff();
  document.getElementById('addIncomeModal').style.transform ='translate(-50%, -400%)';
};

function toggleEditExpenseOn() {
  overlayOn();
  document.getElementById('editIncomeModal').style.transform ='translate(-50%, -50%)';
}; 

function toggleEditExpenseOff() {
  overlayOff();
  document.getElementById('editIncomeModal').style.transform ='translate(-50%, -400%)';
};




//GET USERNAME AND INCOME ARRAY FROM LOCAL STORAGE
const username = localStorage.getItem('username');

const expenseList = JSON.parse(localStorage.getItem(`${username}Expenses`)) || [];
renderExpense();

firstItemOnPage();
balColorCheck();

function firstItemOnPage() {
  if (expenseList.length == 0) {
    document.getElementById('firstPrompt').classList.remove('d-none');
    document.getElementById('firstPrompt').classList.add('d-flex');
    document.getElementById('incomeHeader').classList.remove('d-block');
    document.getElementById('incomeHeader').classList.add('d-none');
  }
  else {
    document.getElementById('firstPrompt').classList.remove('d-flex');
    document.getElementById('firstPrompt').classList.add('d-none');
    document.getElementById('incomeHeader').classList.remove('d-none');
    document.getElementById('incomeHeader').classList.add('d-block');
  
  }
};

//ADD income function
function addExpense() {

  let expenseName  = document.getElementById('incomeName').value;
  let expenseDate = document.getElementById('incomeDate').value;
  let expenseAmount = document.getElementById('incomeAmount').value;
  let expenseCategory = document.getElementById('incomeCategory').value;


  if (expenseName == '' || expenseName.trim() == '') {
    createError('incomeName');

    setTimeout(refreshError, 1000, 'incomeName'); 
  } 
  else 
  if (expenseDate == '' || expenseDate.trim() == '') {
    createError('incomeDate');

    setTimeout(refreshError, 1000, 'incomeDate'); 
  }
  else
  if (expenseAmount == '' || expenseAmount.trim() == '' || validateAmount(expenseAmount) == false) {
    createError('incomeAmount');

    setTimeout(refreshError, 1000, 'incomeAmount'); 
  }
  else
  {
    expenseList.push({
      expenseName,
      expenseDate,
      expenseAmount,
      expenseCategory
    });

      

    //update the user's income array in localStorage
    updateExpenseRecord();

    //update user account balance
    updateSubtractBalance();


    //render the income on the page;
    renderExpense();

      
    //clear all the previous values in the income fields
    clearAddExpenseFields();
      
    balColorCheck();
      //clear modal
      toggleAddExpenseOff();
      updateExpenseOnPage();
  }
};


function clearAddExpenseFields() {
  document.getElementById('incomeName').value = '';
      document.getElementById('incomeDate').value = '';
      document.getElementById('incomeAmount').value = '';
      document.getElementById('incomeCategory').value = '';
}

function clearEditExpenseFields() {
  document.getElementById('editIncomeName').value = '';
      document.getElementById('editIncomeDate').value = '';
      document.getElementById('editIncomeAmount').value = '';
      document.getElementById('editIncomeCategory').value = '';
};

function editExpense() {
  let newExpenseName = document.getElementById('editIncomeName').value;
  let newExpenseDate = document.getElementById('editIncomeDate').value;  
  let newExpenseAmount = document.getElementById('editIncomeAmount').value; 
  let newExpenseCategory = document.getElementById('editIncomeCategory').value; 

  let index = localStorage.getItem('index');

  if (newExpenseName == '' || newExpenseName.trim() == '') {
    createError('editIncomeName');

    setTimeout(refreshError, 1000, 'editIncomeName'); 
  } 
  else 
  if (newExpenseDate == '' || newExpenseDate.trim() == '') {
    createError('editIncomeDate');

    setTimeout(refreshError, 1000, 'editIncomeDate'); 
  }
  else
  if (newExpenseAmount == '' || newExpenseAmount.trim() == '' || validateAmount(newExpenseAmount) == false) {
    createError('editIncomeAmount');

    setTimeout(refreshError, 1000, 'editIncomeAmount'); 
  }
  else {
    let userBalance = localStorage.getItem(`${username}Main`);
    let oldAmount = expenseList[index].expenseAmount;

    let newAmount = newExpenseAmount;

    let result = (+userBalance + +oldAmount) - +newAmount;

    localStorage.setItem(`${username}Main`, result);

    //remove index from local storage
    localStorage.removeItem('index');

    expenseList[index].expenseName = newExpenseName;
    expenseList[index].expenseDate = newExpenseDate;
    expenseList[index].expenseCategory = newExpenseCategory;
    expenseList[index].expenseAmount = newExpenseAmount;

    renderExpense();
    clearEditExpenseFields();
    
    updateExpenseRecord();
    //updateIncomeOnPage();
    updateExpenseOnPage();

    balColorCheck();

    toggleEditExpenseOff();

    
  }

  
};


function renderExpense() {
  let expenseTotalHTML = '';
  let userCurrency = localStorage.getItem(`${username}Currency`);

  for (let i = 0; i < expenseList.length; i++) {
    const expenseObject = expenseList[i];

    let expenseName = expenseObject.expenseName;
    let expenseDate = expenseObject.expenseDate;
    let expenseAmount = expenseObject.expenseAmount;
    let expenseCategory = expenseObject.expenseCategory;


    let expenseHTML = ``;
    if (expenseCategory == 'Rent') {
       expenseHTML = `
      <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
      <div style=" flex: 1; text-align: start;"><p class="expenseTitle">${expenseName}</p></div>
      <div style=" flex: 1.5; text-align: center;"><p class="expenseDate">${expenseDate}</p></div>
      <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${expenseAmount}</p></div>
      <div style=" flex: 1.5; text-align: center;"><p class="salary expenseCategory">${expenseCategory}</p></div>
      <div style=" flex: 1; text-align: center;">
      <button class=" btn btn-success" onclick="
      toggleEditExpenseOn();
      document.getElementById('editIncomeName').value = '${expenseName}';
      document.getElementById('editIncomeDate').value = '${expenseDate}';
      document.getElementById('editIncomeAmount').value = '${expenseAmount}';
      document.getElementById('editIncomeCategory').value = '${expenseCategory}';

      localStorage.setItem('index', ${i});
      
      
      ">
          Edit
        </button>
        <button class="btn btn-danger" onclick="
        let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

         let expenseBeforeSplice = 0;
         let expenseAfterSplice = 0;

        for (let i = 0; i < expenseList.length; i++) {
          let currentIndex = expenseList[i];
          expenseBeforeSplice += +currentIndex.expenseAmount; 
        };

         expenseList.splice(${i}, 1);

        for (let i = 0; i < expenseList.length; i++) {
          let currentIndex = expenseList[i];
          expenseAfterSplice += +currentIndex.expenseAmount; 
        };

        let deleteAmount =   expenseBeforeSplice - expenseAfterSplice;
         let result = +userBalance + +deleteAmount;

         localStorage.setItem('${username}Main', result);

         renderExpense();
         updateExpenseRecord();
         updateExpenseOnPage();
         firstItemOnPage();
         balColorCheck();
        ">
          Delete
        </button>
      </div>
    </div>`
    } else

    if (expenseCategory == 'Subscription') {
       expenseHTML = `
       <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
       <div style=" flex: 1; text-align: start;"><p class="expenseTitle">${expenseName}</p></div>
       <div style=" flex: 1.5; text-align: center;"><p class="expenseDate">${expenseDate}</p></div>
       <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${expenseAmount}</p></div>
       <div style=" flex: 1.5; text-align: center;"><p class="wages expenseCategory">${expenseCategory}</p></div>
       <div style=" flex: 1; text-align: center;">
       <button class=" btn btn-success" onclick="
       toggleEditExpenseOn();
       document.getElementById('editIncomeName').value = '${expenseName}';
       document.getElementById('editIncomeDate').value = '${expenseDate}';
       document.getElementById('editIncomeAmount').value = '${expenseAmount}';
       document.getElementById('editIncomeCategory').value = '${expenseCategory}';
 
       localStorage.setItem('index', ${i});
       ">
          Edit
        </button>
         <button class="btn btn-danger" onclick="
         let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

        let expenseBeforeSplice = 0;
        let expenseAfterSplice = 0;

        for (let i = 0; i < expenseList.length; i++) {
          let currentIndex = expenseList[i];
          expenseBeforeSplice += +currentIndex.expenseAmount; 
        }

        expenseList.splice(${i}, 1);

        for (let i = 0; i < expenseList.length; i++) {
          let currentIndex = expenseList[i];
          expenseAfterSplice += +currentIndex.expenseAmount; 
        };

        let deleteAmount =   expenseBeforeSplice - expenseAfterSplice;

        let result = +userBalance + +deleteAmount;

        localStorage.setItem('${username}Main', JSON.stringify(result));

        renderExpense();
        updateExpenseRecord();
        updateExpenseOnPage();
        firstItemOnPage();
        balColorCheck();
       ">
           Delete
         </button>
       </div>
     </div>`
    } else

    if (expenseCategory == 'LoanRepayment') {
       expenseHTML = `
       <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
       <div style=" flex: 1; text-align: start;"><p class="expenseTitle">${expenseName}</p></div>
       <div style=" flex: 1.5; text-align: center;"><p class="expenseDate">${expenseDate}</p></div>
       <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${expenseAmount}</p></div>
       <div style=" flex: 1.5; text-align: center;"><p class="paycheck expenseCategory">Loan Repayment</p></div>
       <div style=" flex: 1; text-align: center;">
       <button class=" btn btn-success" onclick="
       toggleEditExpenseOn();
       document.getElementById('editIncomeName').value = '${expenseName}';
       document.getElementById('editIncomeDate').value = '${expenseDate}';
       document.getElementById('editIncomeAmount').value = '${expenseAmount}';
       document.getElementById('editIncomeCategory').value = '${expenseCategory}';
 
       localStorage.setItem('index', ${i});
       ">
          Edit
        </button>
         <button class="btn btn-danger" onclick="
         let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

        let expenseBeforeSplice = 0;
        let expenseAfterSplice = 0;

        for (let i = 0; i < expenseList.length; i++) {
          let currentIndex = expenseList[i];
          expenseBeforeSplice += +currentIndex.expenseAmount; 
        }

        expenseList.splice(${i}, 1);

        for (let i = 0; i < expenseList.length; i++) {
          let currentIndex = expenseList[i];
          expenseAfterSplice += +currentIndex.expenseAmount; 
        };

        let deleteAmount =   expenseBeforeSplice - expenseAfterSplice;

        let result = +userBalance + +deleteAmount;

        localStorage.setItem('${username}Main', JSON.stringify(result));

        renderExpense();
        updateExpenseRecord();
        updateExpenseOnPage();
        firstItemOnPage();
        balColorCheck();
       ">
           Delete
         </button>
       </div>
     </div>`
    } else

    if (expenseCategory == 'Bills') {
      expenseHTML = `
      <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
      <div style=" flex: 1; text-align: start;"><p class="expenseTitle">${expenseName}</p></div>
      <div style=" flex: 1.5; text-align: center;"><p class="expenseDate">${expenseDate}</p></div>
      <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${expenseAmount}</p></div>
      <div style=" flex: 1.5; text-align: center;"><p class="gift expenseCategory">${expenseCategory}</p></div>
      <div style=" flex: 1; text-align: center;">
        <button class=" btn btn-success" onclick="
        toggleEditExpenseOn();
        document.getElementById('editIncomeName').value = '${expenseName}';
        document.getElementById('editIncomeDate').value = '${expenseDate}';
        document.getElementById('editIncomeAmount').value = '${expenseAmount}';
        document.getElementById('editIncomeCategory').value = '${expenseCategory}';
  
        localStorage.setItem('index', ${i});
        ">
          Edit
        </button>
        <button class="btn btn-danger" onclick="
        let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

        let expenseBeforeSplice = 0;
        let expenseAfterSplice = 0;

        for (let i = 0; i < expenseList.length; i++) {
          let currentIndex = expenseList[i];
          expenseBeforeSplice += +currentIndex.expenseAmount; 
        }

        expenseList.splice(${i}, 1);

        for (let i = 0; i < expenseList.length; i++) {
          let currentIndex = expenseList[i];
          expenseAfterSplice += +currentIndex.expenseAmount; 
        };

        let deleteAmount =   expenseBeforeSplice - expenseAfterSplice;

        let result = +userBalance + +deleteAmount;

        localStorage.setItem('${username}Main', JSON.stringify(result));

        renderExpense();
        updateExpenseRecord();
        updateExpenseOnPage();
        firstItemOnPage();
        balColorCheck();
      ">
          Delete
        </button>
        
      </div>
    </div>`
   } else 

   if (expenseCategory == 'Purchases') {
    expenseHTML = `
    <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
    <div style=" flex: 1; text-align: start;"><p class="expenseTitle">${expenseName}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="expenseDate">${expenseDate}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${expenseAmount}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="interest expenseCategory">${expenseCategory}</p></div>
    <div style=" flex: 1; text-align: center;">
    <button class=" btn btn-success" onclick="
    toggleEditExpenseOn();
    document.getElementById('editIncomeName').value = '${expenseName}';
    document.getElementById('editIncomeDate').value = '${expenseDate}';
    document.getElementById('editIncomeAmount').value = '${expenseAmount}';
    document.getElementById('editIncomeCategory').value = '${expenseCategory}';

    localStorage.setItem('index', ${i});
    ">
          Edit
        </button>
      <button class="btn btn-danger" onclick="
      let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

      let expenseBeforeSplice = 0;
      let expenseAfterSplice = 0;

      for (let i = 0; i < expenseList.length; i++) {
        let currentIndex = expenseList[i];
        expenseBeforeSplice += +currentIndex.expenseAmount; 
      }

      expenseList.splice(${i}, 1);

      for (let i = 0; i < expenseList.length; i++) {
        let currentIndex = expenseList[i];
        expenseAfterSplice += +currentIndex.expenseAmount; 
      };

      let deleteAmount =   expenseBeforeSplice - expenseAfterSplice;

      let result = +userBalance + +deleteAmount;

      localStorage.setItem('${username}Main', JSON.stringify(result));

      renderExpense();
      updateExpenseRecord();
      updateExpenseOnPage();
      firstItemOnPage();
      balColorCheck();
    ">
        Delete
      </button>
    </div>
  </div>`
 } else 

  if (expenseCategory == 'Fees') {
    expenseHTML = `
    <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
    <div style=" flex: 1; text-align: start;"><p class="expenseTitle">${expenseName}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="expenseDate">${expenseDate}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${expenseAmount}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="sales expenseCategory">${expenseCategory}</p></div>
    <div style=" flex: 1; text-align: center;">
    <button class=" btn btn-success" onclick="
    toggleEditExpenseOn();
    document.getElementById('editIncomeName').value = '${expenseName}';
    document.getElementById('editIncomeDate').value = '${expenseDate}';
    document.getElementById('editIncomeAmount').value = '${expenseAmount}';
    document.getElementById('editIncomeCategory').value = '${expenseCategory}';

    localStorage.setItem('index', ${i});
    ">
          Edit
        </button>
      <button class="btn btn-danger" onclick="
      let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

      let expenseBeforeSplice = 0;
      let expenseAfterSplice = 0;

      for (let i = 0; i < expenseList.length; i++) {
        let currentIndex = expenseList[i];
        expenseBeforeSplice += +currentIndex.expenseAmount; 
      }

      expenseList.splice(${i}, 1);

      for (let i = 0; i < expenseList.length; i++) {
        let currentIndex = expenseList[i];
        expenseAfterSplice += +currentIndex.expenseAmount; 
      };

      let deleteAmount =   expenseBeforeSplice - expenseAfterSplice;

      let result = +userBalance + +deleteAmount;

      localStorage.setItem('${username}Main', JSON.stringify(result));

      renderExpense();
      updateExpenseRecord();
      updateExpenseOnPage();
      firstItemOnPage();
      balColorCheck();
    ">
        Delete
      </button>
    </div>
  </div>`
  } else

  if (expenseCategory == 'Leisure') {
    expenseHTML = `
    <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
    <div style=" flex: 1; text-align: start;"><p class="expenseTitle">${expenseName}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="expenseDate">${expenseDate}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${expenseAmount}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="investmentReturns expenseCategory">${expenseCategory}</p></div>
    <div style=" flex: 1; text-align: center;">
    <button class=" btn btn-success" onclick="
    toggleEditExpenseOn();
    document.getElementById('editIncomeName').value = '${expenseName}';
    document.getElementById('editIncomeDate').value = '${expenseDate}';
    document.getElementById('editIncomeAmount').value = '${expenseAmount}';
    document.getElementById('editIncomeCategory').value = '${expenseCategory}';

    localStorage.setItem('index', ${i});
    ">
          Edit
        </button>
      <button class="btn btn-danger" onclick="
      let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

      let expenseBeforeSplice = 0;
      let expenseAfterSplice = 0;

      for (let i = 0; i < expenseList.length; i++) {
        let currentIndex = expenseList[i];
        expenseBeforeSplice += +currentIndex.expenseAmount; 
      }

      expenseList.splice(${i}, 1);

      for (let i = 0; i < expenseList.length; i++) {
        let currentIndex = expenseList[i];
        expenseAfterSplice += +currentIndex.expenseAmount; 
      };

      let deleteAmount =   expenseBeforeSplice - expenseAfterSplice;

      let result = +userBalance + +deleteAmount;

      localStorage.setItem('${username}Main', JSON.stringify(result));

      renderExpense();
      updateExpenseRecord();
      updateExpenseOnPage();
      firstItemOnPage();
      balColorCheck();
    ">
        Delete
      </button>
    </div>
  </div>`
 } else 

  if (expenseCategory == 'Royalties') {
    expenseHTML = `
    <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
    <div style=" flex: 1; text-align: start;"><p class="expenseTitle">${expenseName}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="expenseDate">${expenseDate}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${expenseAmount}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="royalties expenseCategory">${expenseCategory}</p></div>
    <div style=" flex: 1; text-align: center;">
    <button class=" btn btn-success" onclick="
    toggleEditExpenseOn();
    document.getElementById('editIncomeName').value = '${expenseName}';
    document.getElementById('editIncomeDate').value = '${expenseDate}';
    document.getElementById('editIncomeAmount').value = '${expenseAmount}';
    document.getElementById('editIncomeCategory').value = '${expenseCategory}';

    localStorage.setItem('index', ${i});
    ">
          Edit
        </button>
      <button class="btn btn-danger" onclick="
      let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

      let expenseBeforeSplice = 0;
      let expenseAfterSplice = 0;

      for (let i = 0; i < expenseList.length; i++) {
        let currentIndex = expenseList[i];
        expenseBeforeSplice += +currentIndex.expenseAmount; 
      }

      expenseList.splice(${i}, 1);

      for (let i = 0; i < expenseList.length; i++) {
        let currentIndex = expenseList[i];
        expenseAfterSplice += +currentIndex.expenseAmount; 
      };

      let deleteAmount =   expenseBeforeSplice - expenseAfterSplice;

      let result = +userBalance + +deleteAmount;

      localStorage.setItem('${username}Main', JSON.stringify(result));

      renderExpense();
      updateExpenseRecord();
      updateExpenseOnPage();
      firstItemOnPage();
      balColorCheck();
    ">
        Delete
      </button>
    </div>
  </div>`
  } else  {
    expenseHTML = `
    <div class="w-100 p-3 rounded-3 addedIncome d-flex justify-content-between align-items-center mb-3">
    <div style=" flex: 1; text-align: start;"><p class="expenseTitle">${expenseName}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="expenseDate">${expenseDate}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="money">${userCurrency} ${expenseAmount}</p></div>
    <div style=" flex: 1.5; text-align: center;"><p class="other expenseCategory">${expenseCategory}</p></div>
    <div style=" flex: 1; text-align: center;">
    <button class=" btn btn-success" onclick="
    toggleEditExpenseOn();
    document.getElementById('editIncomeName').value = '${expenseName}';
    document.getElementById('editIncomeDate').value = '${expenseDate}';
    document.getElementById('editIncomeAmount').value = '${expenseAmount}';
    document.getElementById('editIncomeCategory').value = '${expenseCategory}';

    localStorage.setItem('index', ${i});
    ">
          Edit
        </button>
      <button class="btn btn-danger" onclick="
      let userBalance = JSON.parse(localStorage.getItem('${username}Main'));

      let expenseBeforeSplice = 0;
      let expenseAfterSplice = 0;

      for (let i = 0; i < expenseList.length; i++) {
        let currentIndex = expenseList[i];
        expenseBeforeSplice += +currentIndex.expenseAmount; 
      }

      expenseList.splice(${i}, 1);

      for (let i = 0; i < expenseList.length; i++) {
        let currentIndex = expenseList[i];
        expenseAfterSplice += +currentIndex.expenseAmount; 
      };

      let deleteAmount =  expenseBeforeSplice - expenseAfterSplice;

      let result = +userBalance + +deleteAmount;

      localStorage.setItem('${username}Main', JSON.stringify(result));

      renderExpense();
      updateExpenseRecord();
      updateExpenseOnPage();
      firstItemOnPage();
      balColorCheck();
    ">
        Delete
      </button>
    </div>
  </div>`
  } 

    expenseTotalHTML += expenseHTML;
  };
  

  document.getElementById('expenseContainer').innerHTML = expenseTotalHTML;

};



function updateSubtractBalance() {
  let mainBalance = +JSON.parse(localStorage.getItem(`${username}Main`));
  let expenseAmount = +expenseList[expenseList.length - 1].expenseAmount;

  mainBalance -= +expenseAmount;

  localStorage.setItem( `${username}Main`, JSON.stringify(mainBalance));
};


//UPDATE USER EXPENSES IN LOCAL STORAGE
function updateExpenseRecord() {
  let expenseRecords = JSON.stringify(expenseList);
  localStorage.setItem(`${username}Expenses`, expenseRecords);
};


//UPDATE USER MAIN BALANCE ON PAGE
function updateExpenseOnPage() {
  document.getElementById('bal-sidebar').innerHTML = userCurrency + localStorage.getItem(`${username}Main`);
};


let searchInput = document.getElementById('searchByTitle');


//SEARCH BY TITLE FUNCTION
searchInput.addEventListener('input', (e) => {
  const searchValue = e.target.value.toLowerCase();

   //const incomeContainer = document.getElementById('incomeContainer');
    const expenseItem = Array.from(document.querySelectorAll('div.addedIncome'));
    const expenseTitle = document.querySelectorAll('p.expenseTitle');

   // console.log(incomeTitle);

    for (let i = 0; i < expenseTitle.length; i++) {
      let match = expenseTitle[i].innerText.toLowerCase();
      
      let expenseIndex = expenseItem[i];
      //console.log(expenseItem[2]);
      
      if (match.includes(searchValue)) {
        expenseIndex.classList.remove('d-none');
        expenseIndex.classList.add('d-flex');
      }
      else {
        expenseIndex.classList.remove('d-flex');
        expenseIndex.classList.add('d-none');
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
 const dateList = document.querySelectorAll('.expenseDate');
 const expenseItem = document.querySelectorAll('.addedIncome');
 const matchMonth = document.getElementById('filterMonth').value;
 const matchYear = document.getElementById('filterYear').value;
 

  for(let i = 0; i < dateList.length; i++) {

    let expenseIndex = expenseItem[i];
    let dateItem = dateList[i].innerText;
    let month = dateItem.slice(5, 7);
    let year = dateItem.slice(0, 4);

    if(matchMonth == 'all') {
      if(year == matchYear) {
        expenseIndex.classList.remove('d-none');
        expenseIndex.classList.add('d-flex');
      } 
      else {
        expenseIndex.classList.remove('d-flex');
        expenseIndex.classList.add('d-none');
      }
    }

    if (matchMonth != 'all') {
      if (month == matchMonth && year == matchYear) {
        expenseIndex.classList.remove('d-none');
        expenseIndex.classList.add('d-flex');
      }
      else {
        expenseIndex.classList.remove('d-flex');
        expenseIndex.classList.add('d-none');
      }
    }
    
  }

  closefNav();
}




//FILTER BY CATEGORY
function categoryFilter() {
  let match = document.getElementById('filter-category').value;
  const categoryList = document.querySelectorAll('.expenseCategory');


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
  const dateList = document.querySelectorAll('.expenseDate');
  const categoryList = document.querySelectorAll('.expenseCategory');

  //the containers of all the income items
  const expenseItem = document.querySelectorAll('.addedIncome');

  //the values of the user - month, year, and category
  const matchMonth = document.getElementById('filterMonth').value;
  const matchYear = document.getElementById('filterYear').value;
  let categoryMatch = document.getElementById('filter-category').value;


  for (let i = 0; i < expenseItem.length; i++) {
    let expenseIndex = expenseItem[i];

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
          expenseIndex.classList.remove('d-none');
          expenseIndex.classList.add('d-flex');
        } 
        else {
          expenseIndex.classList.remove('d-flex');
          expenseIndex.classList.add('d-none');
        }
      }
      else
      
      if (month == matchMonth && year == matchYear && categoryItem == categoryMatch) {
        expenseIndex.classList.remove('d-none');
        expenseIndex.classList.add('d-flex');
      }
      else {
        expenseIndex.classList.remove('d-flex');
        expenseIndex.classList.add('d-none');
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

function balColorCheck() {
  const balance = JSON.parse(localStorage.getItem(`${username}Main`));

  const balAmount = +balance;
  console.log(balAmount);

  if (balAmount < 0) {
    document.getElementById('bal-sidebar').style.color = 'rgb(255, 51, 39)';
  }
  else {
    document.getElementById('bal-sidebar').style.color = 'rgb(3, 221, 112)';
  }
}











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
    document.getElementById('bal-sidebar').style.color = 'rgb(255, 50, 39)';
  }
  else {
    document.getElementById('bal-sidebar').style.color = 'rgb(3, 221, 112)';
  }
};