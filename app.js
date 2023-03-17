//variables
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
let createBtn = document.getElementById("create");
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
  let fname = fullName.toUpperCase()
  userName.setAttribute("title",fname);
});

// total function
function setTotal(){
  if(price.value !== "" && taxes.value !== ""){
    let totalPrice = parseFloat(price.value) + parseFloat(taxes.value)
    total.innerText = totalPrice
    document.querySelector(".price p").style.backgroundColor = "green"
    if(ads.value !== ""){
      totalPrice += parseFloat(ads.value)
      total.innerText = totalPrice
    }
    if(discount.value !== ""){
      totalPrice -= parseFloat(discount.value)
      total.innerText = totalPrice
    }
  }else {
    document.querySelector(".price p").style.backgroundColor = "#d61c22"
  }
}
setInterval(() => {
  setTotal()
}, 100); // set total every 100 ms

// create function
let productsList;
if (localStorage.products != null) {
  productsList = JSON.parse(localStorage.products);
}else{
  productsList = [];
}
function create() {
  if (title.value !== "" && total.innerText !== "") {
    let product = {
      ID:IDGenerator(),
      Title:title.value,
      Price:price.value,
      Taxes:taxes.value,
      Ads:ads.value,
      Discount:discount.value,
      Total:total.innerText,
      Count:count.value,
      Category:category.value
    };
    productsList.push(product);
    //saving the products info to the local storage
    localStorage.setItem("products",JSON.stringify(productsList));
  }
}

// clear all inputs
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerText = "";
  count.value = "";
  category.value = "";
  title.focus();
}

// total products
function setTotalPro() {
  let totalpro = document.querySelector('#totalPro')
  totalpro.innerText = productsList.length
}
setTotalPro()

// displaying the product on the table
function display() {
  let tbody = document.querySelector("table tbody");
  let row = "";
  for (let i = 0; i < productsList.length; i++) {
    row += `
    <tr>
      <td data-label="ID">${productsList[i].ID}</td>
      <td data-label="TITLE">${productsList[i].Title}</td> 
      <td data-label="PRICE">${productsList[i].Price}</td>
      <td data-label="TAXES">${productsList[i].Taxes}</td>
      <td data-label="ADS">${productsList[i].Ads}</td>
      <td data-label="DISCOUNT">${productsList[i].Discount}</td>
      <td data-label="TOTAL">${productsList[i].Total}</td>
      <td data-label="CATEGORY">${productsList[i].Category}</td>
      <td data-label="UPDATE"><button class="btn">update</button></td>
      <td onclick = "deletePro(${i})" data-label="DELETE"><button class="btn">delete</button></td>
    </tr>
    `
    tbody.innerHTML = row;
  }
}
display()

// click event of the create button
createBtn.addEventListener("click",()=>{
  create();
  clear();
  display();
  setTotalPro();
})



// ID generator function
function IDGenerator(){
  let numberPart = Math.floor(Math.random() * 900) + 100; // return a random number between 100 and 999
  let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let strPart = '';
  for (let i = 0; i < 3; i++) {
    strPart += letters.charAt(Math.floor(Math.random() * letters.length)); // return a random string of three letters
  }
  let ID = strPart + numberPart;  // there are 3,814,040,000,000 potential combinations
  if( !(listID.includes(ID)) ){
    listID.push(ID);
    return ID
  }
}
let listID = [];

// delete product
function deletePro(i) {
  productsList.splice(i,1);
  display();
  localStorage.setItem("products",JSON.stringify(productsList));
  setTotalPro();
}

