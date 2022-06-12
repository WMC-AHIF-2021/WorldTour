var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var baseUrl = '../../Websites/';
var quizData = [
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
var quiz = document.getElementById('quiz');
var questionEl = document.getElementById('question');
var submitBtn = document.getElementById('submitCountry'); //button for next flag
var hintBtn = document.getElementById('hintBtn'); //hintbutton
var hintEl = document.getElementById('hintOutPut');
var outPutEl = document.getElementById('output');
var input = document.getElementById('sizeIn');
var currentQuiz = 0; //current Flay which is currently asked
var score = 0; //user score
var index = 0; //counts up to quizdata.length
var questionsAsked = [quizData.length]; //array for indexes which were already displayed
//sees if the flag was already generated, more specific: displayed before
//true, if already displayed
function WasQuestionAsked() {
    for (var i = 0; i < questionsAsked.length; i++) {
        if (questionsAsked[i] === currentQuiz) {
            return true;
        }
    }
    return false;
}
//displayes new flag to guess its name from
//+ output of current score
function loadImage() {
    generateNewFlagToQuiz();
    var QuestionAlreadyAsked = WasQuestionAsked();
    if (QuestionAlreadyAsked) {
        while (QuestionAlreadyAsked && index < quizData.length) {
            generateNewFlagToQuiz();
            QuestionAlreadyAsked = WasQuestionAsked();
        }
    }
    questionsAsked[index] = currentQuiz;
    console.log(questionsAsked[index]);
    var currentQuizData = quizData[currentQuiz];
    if (index === 0) {
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
function getCountry() {
    return input.value.trim().toLowerCase();
}
//sees if the guess was right
//returns true if so
function isCountryRight(guess) {
    if (guess === quizData[currentQuiz].country) {
        return true;
    }
    return false;
}
//at the end: reload button + output (how many flags have you guessed correctly)
function end() {
    quiz.innerHTML = "<h2>You guessed " + score + "/" + quizData.length + " countries by their flag correctly!</h2>\n           <button style=\"reloadButton\" onclick=\"location.reload()\">Reload</button>";
}
//generate new random flag (index) to display these informations on the website
function generateNewFlagToQuiz() {
    currentQuiz = Math.floor(Math.random() * quizData.length);
}
//if DOMContentLoaded --> display first image
document.addEventListener('DOMContentLoaded', function (event) {
    loadImage();
});
//if submit button is pressed, we test if the user input was correct
submitBtn.addEventListener('click', function () {
    var guessedCountry = getCountry();
    if (isCountryRight(guessedCountry)) {
        score++;
        outPutEl.innerHTML = "<p>Nice, you got it <span class=\"right\">right</span>!<br>";
    }
    else {
        outPutEl.innerHTML = "<p>Sorry, that's <span class=\"wrong\">wrong</span> ...<br>";
    }
    index++;
    hintEl.innerHTML = '';
    if (index > quizData.length - 1) {
        end();
    }
    else {
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadImage()];
                    case 1:
                        _a.sent();
                        outPutEl.innerHTML = '';
                        return [2 /*return*/];
                }
            });
        }); }, 1500);
    }
});
//for a hint
var hintButtonClickCounter = 0;
hintBtn.addEventListener('click', function () {
    hintButtonClickCounter++;
    if (hintButtonClickCounter % 2 !== 0)
        hintEl.innerHTML = "<p class=\"hint\">This country belongs to the continent " + quizData[currentQuiz].continent + ".</p>";
    else
        hintEl.innerHTML = '';
});
