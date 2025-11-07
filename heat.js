let heat = 0;
let timerInterval = null;
let timerIntervalCool = null;

function cook(){ //cooks the stew
    heat = heat + 0.25;
    smoke();
    //document.querySelector('#fire').innerHTML = heat; change this line to loop in different frames of fire
}

function cool(){ // cools the stew
    heat = heat - 0.25;
    //document.querySelector('#fire').innerHTML = null; for the fire
    smoke();
    if (heat == 0){ //stops the cooling interval when heat is 0
        cancelCooling();
    }
}

function smoke(){
    if (heat > 20){
        console.log(heat)
    }
}

function cancelCooling(){ //stops the cooling, when called both by the cool() and the button when fire is lit again
    clearInterval(timerIntervalCool);
    timerIntervalCool = null;
}

//contents of second html
function replace(topic){
    document.querySelector('#topic').innerHTML = topic;
    switch(topic){
        case "Conduction":
            //change paragraph
            break;
        case "Convection":
            break;
        case "Radiation":
            break;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let contents = "";
    const cookBTN = document.querySelector('#cook');
    const DemoBTN = document.querySelector('#demonstration')
    const ConDuctBTN = document.querySelector('#conduction')
    const ConVecBTN = document.querySelector('#convection')
    const RadBTN = document.querySelector('#radiation')
    const params = new URLSearchParams(window.location.search);
    const topic = params.get('topic');

    if (topic) {
        replace(topic);     // update your header text
        contents = topic;   // (optional) keep internal state synced
    }

    if (cookBTN) {
        cookBTN.onclick = () => {
            if (timerIntervalCool) {
                cancelCooling();
                timerInterval = setInterval(cook, 250);
            } else if (!timerInterval) {
                timerInterval = setInterval(cook, 250);
            }else {
                clearInterval(timerInterval);
                timerInterval = null;
                timerIntervalCool = setInterval(cool, 250)
            }
            if (cookBTN.textContent === "Open Fire") {
                cookBTN.textContent = "Close Fire";
            } else {
                cookBTN.textContent = "Open Fire";
            }
        }
    }    

    ConDuctBTN.onclick = () => {
        if (contents != 'conduction'){
            contents = 'conduction';
            replace('Conduction');
        }
    }

    ConVecBTN.onclick = () => {
        if (contents != 'convection'){
            contents = 'convection';
            replace('Convection');
        }
    }

    RadBTN.onclick = () => {
        if (contents != 'radiation'){
            contents = 'radiation';
            replace('Radiation');
        }
    }

});



