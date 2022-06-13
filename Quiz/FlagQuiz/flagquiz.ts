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
        flag: baseUrl + 'Europe/images/Moldova/Flag.png',
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
        flag: baseUrl + 'Europe/images/Spain/Flag.png',
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
const submitBtn = document.getElementById('submitCountry'); //button for next flag
const hintBtn = document.getElementById('hintBtn'); //hintbutton
const hintEl = document.getElementById('hintOutPut');
const outPutEl = document.getElementById('output');
const input = <HTMLInputElement>document.getElementById('sizeIn');

let currentQuiz:number = 0; //current Flay which is currently asked
let score:number = 0; //user score
let index: number = 0;//counts up to quizdata.length
let questionsAsked = [quizData.length]; //array for indexes which were already displayed

//sees if the flag was already generated, more specific: displayed before
//true, if already displayed
function WasQuestionAsked() {
    for (let i = 0; i < questionsAsked.length; i++) {
        if(questionsAsked[i] === currentQuiz) {
            return true;
        }
    }
    return false;
}

//displayes new flag to guess its name from
//+ output of current score
function loadImage():Promise<void> {
    generateNewFlagToQuiz();
    let QuestionAlreadyAsked = WasQuestionAsked();
    if(QuestionAlreadyAsked) {
        while(QuestionAlreadyAsked && index < quizData.length) {
            generateNewFlagToQuiz();
            QuestionAlreadyAsked = WasQuestionAsked();
        }
    }

    questionsAsked[index] = currentQuiz;
    console.log(questionsAsked[index]);
    const currentQuizData = quizData[currentQuiz];

    if(index === 0) {
        questionEl.innerHTML = '<div class="flagGuessingHeader">' +
            '<a class="quizName textcolor" style="text-align: right">Flag Guessing</a>'
            + '</div>';
    }
    else {
        questionEl.innerHTML = '<div class="flagGuessingHeader">' +
            '<a class="quizName textcolor">Flag Guessing</a>' +
            '<a class="points" style="margin-left:1em">Score: ' + score + '/' + index + '</a>'
            + '</div>';
    }
    questionEl.innerHTML += '<img style="height: 12em" src=' + currentQuizData.flag + '>';
    return;
}

//trim input from user in case there were accidentally put spaces
//and convert to lowercase
function getCountry():string {
    return input.value.trim().toLowerCase();
}

//sees if the guess was right
//returns true if so
function isCountryRight(guess:string) : boolean{
    if(guess === quizData[currentQuiz].country) {
        return true;
    }
    return false;
}

//at the end: reload button + output (how many flags have you guessed correctly)
function end() {
    quiz.innerHTML = `<h2>You guessed ${score}/${quizData.length} countries by their flag correctly!</h2>
           <button style="reloadButton" onclick="location.reload()">Reload</button>`;
}

//generate new random flag (index) to display these informations on the website
function generateNewFlagToQuiz() {
    currentQuiz = Math.floor(Math.random() * quizData.length);
}

//if DOMContentLoaded --> display first image
document.addEventListener('DOMContentLoaded', (event) => {
    loadImage();
});

//if submit button is pressed, we test if the user input was correct
submitBtn.addEventListener('click', () => {
    const guessedCountry = getCountry();
    if(isCountryRight(guessedCountry)) {
        score++;
        outPutEl.innerHTML = `<p>Nice, you got it <span class="right">right</span>!<br>`;
    }
    else {
        outPutEl.innerHTML = `<p>Sorry, that\'s <span class="wrong">wrong</span> ...<br>`;
    }
    index++;
    if(index > quizData.length - 1) {
        end();
    }
    else {
        setTimeout( async () => {
            await loadImage();
            outPutEl.innerHTML = '';
        }, 1500);
    }
})


//for a hint
let hintButtonClickCounter:number = 0;
hintBtn.addEventListener('click', () => {
    hintButtonClickCounter++;
    if(hintButtonClickCounter % 2 !== 0)
        hintEl.innerHTML = `<p class="hint">This country belongs to the continent ${quizData[currentQuiz].continent}.</p>`;
    else
        hintEl.innerHTML = '';
})
