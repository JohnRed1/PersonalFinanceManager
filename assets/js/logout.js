function logOut(){

  localStorage.removeItem('username');
  localStorage.removeItem('password');
  localStorage.removeItem('firstname');
  localStorage.removeItem('lastname');
  localStorage.removeItem('email');
  window.location.href = "../login/login.html"
};