import { noArray, pickFromNoArray } from "./generic.js";

const ggdiv = document.querySelector(".ggdiv");
const ggdiv2 = ggdiv.querySelector(".two");
const innerGGDivs = document.querySelectorAll(".inner-ggdiv");
const fetcharooBtn = document.querySelector(".fetcharoo");
const formBtn = document.querySelector(".form-btn");
const answerInput = document.querySelector("#answer");
const s1Link = document.querySelector("#s1-anchor");
const validating = document.querySelector(".validating");
const s2container = document.querySelector(".random-container2");

const re = /(\s)*covfefe(\s)*/i;
const re2 = /(\s)*i(\s)*know(\s)*words(\s)*,?(\s)*i(\s)*have(\s)*the(\s)*best(\s)*words(\.)?(\s)*/i;


formBtn.addEventListener("click", () => {
    validating.innerHTML = `<span id="arrows">>>></span>Se validează răspunsul`;
    const validatingInterval = setInterval(() => {
        validating.innerHTML += ".";
    }, 500);
    setTimeout(() => {
        clearInterval(validatingInterval);
        if(re.test(answerInput.value)){
            // checkboxContainer.style.display = "flex";   //no more need for this on the last page
            validating.innerHTML = `<span id="arrows">>>></span>Corect`;
            sessionStorage.setItem("progress", 22);      //8 so far, maybe set it to a big number
            stateCheck();
        } else if(re2.test(answerInput.value)){
            validating.innerHTML = `<span id="arrows">>>></span>Răspuns acceptat`;
            sessionStorage.setItem("progress", 21);
            stateCheck();
        }
         else {
            validating.innerHTML = `<span id="arrows">>>></span>${pickFromNoArray(noArray)}`;
        }
    }, 1999);
});

fetcharooBtn.addEventListener("click", fetchAndDisplay);

document.addEventListener("DOMContentLoaded", () => {
    innerGGDivs.forEach((innerDiv) => {
        if(innerDiv !== ggdiv.firstElementChild){
            innerDiv.style.setProperty("--data-vis", "none");
        }
    });
});

innerGGDivs.forEach((innerDiv) => {
    innerDiv.addEventListener("animationstart", () => {
        innerDiv.style.setProperty("--data-vis", "block");
    });
    if(innerDiv !== ggdiv.lastElementChild)
    innerDiv.addEventListener("animationend", () => {
        innerDiv.style.setProperty("--data-vis", "none");
    });
});

async function fetchAndDisplay(){
    fetcharooBtn.disabled = true;
    ggdiv.classList.add("open");
    await fetch("../txt/gg.txt").then(res => res.text()).then(data => ggdiv.append(data));
}

function stateCheck(){
    if(parseInt(sessionStorage.getItem("progress")) === 22){
        // hint.style.opacity = 1;
        // checkboxContainer.style.display = "flex";
        answerInput.value = "covfefe";
        answerInput.disabled = true;
        formBtn.disabled = true;
        fetcharooBtn.disabled = false;
    }
    if(parseInt(sessionStorage.getItem("progress")) >= 21){
        s2container.innerHTML = `<a href="./s_binary_matrix.html" id="s2-anchor"><button class="btn-link" id="btn-s2">S2</button></a>`
    }
    if(parseInt(sessionStorage.getItem("progress")) >= 20)
    {
        s1Link.style.display = "block";
    }
}

stateCheck();