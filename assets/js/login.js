
//LOGIN SUCCESS==================================================================
function toast(){
    const toastTrigger = document.getElementById('liveToastBtn');
    const toastLiveExample = document.getElementById('liveToast');
  
    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastBootstrap.show()
    }
  
    const myToastEl = document.getElementById('liveToast')
      myToastEl.addEventListener('hidden.bs.toast', () => {
        window.location.href = '../login/login.html'
    })
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
  
  //PASSWORDS DO NOT MATCH=======================================================
  function toastyy(){
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToastC')
    let passwordOutline = document.getElementById("password");
    let cPasswordOutline = document.getElementById("cpassword");
  
    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastBootstrap.show()
      passwordOutline.style.outline = "red 1px solid";
      cPasswordOutline.style.outline = "red 1px solid";
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
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToastE')
    let passwordOutline = document.getElementById("password");
  
    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastBootstrap.show()
      passwordOutline.style.outline = "red 1px solid";
    }
  }


  //emailregex constant=========================================================

  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;


//REGULAR EXPRESSION EMAIL======================================================
function validateEmail(email) {
  return emailRegex.test(email);
}


//INVALID EMAIL HIGHLIGHT=======================================================
function invalidMail() {
  let emailOutline = document.getElementById("email");
  emailOutline.style.outline = "red 1px solid";
  document.getElementById("check").style.display = "none";
}

//CLEAR STYLES FOR INVALID EMAIL================================================
function refreshMail() {
  let emailOutline = document.getElementById("email");
  emailOutline.style.outline = "none";
}

//CLEAR STYLES FOR INVALID PASSWORD=============================================
function refreshPassword() {
  let passwordOutline = document.getElementById("password");
  passwordOutline.style.outline = "none";
}

//CLEAR STYLES FOR WHEN PASSWORDS DO NOT MATCH==================================
function refreshCoPassword() {
  let cPasswordOutline = document.getElementById("cpassword");
  let passwordOutline = document.getElementById("password");
  cPasswordOutline.style.outline = "none";
  passwordOutline.style.outline = "none";
}


//SAVE DATA FUNCTION============================================================
function saveData(){
  //variable-declaration and storage
    let firstname, lastname, email, password, confirmPassword, userName;
    firstname = document.getElementById('firstname').value;
    lastname = document.getElementById('lastname').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    confirmPassword = document.getElementById('cpassword').value;
    userName= document.getElementById('username').value;
  
    let user_records = [];
    user_records = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[];

    
    validateEmail(email);
    if(firstname == "" || lastname == "" || email == "" || password == "" || confirmPassword == "" || userName == "" ){
      toasty();
    }
    else if (validateEmail(email) == false) {
        setTimeout(invalidMail, 0);
        toastyW();

        setTimeout(refreshMail, 1000);
    }
    else if(password.length < 6 ) {
      setTimeout(toastless, 0);

      setTimeout(refreshPassword, 1000);
    } 
    else if (userName.length > 10) {
      toastyU();
    }
    else if (password != confirmPassword){
      setTimeout(toastyy, 0);
      setTimeout(refreshCoPassword, 1000);
    }
    else if(user_records.some((v)=>{
        return v.email==email || v.username==userName
    })){
      toasti();
    }
    else{
        toast();
      user_records.push({
        "firstname":firstname,
        "lastname": lastname,
        "username":userName,
        "email": email,
        "password": password
      })
      localStorage.setItem("users",JSON.stringify(user_records));
    }
  }
 
 
 
 
