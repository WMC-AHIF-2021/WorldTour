const baseUrl = '../../Websites/'
const quizData = [
    {
        flag: baseUrl + 'Africa/images/chad/chad.png',
        continent: "Africa",
        country: "chad",
    },
    {
        flag: baseUrl + 'Asia/images/oman/flag.jpg',
        continent: "Asia",
        country: "oman",
    },

    {
        flag: baseUrl + 'Europe/images/moldova/Flag.png',
        continent: "Europe",
        country: "moldova",
    },
    {
        flag: baseUrl + 'Africa/images/namibia/namibia.png',
        continent: "Africa",
        country: "namibia",
    },
    {
        flag: baseUrl + 'Africa/images/zambia/zambia.png',
        continent: "Africa",
        country: "zambia",
    },
    {
        flag: baseUrl + 'Asia/images/bahrain/flag.png',
        continent: "Asia",
        country: "bahrain",
    },

    {
        flag: baseUrl + 'SouthAmerica/images/peru/peru.jpg',
        continent: "South America",
        country: "peru",
    },
    {
        flag: baseUrl + 'NorthAmerica/images/Canada/Flag.png',
        continent: "North America",
        country: "canada",
    },
    {
        flag: baseUrl + 'Asia/images/china/flag.jpg',
        continent: "Asia",
        country: "china",
    },
    {
        flag: baseUrl + 'Asia/images/thailand/flag.jpg',
        continent: "Asia",
        country: "thailand",
    },

    {
        flag: baseUrl + 'SouthAmerica/images/brazil/brazil.png',
        continent: "South America",
        country: "brazil",
    },
    {
        flag: baseUrl + 'Australia/images/fiji/flag.jpg',
        continent: "Australia",
        country: "fiji",
    },
    {
        flag: baseUrl + 'Europe/images/spain/Flag.png',
        continent: "Europe",
        country: "spain",
    },
    {
        flag: baseUrl + 'Europe/images/Andorra/Flag.png',
        continent: "Europe",
        country: "andorra",
    },
    {
        flag: baseUrl + 'NorthAmerica/images/Haiti/Flag.png',
        continent: "North America",
        country: "haiti",
    },
];

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const submitBtn = document.getElementById('submitCountry');
const hintBtn = document.getElementById('hintBtn');
const hintEl = document.getElementById('hintOutPut');
const outPutEl = document.getElementById('output');
const input = <HTMLInputElement>document.getElementById('sizeIn');

let rightOrWrong:string = "";
let currentQuiz:number = 0;
let score:number = 0;

function loadImage():Promise<void> {
    const currentQuizData = quizData[currentQuiz];
    if(currentQuiz === 0) {
        questionEl.innerHTML = '<div class="flagGuessingHeader">' +
            '<a class="quizName textcolor" style="text-align: right">Flag Guessing</a>'
            + '</div>';
    }
    else {
        questionEl.innerHTML = '<div class="flagGuessingHeader">' +
            '<a class="quizName textcolor">Flag Guessing</a>' +
            '<a class="points" style="text-align:right">Score: ' + score +'</a>'
            + '</div>';
    }
    questionEl.innerHTML +=  '<img src=' + currentQuizData.flag + '>';
    return;
}

function getCountry():string {
    return input.value.toLowerCase();
}

function isCountryRight(guess:string) : boolean{
    if(guess === quizData[currentQuiz].country) {
        return true;
    }
    return false;
}

function end() {
    quiz.innerHTML = `<h2>You guessed ${score}/${quizData.length} countries by their flag correctly!</h2>
           <button style="reloadButton" onclick="location.reload()">Reload</button>`;
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadImage();
});

submitBtn.addEventListener('click', () => {
    const guessedCountry = getCountry();
    if(isCountryRight(guessedCountry)) {
        score++;
        outPutEl.innerHTML = `<p>Nice, you got it <span class="right">right</span>!<br>`;
    }
    else {
        outPutEl.innerHTML = `<p>Sorry, that\'s <span class="wrong">wrong</span> ...<br>`;
    }
    currentQuiz++;
    hintEl.innerHTML = '';
    if(currentQuiz > quizData.length - 1) {
        end();
    }
    else {
        //console.log(currentQuiz);
        setTimeout(async () => {
            await loadImage();
            outPutEl.innerHTML = '';
            loadImage();
        }, 1500);
    }
})

let hintButtonClickCounter:number = 0;
hintBtn.addEventListener('click', () => {
    hintButtonClickCounter++;
    if(hintButtonClickCounter % 2 !== 0)
        hintEl.innerHTML = `<p class="hint">This country belongs to the continent ${quizData[currentQuiz].continent}.</p>`;
    else
        hintEl.innerHTML = '';
})