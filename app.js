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
create.addEventListener("click",()=>{
  let titleVal = title.value;
  let priceVal = price.value;
  let taxesVal = taxes.value;
  let adsVal = ads.value;
  let discountVal = discount.value;
  let totalVal = total.innerText;
  let countVal = count.value;
  let categoryVal = category.value;
  if(titleVal !== "" && totalVal !== "") {
    let auto = 1;
    let table = document.getElementById("table");
    let tr = document.createElement("tr")
    let tdID = document.createElement("td");
    tdID.setAttribute("data-label","ID");
    tdID.innerText = auto;
    let tdTitle = document.createElement("td");
    tdTitle.setAttribute("data-label","TITLE");
    tdTitle.innerText = titleVal;
    let tdPrice = document.createElement("td");
    tdPrice.setAttribute("data-label","PRICE");
    tdPrice.innerText = priceVal;
    let tdTaxes = document.createElement("td");
    tdTaxes.setAttribute("data-label","TAXES");
    tdTaxes.innerText = taxesVal;
    let tdAds = document.createElement("td");
    tdAds.setAttribute("data-label","ADS");
    tdAds.innerText = adsVal;
    let tdDiscount = document.createElement("td");
    tdDiscount.setAttribute("data-label","DISCOUNT");
    tdDiscount.innerText = discountVal;
    let tdTolal = document.createElement("td");
    tdTolal.setAttribute("data-label","TOTAL");
    tdTolal.innerText = totalVal;
    let tdCategory = document.createElement("td");
    tdCategory.setAttribute("data-label","CATEGORY");
    tdCategory.innerText = categoryVal;
    let tdUpdate = document.createElement("td");
    tdUpdate.setAttribute("data-label","UPDATE");
    let tdDelete = document.createElement("td");
    tdDelete.setAttribute("data-label","DELETE");
    tr.append(tdID,tdTitle,tdPrice,tdTaxes,tdAds,tdDiscount,tdTolal,tdCategory,tdUpdate,tdDelete);
    auto++;
    if(countVal === "" || parseInt(countVal) === 1) {
      table.append(tr);
    }else if(countVal !== "" ){
    for(let i=0; i<parseInt(countVal) ; i++) {
      const clonedTr = tr.cloneNode(true);
      // tdID.innerText = i+1
      table.append(clonedTr);
      }
    }
  }
})

