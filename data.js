// variables
let fullName = document.querySelector("#name");
let passwordInput = document.querySelector("#password");
let submit = document.querySelector("button");
let message = document.querySelector('.message');
let messageOne = document.querySelector('.messageOne');
const password = "BADRM9AWAD";

// getting data from local storage
window.addEventListener("load",()=>{
  if((localStorage.getItem("full_name") !== "")&&(localStorage.getItem("password") !== "")){
    setTimeout(() => {
      // add the data in the input fields
      fullName.value = localStorage.getItem("full_name");
      passwordInput.value = localStorage.getItem("password");
      // click the submit button
      submit.click();
  }, 1000); // Wait for one second before clicking the submit button
  }
})

// user name and password validation
submit.addEventListener("click", ()=> {
  const value = (passwordInput.value).toUpperCase();
  if(value !== ''){
    localStorage.setItem("full_name",fullName.value);
    if( value === password){
      location.pathname = "PMS.html";
      localStorage.setItem("password",password);
    }else{
        let messageText = document.createElement("a");
        let button = document.createElement("button");
        button.appendChild(messageText);
        messageText.innerText = "get password";
        messageText.setAttribute("href","mailto:moslihbadr2@gmail.com");
        message.appendChild(button);
        messageOne.innerText = "It appears that you don't have the unique password. Please click the button below to contact the owner and request your unique password.";
        messageOne.style.display = "block";
    }
  }else{
    fullName.focus();
  }
});
