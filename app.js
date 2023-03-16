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
  }
}
setInterval(() => {
  setTotal()
}, 100); // set total every 100 ms

// create function
let productsList;
if (localStorage.product != null) {
  productsList = JSON.parse(localStorage.products);
}else{
  productsList = [];
}

create.addEventListener("click",()=>{
  if (title.value !== "" && total.innerText !== "") {
    let product = {
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
    localStorage.setItem("products",JSON.stringify(productsList));
  }
  // let titleVal = title.value;
  // let priceVal = price.value;
  // let taxesVal = taxes.value;
  // let adsVal = ads.value;
  // let discountVal = discount.value;
  // let totalVal = total.innerText;
  // let countVal = count.value;
  // let categoryVal = category.value;
  // if(titleVal !== "" && totalVal !== "") {
  //   let table = document.getElementById("table");
  //   let tr = document.createElement("tr")
  //   let tdID = document.createElement("td");
  //   tdID.setAttribute("data-label","ID");
  //   tdID.innerText = IDGenerator();
  //   let tdTitle = document.createElement("td");
  //   tdTitle.setAttribute("data-label","TITLE");
  //   tdTitle.innerText = titleVal;
  //   let tdPrice = document.createElement("td");
  //   tdPrice.setAttribute("data-label","PRICE");
  //   tdPrice.innerText = priceVal;
  //   let tdTaxes = document.createElement("td");
  //   tdTaxes.setAttribute("data-label","TAXES");
  //   tdTaxes.innerText = taxesVal;
  //   let tdAds = document.createElement("td");
  //   tdAds.setAttribute("data-label","ADS");
  //   tdAds.innerText = adsVal;
  //   let tdDiscount = document.createElement("td");
  //   tdDiscount.setAttribute("data-label","DISCOUNT");
  //   tdDiscount.innerText = discountVal;
  //   let tdTolal = document.createElement("td");
  //   tdTolal.setAttribute("data-label","TOTAL");
  //   tdTolal.innerText = totalVal;
  //   let tdCategory = document.createElement("td");
  //   tdCategory.setAttribute("data-label","CATEGORY");
  //   tdCategory.innerText = categoryVal;
  //   let tdUpdate = document.createElement("td");
  //   tdUpdate.setAttribute("data-label","UPDATE");
  //   let updateBtn = document.createElement("button");
  //   tdUpdate.append(updateBtn);
  //   updateBtn.classList.add("btn");
  //   updateBtn.innerText = "update"
  //   let tdDelete = document.createElement("td");
  //   tdDelete.setAttribute("data-label","DELETE");
  //   let deleteBtn = document.createElement("button");
  //   tdDelete.append(deleteBtn);
  //   deleteBtn.classList.add("btn");
  //   deleteBtn.innerText = "delete";
  //   tr.append(tdID,tdTitle,tdPrice,tdTaxes,tdAds,tdDiscount,tdTolal,tdCategory,tdUpdate,tdDelete);
  //   if(countVal === "" || parseInt(countVal) === 1) {
  //     table.append(tr);
  //   }else if(countVal !== "" ){
  //   for(let i=0; i<parseInt(countVal) ; i++) {
  //     const clonedTr = tr.cloneNode(true);
  //     table.append(clonedTr);
  //     }
  //   }
  // }
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
