import { noArray, pickFromNoArray } from "./generic.js";

const formBtn = document.querySelector(".form-btn");
const answerInput = document.querySelector("#answer");
const checkboxContainer = document.querySelector(".cb-container");
const validating = document.querySelector(".validating");
const checkbox = document.querySelector("#progress-cb");
let re = /(\s)*becs(\s)*la(\s)*gunoi(\s)*/i;

formBtn.addEventListener("click", () => {
    validating.innerHTML = `<span id="arrows">>>></span>Se validează răspunsul`;
    const validatingInterval = setInterval(() => {
        validating.innerHTML += ".";
    }, 500);
    setTimeout(() => {
        clearInterval(validatingInterval);
        if(re.test(answerInput.value)){
            checkboxContainer.style.display = "flex";   //round button pops up
            validating.innerHTML = `<span id="arrows">>>></span>Corect`;
            sessionStorage.setItem("progress", 5);
            stateCheck();
        } else {
            validating.innerHTML = `<span id="arrows">>>></span>${pickFromNoArray(noArray)}`;
            // alert(pickFromNoArray(noArray));
        }
    }, 1999)
});

checkbox.addEventListener("change", () => {
    if(checkbox.checked){
        sessionStorage.setItem("page4cb", true);
    } else {
        sessionStorage.setItem("page4cb", false);
    }
});

function stateCheck(){
    if(parseInt(sessionStorage.getItem("progress")) > 4){
        // hint.style.opacity = 1;
        checkboxContainer.style.display = "flex";
        answerInput.value = "becs la gunoi";
        answerInput.disabled = true;
        formBtn.disabled = true;
    }
    if(sessionStorage.getItem("page4cb") === "true"){
        checkbox.checked = true;
    }
}

stateCheck();