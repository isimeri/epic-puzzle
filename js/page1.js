import { noArray, pickFromNoArray } from "./generic.js";

const formBtn = document.querySelector(".form-btn");
const hint = document.querySelector(".hint");
const numberInput = document.querySelector("#number-answer");
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
        if(parseInt(numberInput.value) === 19){
            hint.style.opacity = 1;
            checkboxContainer.style.display = "flex";   //round button pops up
            validating.innerHTML = `<span id="arrows">>>></span>Corect`;
            sessionStorage.setItem("progress", 2);
        } else {
            validating.innerHTML = `<span id="arrows">>>></span>${pickFromNoArray(noArray)}`;
        }
    }, 1999)
});

checkbox.addEventListener("change", () => {
    if(checkbox.checked){
        sessionStorage.setItem("page1cb", true);
    } else {
        sessionStorage.setItem("page1cb", false);
    }
});

function stateCheck(){
    if(parseInt(sessionStorage.getItem("progress")) > 1){
        hint.style.opacity = 1;
        checkboxContainer.style.display = "flex";
        numberInput.value = 19;
        numberInput.disabled = true;
    }
    if(sessionStorage.getItem("page1cb") === "true"){
        checkbox.checked = true;
    }
}

stateCheck();