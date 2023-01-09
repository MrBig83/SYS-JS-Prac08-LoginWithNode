// ----- Set variables ----- //
let inputUsername,
    inputPassword,
    logInBtn,
    errorCode,
    userList,
    tempUserList,
    user,
    pWelcome,
    loggedInUser,
    loginForm,
    logoutBtn,
    errormsg,
    btnCreateAccount;
    
    inputUsername = document.querySelector("#inputUsername");
    inputPassword = document.querySelector("#inputPassword");
    const pBadCred = document.getElementById("badCred");


anyoneHome();
login();
createAccount();

// ----- FUNCTIONS BELOW THIS POINT ----- //

async function getUserList(){
    let getData = await fetch("http://localhost:3000/users");
    let defUserList = await getData.json()
    

    return defUserList;
}

async function login(){
    let defUserList = await getUserList();
    console.log(defUserList);
    logInBtn = document.querySelector("#logInBtn"); 
    logInBtn.addEventListener("click", function() {
        
        let obj = defUserList.find(o => o.userName === inputUsername.value)
            if(obj != undefined){
                for (let x of defUserList) {
                if(inputUsername.value === x.userName && inputPassword.value === x.passWord){
                    logInUser(inputUsername.value);
                return  
                } 
                }; 
                felmeddelande("Felaktigt användarnamn eller lösenord. Försök igen.");
            } else {
                felmeddelande("Användarnamnet finns inte. Försök igen.")
            }
    });
    createAccountBtn = document.querySelector("#createAccountBtn");
    createAccountBtn.addEventListener("click", function() {
        showCreateAccount()
    })
};
function showLogout(){
    logoutBtn = document.querySelector("#logoutBtn");
    loginForm = document.querySelector("#loginForm");
    logoutBtn.style.display="block";
    logoutBtn.addEventListener("click", function() {
            localStorage.removeItem("loggedInUser");
            loginForm.style.display="block";
            logoutBtn.style.display="none";
            pWelcome.innerText="Välkommen! Logga in nedan:"
    })
    felmeddelande();
}
function showCreateAccount(){
    loginForm = document.querySelector("#loginForm")
    loginForm.style.display="none";
    createAccount = document.querySelector("#createAccount")
    createAccount.style.display="block";
    pWelcome = document.querySelector("#pWelcome");
    pWelcome.innerText = "Kul att du vill joina! Du kan skapa ett konto nedan: "
    felmeddelande();
} 
function anyoneHome(){
    if(localStorage.getItem("loggedInUser")){
        loggedInUser = localStorage.getItem("loggedInUser")
        pWelcome = document.querySelector("#pWelcome");
        pWelcome.innerText=("Välkommen tillbaka, " + loggedInUser +"!");
        showLogout();
    } else {
        loginForm = document.getElementById("loginForm");
        loginForm.style.display="block";
        inputUsername.value="";
        inputPassword.value="";
    }
    felmeddelande();
}
function logInUser(username){
    loginForm = document.getElementById("loginForm");
    loginForm.style.display="none";
    pBadCred.style.display="block";
    pWelcome = document.getElementById("pWelcome");
    pWelcome.innerText=("Välkommen, " + username +"!");
    localStorage.setItem("loggedInUser", username);
    inputUsername.value="";
    inputPassword.value="";
    showLogout();
    felmeddelande();
}
async function createAccount(){
    let defUserList = await getUserList();
    createUsername = document.querySelector("#createUsername");
    createPassword = document.querySelector("#createPassword");
    backBtn = document.querySelector("#backBtn");
    btnCreateAccount = document.querySelector("#btnCreateAccount"); 
    btnCreateAccount.addEventListener("click", function() {
        user =[{
            id:"",
            userName: createUsername.value,
            passWord: createPassword.value
            }]
        let obj = defUserList.find(o => o.userName === createUsername.value);
        if(obj != undefined){
            felmeddelande("Användarnamnet är upptaget. Prova med ett annat användarnamn");
        } else {
            createUser(user)
            felmeddelande();
            felmeddelande("Kontot " + createUsername.value + " skapades.");
            createUsername.value=("");
            createPassword.value=("");
            }
    });
    backBtn.addEventListener("click", showLogin);

};
async function createUser(user){
    const response = await fetch("http://localhost:3000/users/newUser", {
        method: "POST", 
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            "id":"",
            "userName":user[0].userName,
            "passWord":user[0].passWord    
        })
    })   
}
function showLogin(){
    createAccount = document.querySelector("#createAccount")
    createAccount.style.display="none";
    loginForm = document.querySelector("#loginForm")
    loginForm.style.display="block";
    pWelcome.innerText="Välkommen! Logga in nedan:"
    inputUsername.value="";
    inputPassword.value="";
    felmeddelande();
}

function felmeddelande(errorCode){
    pBadCred.style.display="block";
    pBadCred.textContent = errorCode;
};