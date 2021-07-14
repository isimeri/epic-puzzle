function updateProgressButtons(progressButton){
    let nrButtons = parseInt(sessionStorage.getItem("activeButtons"));
    console.log(nrButtons);
    if(progressButton.checked){
        sessionStorage.setItem("activeButtons", nrButtons+1)
    } else {
        sessionStorage.setItem("activeButtons", nrButtons-1)
    }
}