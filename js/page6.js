import { noArray, pickFromNoArray } from "./generic.js";

const formBtn = document.querySelector(".form-btn");
const answerInput = document.querySelector("#answer");
const checkboxContainer = document.querySelector(".cb-container");
const validating = document.querySelector(".validating");
const checkbox = document.querySelector("#progress-cb");
const fakeBtn = document.querySelector(".form-btn2");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal");

let re = /(\s)*yemen(\s)*/i;

fakeBtn.addEventListener("click", () => {
    modal.style.display= "flex";
});
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
})
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
            sessionStorage.setItem("progress", 7);
            stateCheck();
        } else {
            validating.innerHTML = `<span id="arrows">>>></span>${pickFromNoArray(noArray)}`;
        }
    }, 1999);
});

checkbox.addEventListener("change", () => {
    if(checkbox.checked){
        sessionStorage.setItem("page6cb", true);
    } else {
        sessionStorage.setItem("page6cb", false);
    }
});

function stateCheck(){
    if(parseInt(sessionStorage.getItem("progress")) > 6){
        // hint.style.opacity = 1;
        checkboxContainer.style.display = "flex";
        answerInput.value = "Yemen";
        answerInput.disabled = true;
        formBtn.disabled = true;
        fakeBtn.disabled = true;
    }
    if(sessionStorage.getItem("page6cb") === "true"){
        checkbox.checked = true;
    }
}

stateCheck();