let picName = [];
let counter = 0;
let MAX_RUNTIMES;
let content;
let progressBar;
let descriptionHeader;
let descriptionParagraph;
let descriptionImage;
let pic;
let mapPic;

let isPaused = true;

let playOrPausedButton;
let intervalID;
let doesIntervalAlreadyExist = false; //ob das Intervalll bereits schon mal gesetzt wurde / gelaufen ist --> dass es dann nicht 2 mal läuft...
//let playOrPausedButton;
let playCounter = 0;

function fetchData() {
    fetch("picName.json")
        .then((res) => {
            return res.json();
        })
        .then((loadedPicName) => {
            picName = loadedPicName;
            setSimulator();
        });
}
function setSimulator() {
    MAX_RUNTIMES = picName.length - 1;
    content = document.getElementById("picContent");
    content.innerHTML = `<img class="show" id="mapImage" alt="${picName[counter].name}" src="img/data/${picName[counter].name}.svg"/>`;
    progressBar = document.getElementById('progress');
    descriptionHeader = document.getElementById('descriptionHeader');
    descriptionImage = document.getElementById('descriptionImage');
    descriptionParagraph = document.getElementById('descriptionParagraph');
    playOrPausedButton = document.getElementById('playOrPausedButton');

    descriptionHeader.innerHTML = picName[counter].descriptionHeader;
    descriptionParagraph.innerHTML = picName[counter].description;
}
function runSimulation() {
    isPaused = !isPaused;


    if(isPaused)
        playOrPausedButton.src = "img/play-button.png";
    else
        playOrPausedButton.src = "img/pause.png";

    console.log("isPaused is now " + isPaused);
    //nach jedem reset wird ein neues Intervall gesetzt (erzeugt) --> if--> intervall bereits erzeugt --> dann nicht nochmal erzeugen sonst laufen 2 (problem: fangen nicht zur selben sec an; beide würden es ausführen)
    window.clearInterval(intervalID);

    intervalID = setInterval(() => {
        if(!isPaused) {
            playCounter++; //1
            console.log("not paused");
            if (++counter === MAX_RUNTIMES) {
                window.clearInterval(intervalID);
            }
            console.log(counter);
            pic = document.getElementById("descriptionImage");
            mapPic = document.getElementById("mapImage");
            pic.src = `img/data/${picName[counter].name}.jpg`;
            mapPic.src = `img/data/${picName[counter].name}.svg`; //src-attribute
            //pic.id = `${picName[counter].id}`;
            progressBar.style.width = `${100 / (MAX_RUNTIMES) * counter}%`;
            descriptionHeader.innerHTML = picName[counter].descriptionHeader;
            descriptionImage.innerHTML = `<img class="show" id="descriptionImage" alt="a simple image" src="../src/img/data/${picName[counter].name}.jpg"/>`;
            descriptionParagraph.innerHTML = picName[counter].description;
        }
        else {
            playOrPausedButton.innerHTML = `<img class="show" id="playOrPausedButton" alt="paused button" src="../src/img/play-button.png"/>`;
            console.log("paused");
        }
    }, 1000);

    //window.clearInterval(intervalID);
}
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    document.getElementById("resetPlayButton").addEventListener("click", () => {
        playOrPausedButton.src = "img/play-button.png";
        isPaused = true;
        window.clearInterval(intervalID); //Intervall wird wieder gelöscht

        counter = 0;
        progressBar.style.width = "0%";
        //content = document.getElementById("picContent");
        //content.innerHTML = `<img class="show" id="mapImage" alt="${picName[0].name}" src="img/data/${picName[0].name}.svg"/>`;
        //content.innerHTML = `<img class="show" id="${picName[counter].id}" alt="${picName[counter].name}" src="img/data/${picName[counter].name}.svg"/>`;
        pic.src = `img/data/${picName[counter].name}.jpg`;
        mapPic.src = `img/data/${picName[counter].name}.svg`;
        descriptionHeader.innerHTML = picName[counter].descriptionHeader;
        //descriptionImage.innerHTML = `<img class="show" id="descriptionImage" alt="a simple image" src="img/data/${picName[0].name}.jpg"/>`;
        descriptionParagraph.innerHTML = picName[counter].description; //description, images, etc. nach dem Reset wieder auf das erste zrkstellen
    });
});
