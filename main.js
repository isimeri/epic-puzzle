const formBtn = document.querySelector(".form-btn");
const formContainer = document.querySelector(".form-container");
const fnameInput = document.querySelector("#firstname");
const lnameInput = document.querySelector("#lastname");
const wrongPersonModal = document.querySelector(".wrong-person");
const validating = document.querySelector(".validating");
const btnLink1 = document.querySelector("#btn-link1");
const btnLink2 = document.querySelector("#btn-link2");
const btnLink3 = document.querySelector("#btn-link3");
const btnLink4 = document.querySelector("#btn-link4");
const btnLink5 = document.querySelector("#btn-link5");
const btnLink6 = document.querySelector("#btn-link6");
const btnLinkLast = document.querySelector("#btn-link-last");

function setUp(){                                           //sets up variables that keep track of the puzzle progress
    sessionStorage.setItem("progress", "0");
    sessionStorage.setItem("activeButtons", "0");
    sessionStorage.setItem("didSetUpRunAlready", "true");
}

window.onclose = function(){                                //deletes sessionStorage variables when the window is closed
    sessionStorage.removeItem("progress");                  //IDEA: attach a server to it some day to keep the progress there
    sessionStorage.removeItem("activeButtons");             //consider localStorage
    sessionStorage.removeItem("didSetUpRunAlready");
    clearInterval(updateInterval);
}

formBtn.addEventListener("click", () => {
    validating.innerHTML = `<span id="arrows">>>></span>Se validează răspunsul`;
    const validatingInterval = setInterval(() => {
        validating.innerHTML += ".";
    }, 500);
    //this happens when the first button is clicked
    setTimeout(() => {
        clearInterval(validatingInterval);
        if(fnameInput.value.toLowerCase() === "mihaela" && lnameInput.value.toLowerCase() === "zaluceanu"){
            validating.innerHTML = `<span id="arrows">>>></span>Corect`;
            setTimeout(() => {
                btnLink1.style.display = "block";
                formContainer.style.display = "none";
                validating.style.display = "none";
                fnameInput.value = "";
                lnameInput.value = "";
                sessionStorage.setItem("progress", 1);
            }, 1000);
            
        } else  {
            wrongPersonModal.style.display = "flex";
            setTimeout(() => {
                window.close()
            }, 3000);
        }
    },1999);
    });
    

function progressUpdate(){                      //uses session storage variables to load the correct display stuff

    if(parseInt(sessionStorage.getItem("progress")) >= 7 && sessionStorage.getItem("activeButtons") === "6"){
        btnLinkLast.style.display= "block";
    }
    switch(sessionStorage.getItem("progress")){
        case "22":
        case "21":
        case "20":
        case "7":
        case "6":{
            btnLink6.style.display = "block";
        }
        case "5":{
            btnLink5.style.display = "block";
        }
        case "4":{
            btnLink4.style.display = "block";
        }
        case "3":{
            btnLink3.style.display = "block";
        }
        case "2":{
            btnLink2.style.display = "block";
        }
        case "1":{
            btnLink1.style.display = "block";
            formContainer.style.display = "none";
        }
    }
}

if(sessionStorage.getItem("didSetUpRunAlready") !== "true"){        //if setUp() already happened, it wont happen again when the page loads/reloads
    setUp();
}

progressUpdate();
const updateInterval = setInterval(progressUpdate, 1000);           //checks the progress every second and does the visual updates

//see if you can move some stuff from page1.js to main.js