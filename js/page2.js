import { noArray, pickFromNoArray } from "./generic.js";

const formBtn = document.querySelector(".form-btn");
const answerInput = document.querySelector("#number-answer");
const checkboxContainer = document.querySelector(".cb-container");
const validating = document.querySelector(".validating");
const checkbox = document.querySelector("#progress-cb");

formBtn.addEventListener("click", () => {
    validating.innerHTML = `<span id="arrows">>>></span>Se validează răspunsul`;
    const validatingInterval = setInterval(() => {
        validating.innerHTML += ".";
    }, 500);
    setTimeout(() => {
        clearInterval(validatingInterval);
        if(parseInt(answerInput.value) === 30000){
            checkboxContainer.style.display = "flex";   //round button pops up
            validating.innerHTML = `<span id="arrows">>>></span>Corect`;
            sessionStorage.setItem("progress", 3);
            stateCheck();
        } else {
            validating.innerHTML = `<span id="arrows">>>></span>${pickFromNoArray(noArray)}`;
            // alert(pickFromNoArray(noArray));
        }
    }, 1999)
});

checkbox.addEventListener("change", () => {
    if(checkbox.checked){
        sessionStorage.setItem("page2cb", true);
    } else {
        sessionStorage.setItem("page2cb", false);
    }
});

function stateCheck(){
    if(parseInt(sessionStorage.getItem("progress")) > 2){
        // hint.style.opacity = 1;
        checkboxContainer.style.display = "flex";
        answerInput.value = 30000;
        answerInput.disabled = true;
        formBtn.disabled = true;
    }
    if(sessionStorage.getItem("page2cb") === "true"){
        checkbox.checked = true;
    }
}

stateCheck();
