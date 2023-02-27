const fullName = localStorage.getItem("full_name");
let password = localStorage.getItem("password");
let userName = document.getElementById("userName");
// inputs
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.querySelector(".discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let search = document.getElementById("search");
// buttons
let create = document.getElementById("create");
let searchByTitle = document.getElementById("searchByTitle");
let searchByCat = document.getElementById("searchByCat");
let deleteAll = document.getElementById("deleteAll");



// Checking if the user is registered
if((fullName === null ) || (password === null)){
  // if not back to the login page
  window.location = "index.html";
}

// return the first letter of the first and last name 
function setName(fullName){
  const words = fullName.trim().split(' ');
  const firstName = words[0][0];
  let lastName;
if (words.length > 1) {
  lastName = words[1][0];
} else {
  lastName = '';
}
  return `${firstName}${lastName}`;
}

// getting the full name from the local storage and add it into the user name feild
window.addEventListener('load',()=>{
  let name = setName(fullName);
  userName.innerText = name ;
  userName.setAttribute("title",fullName);
})

