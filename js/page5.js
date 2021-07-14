import { noArray, pickFromNoArray } from "./generic.js";

const formBtn = document.querySelector(".form-btn");
const answerInput = document.querySelector("#answer");
const checkboxContainer = document.querySelector(".cb-container");
const validating = document.querySelector(".validating");
const checkbox = document.querySelector("#progress-cb");
let re = /(\s)*am(\s)*vrut(\s)*s[aă](\s)*spun(\s)*ceva(\s)*[iî]n(\s)*rus[aă](\s)*/i;

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
            sessionStorage.setItem("progress", 6);
            stateCheck();
        } else {
            validating.innerHTML = `<span id="arrows">>>></span>${pickFromNoArray(noArray)}`;
            // alert(pickFromNoArray(noArray));
        }
    }, 1999)
});

checkbox.addEventListener("change", () => {
    if(checkbox.checked){
        sessionStorage.setItem("page5cb", true);
    } else {
        sessionStorage.setItem("page5cb", false);
    }
});

function stateCheck(){
    if(parseInt(sessionStorage.getItem("progress")) > 5){
        // hint.style.opacity = 1;
        checkboxContainer.style.display = "flex";
        answerInput.value = "am vrut să spun ceva în rusă";
        answerInput.disabled = true;
        formBtn.disabled = true;
    }
    if(sessionStorage.getItem("page5cb") === "true"){
        checkbox.checked = true;
    }
}

stateCheck();