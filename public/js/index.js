
const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");


//validação campo email e senha do login
const isValidEmail = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

const inputPasswordLogin = document.querySelector('input[name="passwordLogin"]')
const inputEmailLogin = document.querySelector('input[name="emailLogin"]')
const inputPasswordCreate = document.querySelector('input[name="passwordCreate"]')
const inputEmailCreate = document.querySelector('input[name="emailCreate"]')
const formLogin = document.querySelector('form[name="form-login"]')
const formCreate = document.querySelector('form[name="create-form"]')

let isValidFormLogin = false
let isValidFormCreate = false


const resetInput = (elem) => {
  elem.classList.remove('invalid')
  elem.nextElementSibling.classList.add('error-hidden')
}

const invalidateElem = (elem) => {
  elem.classList.add('invalid')
  elem.nextElementSibling.classList.remove('error-hidden')
  isValidFormLogin = false
}

const validateInputLogin = () => {
  isValidFormLogin = true
  if(inputPasswordLogin.value.length <= 3){
    invalidateElem(inputPasswordLogin)
  }

  if(!isValidEmail(inputEmailLogin.value)){
    inputEmailLogin.classList.add('invalid')
    inputEmailLogin.nextElementSibling.classList.remove('error-hidden')
    isValidFormLogin = false
  }
}

const validateInputCreate = () => {
  isValidFormCreate = true
  if(inputPasswordCreate.value.length <= 3){
    invalidateElem(inputPasswordCreate)
  }

  if(!isValidEmail(inputEmailCreate.value)){
    inputEmailCreate.classList.add('invalid')
    inputEmailCreate.nextElementSibling.classList.remove('error-hidden')
    isValidFormCreate = false
  }
}

formCreate.addEventListener("submit", (e) => {
  e.preventDefault()
  //validateInputCreate()

  //if(isValidFormCreate){

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("create-password-input").value;

    if(!isValidEmail(inputEmailCreate.value)){
      alert("O e-mail é inválido.");
      return;
    }

    if(password.length < 4){
        alert("A senha deve ter no mínimo 4 digitos.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []

    });

    myModal.hide();

    alert("Conta criada com sucesso!");

  //}

})

formLogin.addEventListener("submit", (e) => {
  e.preventDefault()
  validateInputLogin()

  if(isValidFormLogin){

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const session = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account){
        alert("Opps! Verifique o usuário ou a senha.")
        return;
    }

    if(account){
        if(account.password !== password){
            alert("Opps! Verifique o usuário ou a senha.")
        return;
        }
        
        saveSession(email, session);

        window.location.href = "home.html";

    }
  }
})

inputPasswordLogin.addEventListener('input', () => {
  resetInput(inputPasswordLogin)
})

inputEmailLogin.addEventListener("input", () =>{
  resetInput(inputEmailLogin)
})

inputPasswordCreate.addEventListener('input', () => {
  resetInput(inputPasswordCreate)
})

inputEmailCreate.addEventListener("input", () =>{
  resetInput(inputEmailCreate)
})

checkLogged();

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);

        window.location = "home.html"
    }

}

function saveSession(data, session){
    if(session){
        localStorage.setIte("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function getAccount(key){
    const accont = localStorage.getItem(key);

    if(accont){
        return JSON.parse(accont);
    }

    return "";

}





