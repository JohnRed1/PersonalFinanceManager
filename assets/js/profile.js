//put new user values in editor 

  
let newFirstname = document.getElementById('newFirstname');
let newLastname = document.getElementById('newLastname');
let newUsername = document.getElementById('newUsername');
let newEmail = document.getElementById('newEmail');
let newPassword = document.getElementById('newPassword');

//SET DEFAULT VALUES IN THE INPUT FIELDS IN THE UPDATE FORM. ==== VALUES CAN BE CHANGED !!
newFirstname.value = localStorage.getItem('firstname');
newLastname.value = localStorage.getItem('lastname');
newUsername.value = localStorage.getItem('username');
newEmail.value = localStorage.getItem('email');
newPassword.value = localStorage.getItem('password');

const oldUsername = localStorage.getItem('username');



//declare the username variable and get username from LOCAL STORAGE
let username = localStorage.getItem('username');


//INIIALIZE THE VALUES OF THE PROFILE ACCOUNT CURRENCY AND MAIN BALANCE;
document.getElementById('currency').value = localStorage.getItem(`${username}Currency`);
document.getElementById('mainBal').value = JSON.parse(localStorage.getItem(`${username}Main`));


//find profile details to be EDITED 
function findUserByValue(value) {
  // Retrieve 'users' from local storage and parse it
  
  const usersStr = localStorage.getItem('users');
  if (!usersStr) {
      return null; // 'users' not found in local storage
  }

  const users = JSON.parse(usersStr);

  // Iterate through each user and check for the specified value
  for (let user of users) {
      if (user.username === value) {
          return user; // Return the nested object containing the value
      }
  }
    
};

let profileDetails = findUserByValue(username);


//EMAIL REGULAR EXPRESSION constant=========================================================

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

//MONEY VALIDATION CONSTANT

const  moneyRegex = /^[0-9]+$/;

//PASS THE EMAIL THROUGH THE FUNCTION BELOW TO VERIFY VALIDITY.
function validateEmail(email) {
  return emailRegex.test(email);
}

//  PASS FIGURE HROUGH REGEX TO VALIDATE

function validateAmount(amount) {
  return moneyRegex.test(amount);
}

  //update Profile details function

function updateDetails() {
  
  let newFirstname = document.getElementById('newFirstname').value;
  let newLastname = document.getElementById('newLastname').value;
  let newUsername = document.getElementById('newUsername').value;
  let newEmail = document.getElementById('newEmail').value;
  let newPassword = document.getElementById('newPassword').value;
  let existingUserRecords = JSON.parse(localStorage.getItem("users"));
  let profileDetails = findUserByValue(username);

  validateEmail(newEmail);
  if (newFirstname === "" && newLastname === "" && newUsername === "" && newEmail === "" && newPassword === "") {
    toasty();
    createError('newPassword');
    createError('newEmail');
    createError('newUsername');
    createError('newFirstname');
    createError('newLastname');


    setTimeout(refreshError, 1000, 'newPassword');
    setTimeout(refreshError, 1000, 'newEmail');
    setTimeout(refreshError, 1000, 'newUsername');
    setTimeout(refreshError, 1000, 'newFirstname');
    setTimeout(refreshError, 1000, 'newLastname');  
  } 
  
  else 

  if (newFirstname === "") {
    toasty();
    createError('newFirstname');
    setTimeout(refreshError, 1000, 'newFirstname');
  }
  else

  if (newLastname === "") {
    toasty();
    createError('newLastname');
    setTimeout(refreshError, 1000, 'newLastname');
  }
  else

  if (newEmail === "") {
    toasty();
    createError('newEmail');
    setTimeout(refreshError, 1000, 'newEmail');
  }
  else 

  if (newUsername === "") {
    toasty();
    createError('newUsername');
    setTimeout(refreshError, 1000, 'newUsername');
  }
  else

  if (newPassword === "") {
    toasty();
    createError('newPassword');
    setTimeout(refreshError, 1000, 'newPassword');
  }
  else
   
  if (validateEmail(newEmail) === false) {
    toastyW();
    createError('newEmail');
    setTimeout(refreshError, 1000, 'newEmail');
  }
  else 

  if (newPassword.length < 6) {
    toastless();
    createError('newPassword');
    setTimeout(refreshError, 1000, 'newPassword');
  }
  else 

  if (newUsername.length > 10) {
    toastyU();
    createError('newUsername');
    setTimeout(refreshError, 1000, 'newUsername');
  }
  else

  if(existingUserRecords.some((v)=>{return v.email==newEmail || v.username==newUsername}) && (newFirstname != profileDetails.firstname && newLastname != profileDetails.lastname)) {
    toasti();
    createError('newUsername');
    createError('newEmail');
    setTimeout(refreshError, 1000, 'newUsername');
    setTimeout(refreshError, 1000, 'newEmail'); 

  }
  else 
  {
    for (let i = 0; i < existingUserRecords.length; i++) {
      if (existingUserRecords[i].username === oldUsername ) {
          profileDetails.firstname = newFirstname;
          profileDetails.lastname = newLastname;
          profileDetails.email = newEmail;
          profileDetails.username = newUsername;
          profileDetails.password =newPassword;

          existingUserRecords[i] = profileDetails;
          break;
      }
    };
    let userBalance =  JSON.parse(localStorage.getItem(`${username}Main`));
    let userIncome =  localStorage.getItem(`${username}Income`);
    let userCurrency = localStorage.getItem(`${username}Currency`)
     let userExpenses = localStorage.getItem(`${username}Expenses`);

     localStorage.removeItem(`${username}Main`);
     localStorage.removeItem(`${username}Income`);
     localStorage.removeItem(`${username}Currency`);
     localStorage.removeItem(`${username}Expenses`);

    localStorage.setItem('users', JSON.stringify(existingUserRecords));
    localStorage.setItem("username", newUsername);
    localStorage.setItem("password", newPassword );
    localStorage.setItem("firstname", newFirstname);
    localStorage.setItem("lastname", newLastname);
    localStorage.setItem("email", newEmail);

    localStorage.setItem(`${newUsername}Main`, userBalance);
    localStorage.setItem(`${newUsername}Currency`, userCurrency);
    localStorage.setItem(`${newUsername}Income`, userIncome);
    localStorage.setItem(`${newUsername}Expenses`, userExpenses);
    
    closeAccessDetails();
    document.getElementById('overlay').style.display = 'none';
    toast();
    setTimeout(profileRefresh, 1500);
  }
  
  
}; 



//VERIFY IDENTITY BEFORE DELETING THE USER PROFILE
function verifyDelete() {
  let profileDetailsDelete = findUserByValue(username);
  let confirmDeletePassword = document.getElementById('deleteCheck').value;

  if (profileDetailsDelete.password != confirmDeletePassword) {
    createError('deleteCheck');
    setTimeout(refreshError, 1000, 'deleteCheck'); 
    
  }

  else {
    deleteDetails();
  }
}


//PROFILE REDIRECT FUNCTION
function profileRefresh() {
  window.location.href = 'profile.html';
}


//CLEAR ERROR OUTLINE FUNCTION 
function refreshError(value) {
  let errorOutline = document.getElementById(`${value}`);
  errorOutline.style.outline = "none";
  errorOutline.style.color = "black";
  errorOutline.style.border = "1px solid gray !important";

}

//CREATE RED ERROR FOR FORM ERROR OUTLINE FUNCTION
function createError(value) {
  let errorOutline = document.getElementById(`${value}`);
  errorOutline.style.outline = "1px solid rgb(230, 11, 11)";
  errorOutline.style.color = "rgb(230, 11, 11)";
  errorOutline.style.border = "none !important";
};


//DELETE ACCOUNT FUNCTION
function deleteDetails() {
  let UserRecords = JSON.parse(localStorage.getItem("users"));
  for (let i = 0; i < UserRecords.length; i++) {
    if (UserRecords[i].username === username) {
         delete UserRecords[i];
         UserRecords.splice(i, 1);
        localStorage.removeItem(`${username}Main`);
        localStorage.removeItem(`${username}Income`);
        localStorage.removeItem(`${username}Currency`);
        localStorage.setItem('users', JSON.stringify(UserRecords));
      logOutForever();
      break;
    }  
  }
};


//VERIFY IDENTITY MODAL FUNCTION = SHOW POPUP TO VERIFY IDENTITY BEFORE EDITING DETAILS===================================
function verifyUser() {
  document.getElementById('verifyModal').style.display = 'block';
  let password = localStorage.getItem('password');
  let verifyPassword  = document.getElementById('verifyCheck').value;

  if (password != verifyPassword) {
    document.getElementById('verifyCheck').style.border = '2px solid rgb(230, 11, 11)';
    document.getElementById('verifyCheck').style.color = 'rgb(220, 11, 11)';
    document.getElementById('verifyCheck').style.fontWeight = 'medium';


    setTimeout(clearError, 1000);
  }

  else {
    toggleVerifyOff();
    document.getElementById('verifyCheck').value = '';
    document.getElementById('overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.562)';
    document.getElementById('overlay').style.display = 'block';
    accessDetails();
  };
};


//CLEAR THE RED ERROR OUTLINE ON THE FORM ============= 
function clearError() {
  document.getElementById('verifyCheck').style.border = '1px solid gray';
  document.getElementById('verifyCheck').style.color = 'black';
};


//Profile Details= ========= SUMMON PROFILE DETAILS BOX
function accessDetails() {
  document.getElementById('profileDetails').style.display = 'block';
  document.getElementById('profileDetails').style.opacity = '1';
  
};


//UNSUMMON?? CLOSE PROFILE DETAILS BOX LOL
function closeAccessDetails() {
  document.getElementById('profileDetails').style.opacity = '0';
  document.getElementById('profileDetails').style.display = 'none';
  
  
};

//SUMMON VERIFICATION MODAL FOR EDITING PROFILE
function toggleVerifyOn() {
  document.getElementById('overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.562)';
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('verifyModal').style.transform ='translate(-50%, -50%)';
};

//CLEAR/REMOVE  VERIFICATION MODAL FOR EDITING PROFILE
function toggleVerifyOff() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('verifyModal').style.transform ='translate(-50%, 200%)';
  document.getElementById('overlay').style.backgroundColor = 'transparent';
};

//SUMMON VERIFICATION MODAL FOR DELETING PROFILE
function toggleDeleteOn() {
  document.getElementById('overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.562)';
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('deleteModal').style.transform ='translate(-50%, -50%)';
};

//REMOVE VERIFICATION MODAL FOR DELETING PROFILE
function toggleDeleteOff() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('deleteModal').style.transform ='translate(-50%, 200%)';
  document.getElementById('overlay').style.backgroundColor = 'transparent';
  document.getElementById('deleteCheck').value = '';
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

function logOutForever(){

  localStorage.removeItem('username');
  localStorage.removeItem('password');
  localStorage.removeItem('firstname');
  localStorage.removeItem('lastname');
  localStorage.removeItem('email');
  localStorage.removeItem(`${username}Main`);
  localStorage.removeItem(`${username}Currency`);
  localStorage.removeItem(`${username}Income`);
  localStorage.removeItem(`${username}Expenses`);
  localStorage.removeItem(`${username}Savings`);
  window.location.href = "../login/login.html"
};


function redirect(page) {
  window.location.href = `${page}.html`;
};


function updateCurrency() {
  let currency =  document.getElementById('currency').value;
  let username = localStorage.getItem('username');
  let mainBal = document.getElementById('mainBal').value;
  if (mainBal == '' || mainBal.trim() == '' || validateAmount(mainBal) == false ) {
    createError('mainBal');
    invalidAmounttoast();
    setTimeout(refreshError, 1000, 'mainBal'); 
  } 
  else {
    localStorage.setItem(`${username}Currency`, currency);
    localStorage.setItem(`${username}Main`, mainBal);
    toastPref();

    setTimeout(redirect, 1500, 'profile');
  };
  
}






























/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//All toasts and notificATIONS



//PROFILE UPDATED SUCCESS==================================================================
function toast(){
  const toastTrigger = document.getElementById('liveToastBtn');
  const toastLiveExample = document.getElementById('liveToastPS');

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show()
  }
  
}

function invalidAmounttoast(){
  const toastTrigger = document.getElementById('liveToastPref');
  const toastLiveExample = document.getElementById('liveToastWrong');

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show()
  }
  
}


//FILL OUT ALL FIELDS============================================================
function toasty(){
  const toastTrigger = document.getElementById('liveToastBtn')
  const toastLiveExample = document.getElementById('liveToastP')

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show()
  }
}


//-------------------ACCOUNT PREFRENCES UPDATED SUCCESSFULLY

function toastPref(){
  const toastTrigger = document.getElementById('prefrencesSave');
  const toastLiveExample = document.getElementById('liveToastPref')

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show()
  }
}



//LONG USERNAME===============================================================
function toastyU(){
  const toastTrigger = document.getElementById('liveToastBtn')
  const toastLiveExample = document.getElementById('liveToastU')

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show()
  }
}

//INVALID EMAIL ADDRESS=======================================================

function toastyW(){
  const toastTrigger = document.getElementById('liveToastBtn')
  const toastLiveExample = document.getElementById('liveToastW')

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show()
  }
}

//USERNAME OR EMAIL ALREADY IN USE============================================
function toasti(){
  const toastTrigger = document.getElementById('liveToastBtn')
  const toastLiveExample = document.getElementById('liveToastD')

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show()
  }
}


//PASSWORD TOO SHORT==========================================================
function toastless(){
  const toastTrigger = document.getElementById('liveToastBtn');
  const toastLiveExample = document.getElementById('liveToastE');

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
  }
}