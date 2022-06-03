let picName = [];
let counter: number = 0;
let MAX_RUNTIMES: number;
let content: HTMLElement; //HTMLElement is also a data type
let progressBar: HTMLElement;

let descriptionHeader: HTMLElement;
let descriptionParagraph: HTMLElement;
let descriptionImage: HTMLElement;

let isPaused: boolean = true;
let intervalID: number;

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
    content.innerHTML = `<img class="show" id="${picName[counter].id}" alt="${picName[counter].name}" src="img/data/${picName[counter].name}.svg"/>`;
    progressBar = document.getElementById('progress');
    descriptionHeader = document.getElementById('descriptionHeader');
    descriptionImage = document.getElementById('descriptionImage');
    descriptionParagraph = document.getElementById('descriptionParagraph');
}

function runSimulation(): void{
    isPaused = !isPaused;
    intervalID = setInterval(() => {
        if (!isPaused) {
            if (++counter === MAX_RUNTIMES){
                window.clearInterval(intervalID);
            }
            console.log(counter);
            let pic = document.getElementById(counter.toString()) as HTMLImageElement;
            pic.src = `img/data/${picName[counter].name}.svg`;
            pic.id = `${picName[counter].id}`;
            progressBar.style.width = `${100 / (MAX_RUNTIMES) * counter}%`;

            descriptionHeader.innerHTML = picName[counter].descriptionHeader;
            descriptionImage.innerHTML = `<img class="show" id="descriptionImage" alt="a simple image" src="../img/data/population-density1892.jpg"/>`;
            descriptionParagraph = picName[counter].description;
        }
    }, 200);
}

document.addEventListener('DOMContentLoaded', ()=>{
    fetchData();

    document.getElementById("reset").addEventListener("click", ()=>{
        counter = 0;
        progressBar.style.width = "0%";
        content.innerHTML = `<img class="show" id="${picName[counter].id}" alt="${picName[counter].name}" src="img/data/${picName[counter].name}.svg"/>`;
        descriptionHeader.innerHTML = picName[counter].descriptionHeader;
        descriptionImage.innerHTML = `<img class="show" id="descriptionImage" alt="a simple image" src="../img/data/population-density1892.jpg"/>`;
        descriptionParagraph = picName[counter].description;

        window.clearInterval(intervalID);
    });
})
