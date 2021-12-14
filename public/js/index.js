
const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();
//LOGAR


document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

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

});

//CRIAR CONTA

document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("create-password-input").value;

    if(email.length < 5) {
        alert("Preencha o campo com o e-mail válido!");
        return;
    }

    if(password.length < 4){
        alert("Preencha a senha com no mínimo 4 digitos");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []

    });

    myModal.hide();

    alert("Conta criada com sucesso!");

});

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





