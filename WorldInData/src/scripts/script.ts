let picName: any[];
let counter: number = 0;
let MAX_RUNTIMES: number;
let content: HTMLElement;
let progressBar: HTMLElement;
let descriptionHeader: HTMLElement;
let descriptionParagraph: HTMLParagraphElement;
let descriptionImage: HTMLElement;
let pic: HTMLImageElement;
let mapPic: HTMLImageElement;

let isPaused: boolean = true;

let playOrPausedButton: HTMLImageElement;
let intervalID: number;
let doesIntervalAlreadyExist: boolean = false; //is the interval already set; was it once set/did it already run once? --> avoiding running two times...
let playCounter: number = 0;

function fetchData(): void {
    fetch("picName.json")
        .then((res) => {
            return res.json();
        })
        .then((loadedPicName) => {
            picName = loadedPicName;
            setSimulator();
        });
}

function setSimulator(): void {
    MAX_RUNTIMES = picName.length - 1;
    content = document.getElementById("picContent");
    content.innerHTML = `<img class="show" id="mapImage" alt="${picName[counter].name}" src="img/data/${picName[counter].name}.svg"/>`;
    progressBar = document.getElementById('progress');
    descriptionHeader = document.getElementById('descriptionHeader');
    descriptionImage = document.getElementById('descriptionImage');
    descriptionParagraph = document.getElementById('descriptionParagraph') as HTMLParagraphElement;
    playOrPausedButton = document.getElementById('playOrPausedButton')  as HTMLImageElement;

    descriptionHeader.innerHTML = picName[counter].descriptionHeader;
    descriptionParagraph.innerHTML = picName[counter].description;
}

function runSimulation(): void {
    isPaused = !isPaused;
    if(isPaused)
        playOrPausedButton.src = "img/play-button.png";
    else
        playOrPausedButton.src = "img/pause.png";

    console.log("isPaused is now " + isPaused);
    window.clearInterval(intervalID);
    //after every reset, a new interval will be set (or created) --> this means if the interval is already created, then we don't want to create another one... otherwise two intervals will be running the simulation (problem: those two intervals would not start at the same second (impossible); both intervals would execute it)
    intervalID = setInterval(() => {
        if(!isPaused) { //program is running
            playCounter++; //1
            console.log("not paused");
            if (++counter === MAX_RUNTIMES) {
                window.clearInterval(intervalID);
            }
            console.log(counter);
            pic = document.getElementById("descriptionImage") as HTMLImageElement;
            mapPic = document.getElementById("mapImage") as HTMLImageElement;
            pic.src = `img/data/${picName[counter].name}.jpg`;
            mapPic.src = `img/data/${picName[counter].name}.svg`; //src-attribute
            progressBar.style.width = `${100 / (MAX_RUNTIMES) * counter}%`;
            descriptionHeader.innerHTML = picName[counter].descriptionHeader;
            descriptionImage.innerHTML = `<img class="show" id="descriptionImage" alt="a simple image" src="../src/img/data/${picName[counter].name}.jpg"/>`;
            descriptionParagraph.innerHTML = picName[counter].description;
        }
        else { //program is paused
            playOrPausedButton.innerHTML = `<img class="show" id="playOrPausedButton" alt="paused button" src="../src/img/play-button.png"/>`;
            console.log("paused");
        }
    }, 1000); //"pause" 1 sec
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
        document.getElementById("resetPlayButton").addEventListener("click", () => {
        playOrPausedButton.src = "img/play-button.png";
        isPaused = true;
        window.clearInterval(intervalID); //the interval will be deleted again
        //resetting the progressBar-length to 0 and the counter to 0 --> we're at the beginning again
        counter = 0;
        progressBar.style.width = "0%";
        //setting the picture, the header and the paragraph of the history-animation back; setting the picture of the world population-growth animation back
        pic.src = `img/data/${picName[counter].name}.jpg`;
        mapPic.src = `img/data/${picName[counter].name}.svg`;
        descriptionHeader.innerHTML = picName[counter].descriptionHeader;
        descriptionParagraph.innerHTML = picName[counter].description;
    });
});
