let pantsCards = document.getElementById("pants");
let pantsVisibility = false;

pantsCards.onclick = () => {
    showHidden("allPantCards", pantsVisibility);
    pantsVisibility = !pantsVisibility
}

function showHidden(namee, visibility) {
    let element = document.getElementById(namee);
    if (visibility == false) {
        if (element.classList.contains("oculto")) {
            element.classList.remove("oculto")
        }
        element.className += " visible"
    } else {
        if (element.classList.contains("visible")) {
            element.classList.remove("visible")
        }
        element.className += " oculto"
    }
}

let jacketCards = document.getElementById("jackets");
let jacketsVisibility = false;

jacketCards.onclick = () => {
    showHidden("allJacketCards", jacketsVisibility);
    jacketsVisibility = !jacketsVisibility
}

let shirtsCards = document.getElementById("shirts");
let shirtsVisibility = false;

shirtsCards.onclick = () => {
    showHidden("allShirtsCards", shirtsVisibility);
    shirtsVisibility = !shirtsVisibility
}