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
    // count
    if (product.Count > 1) {
      for (let i = 0; i < product.Count; i++) {
        productsList.push(product);
      }
    } else if(product.Count == null || product.Count <= 1){
      productsList.push(product);
    }
    // saving the products info in local storage
    localStorage.setItem("products",JSON.stringify(productsList));
    document.querySelector(".alert").style.transform = 'translateY(-30px)'
  }else {
    if (window.innerWidth > 560) {
      document.querySelector(".alert").style.transform = 'translateY(25px)'
    }
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
  totalpro.innerText = productsList.length;
}
setTotalPro()

// displaying the product on the table
function display() {
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
      <td onclick = "update(${i})" data-label="UPDATE"><button class="btn">update</button></td>
      <td onclick = "deletePro(${i})" data-label="DELETE"><button class="btn">delete</button></td>
    </tr>
    `
  }
  document.querySelector("table tbody").innerHTML = row;
}
display()

// click event of the create button
createBtn.addEventListener("click",()=>{
  create();
  display();  // update the table
  setTotalPro();  // update the total
  showDeleteAll()
  showSearch()
  createBtn.innerText = "create"
  if (title.value !== "" && total.innerText !== "") {
    clear();
  }  
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
  // localStorage.setItem("products",JSON.stringify(productsList));
  display();  // update the table
  setTotalPro();
  showDeleteAll()
  showSearch()
}

// function to delete all products
function deleteAllPro() {
  productsList.splice(0);  // remove all products from the productsList array
  localStorage.removeItem("products");  // remove the 'products' key from local storage
  display();  // update the table
  setTotalPro();  // update the total 
  showDeleteAll()
  showSearch()
}

// add a click event listener to the 'deleteAll' button
deleteAll.addEventListener('click', deleteAllPro);

// function to display the 'deleteAll' button
function showDeleteAll() {
  if (productsList.length > 0) {
    deleteAll.style.display = "block"
  }else {
    deleteAll.style.display = "none"
  }
}
showDeleteAll()

// update function
function update(i) {
  title.value = productsList[i].Title;
  price.value = productsList[i].Price;
  taxes.value = productsList[i].Taxes;
  ads.value = productsList[i].Ads;
  discount.value = productsList[i].Discount;
  total.innerText = productsList[i].Total;
  count.value = productsList[i].Count;
  category.value = productsList[i].Category;
  createBtn.innerText = "save";
  title.focus();
  // checks if the ID of each product in productsList is not equal to the ID of the clicked product
  productsList = productsList.filter(product => {
    return product.ID !== productsList[i].ID;  
  });
  display();
  setTotalPro();
  localStorage.setItem("products",JSON.stringify(productsList));   
}

// serch function
function searchPro() {
  let searchMode = document.getElementById('searchBy').value;
  // checks if the ID of each product in productsList is equal to the ID inserted
  if (searchMode === "ID") {
    productsList = productsList.filter(product => {
      return product.ID.toUpperCase() === search.value.toUpperCase().trim();
    });
  }
  // checks if the Title of each product in productsList is equal to the Title inserted
  else if(searchMode === "Title") {
    productsList = productsList.filter(product => {
      return product.Title.toUpperCase() === search.value.toUpperCase().trim();
    });
  }
  // checks if the Category of each product in productsList is equal to the Category inserted
  else if(searchMode === "Category") {
    productsList = productsList.filter(product => {
      return product.Category.toUpperCase() === search.value.toUpperCase().trim();
    });
  }if(search.value === '') {
    return productsList;
  }
  display();  // calling the display function to update the table(we're not updating the productsList array!!!)
}

// enter event for search input
search.addEventListener("keydown", (event) => {
  // check if the "Enter" key was pressed
  if (event.key === "Enter") {
    searchPro();
  }
});

// function to display the 'search' div
function showSearch() {
  if (productsList.length > 0) {
    document.querySelector(".search").style.display = "flex"
    search.style.display = "block"
  }else {
    document.querySelector(".search").style.display = "none"
    search.style.display = "none"
  }
}
showSearch()










// // Assuming you have an array of objects named `data`
// const data = [
//   { name: 'John', age: 25, email: 'john@example.com' },
//   { name: 'Jane', age: 30, email: 'jane@example.com' },
//   { name: 'Bob', age: 40, email: 'bob@example.com' },
// ];

// // Convert the data array to a CSV string
// const csvString = 'data:text/csv;charset=utf-8,' + 
//                   data.map(item => `${item.name},${item.age},${item.email}`).join('\n');

// // Create a Blob object from the CSV string
// const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });

// // Create a download link for the Blob object
// const link = document.createElement('a');
// link.href = URL.createObjectURL(blob);
// link.download = 'data.csv';
// document.body.appendChild(link);

// // Trigger the download link
// link.click();

// // Clean up the URL object after the download has started
// URL.revokeObjectURL(link.href);
// document.body.removeChild(link);
