let picName = [];
let counter = 0;
let MAX_RUNTIMES: number;
let content: HTMLElement;
let progressBar: HTMLElement;

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
}

function runSimulation(): void{
    const intervalID = setInterval(() => {
        if (++counter === MAX_RUNTIMES){
            window.clearInterval(intervalID);
        }
        console.log(counter);
        let pic = document.getElementById(counter.toString()) as HTMLImageElement;
        pic.src = `img/data/${picName[counter].name}.svg`;
        pic.id = `${picName[counter].id}`;
        progressBar.style.width = `${100 / (MAX_RUNTIMES) * counter}%`;
    }, 200);
}

document.addEventListener('DOMContentLoaded', ()=>{
    fetchData();

    document.getElementById("reset").addEventListener("click", ()=>{
        counter = 0;
        progressBar.style.width = "0%";
        content.innerHTML = `<img class="show" id="${picName[counter].id}" alt="${picName[counter].name}" src="img/data/${picName[counter].name}.svg"/>`;
    });
})