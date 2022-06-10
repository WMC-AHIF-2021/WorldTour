const quizData = [
    {
        question: "What is the capital city of Liechtenstein?",
        a: "Vilinus",
        b: "Vienna",
        c: "Vaduz",
        d: "Valetta",
        correct: "c",
    },
    {
        question: "What is the capital city of Gabon?",
        a: "Maputo",
        b: "Bogota",
        c: "Kinshasa",
        d: "Libreville",
        correct: "d",
    },

    {
        question: "What is the capital city of France?",
        a: "Pristina",
        b: "Lima",
        c: "Paris",
        d: "Warsaw",
        correct: "c",
    },
    {
        question: "What is the capital city of Angola?",
        a: "Luanda",
        b: "Port Moresby",
        c: "Malabo",
        d: "Lusaka",
        correct: "a",
    },
    {
        question: "What is the capital city of Lebanon?",
        a: "Tapei",
        b: "Beriut",
        c: "Ashgabat",
        d: "Tashkent",
        correct: "b",
    },
    {
        question: "What is the capital city of Belgium?",
        a: "Riga",
        b: "Oslo",
        c: "Tallinn",
        d: "Brussels",
        correct: "d",
    },
    {
        question: "What is the capital city of Madagascar?",
        a: "Antananarivo",
        b: "San Jose",
        c: "Conakry",
        d: "Niamey",
        correct: "a",
    },
    {
        question: "What is the capital city of Ghana?",
        a: "Gitega",
        b: "Accra",
        c: "Algiers",
        d: "Kingstown",
        correct: "b",
    },
    {
        question: "What is the capital city of Nigeria?",
        a: "Abuja",
        b: "Kigali",
        c: "Harare",
        d: "Rabat",
        correct: "a",
    },
    {
        question: "What is the capital city of Mozambique?",
        a: "Brazzaville",
        b: "Freetown",
        c: "Kabul",
        d: "Maputo",
        correct: "d",
    },
    {
        question: "What is the capital city of Suriname?",
        a: "Asuncion",
        b: "Manama",
        c: "Paramaribo",
        d: "Castries",
        correct: "c",
    },
    {
        question: "What is the capital city of Cyprus?",
        a: "Prto-Novo",
        b: "Reykjavik",
        c: "Lima",
        d: "Nicosia",
        correct: "d",
    },
    {
        question: "What is the capital city of the Republic of Congo?",
        a: "Bridgetown",
        b: "Dakar",
        c: "Nairobi",
        d: "Brazzaville",
        correct: "d",
    },
    {
        question: "What is the capital city of Latvia?",
        a: "Vilinius",
        b: "Riga",
        c: "Amsterdam",
        d: "Budapest",
        correct: "b",
    },
    {
        question: "What is the capital city of Kosovo?",
        a: "Nikosia",
        b: "Vaduz",
        c: "Pristina",
        d: "Tirana",
        correct: "c",
    },
    {
        question: "What is the capital city of Morocco?",
        a: "Luanda",
        b: "Rabat",
        c: "Moroni",
        d: "Chisinau",
        correct: "b",
    },
    {
        question: "What is the capital city of Tonga?",
        a: "Palikir",
        b: "Nuku'alofa",
        c: "Castries",
        d: "Basseterre",
        correct: "b",
    },
    {
        question: "What is the capital city of the United Arab Emirates?",
        a: "Dubai",
        b: "Seoul",
        c: "Abu Dhabi",
        d: "Muscat",
        correct: "c",
    },
    {
        question: "What is the capital city of Bhutan?",
        a: "Thimphu",
        b: "Damascus",
        c: "Phnom Penh",
        d: "Dhaka",
        correct: "a",
    },
    {
        question: "What is the capital city of Nicaragua?",
        a: "Castries",
        b: "Windhoek",
        c: "Basseterre",
        d: "Managua",
        correct: "d",
    },
    {
        question: "What is the capital city of Ethiopia?",
        a: "Addis Abada",
        b: "Victoria",
        c: "Djibouti",
        d: "Kinshasa",
        correct: "a",
    },
    {
        question: "What is the capital city of Bosnia and Hercegovina?",
        a: "Skopje",
        b: "Bukarest",
        c: "Sarajevo",
        d: "Zagreb",
        correct: "c",
    },
    {
        question: "What is the capital city of Guinea-Bissau?",
        a: "Dakar",
        b: "Bissau",
        c: "Moroni",
        d: "Managua",
        correct: "b",
    },
    {
        question: "What is the capital city of North Korea?",
        a: "Pyongyang",
        b: "Tokio",
        c: "Seoul",
        d: "Peking",
        correct: "a",
    },
    {
        question: "What is the capital city of Poland?",
        a: "Belgrade",
        b: "Minsk",
        c: "Moskau",
        d: "Warsaw",
        correct: "d",
    },
];

const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let rightOrWrong = "";
let currentQuiz = 0
let index = 0;
let score = 0
let questionsAsked = [quizData.length];

loadQuiz()

function WasQuestionAsked() {
    for (let i = 0; i < questionsAsked.length; i++) {
        if(questionsAsked[i] === currentQuiz){
            return true;
        }
    }
    return false;
}

function calculateNewQuestionIndex() {
    currentQuiz = Math.floor(Math.random() * quizData.length);
}

function loadQuiz() {

    deselectAnswers()
    calculateNewQuestionIndex()
    let QuestionAlreadyAsked = WasQuestionAsked();
    if(QuestionAlreadyAsked) {
        while(QuestionAlreadyAsked && index < quizData.length) {
            calculateNewQuestionIndex();
            QuestionAlreadyAsked = WasQuestionAsked();
        }
    }
    questionsAsked[index] = currentQuiz;
    console.log(currentQuiz);
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerHTML = '';
    if(index > 0) {
        if (rightOrWrong === "right") {
            questionEl.innerHTML = `<p>The last question was <span class="right">${rightOrWrong}</span>!<br>` + `Score: ${score}<br></p>`;
        } else {
            questionEl.innerHTML = `<p>The last question was <span class="wrong">${rightOrWrong}</span>!<br>` + `Score: ${score}<br></p>`;
        }
    }
    questionEl.innerHTML += `Question ${index + 1}: <br><p>${currentQuizData.question}</p>`;
    a_text.innerHTML = currentQuizData.a
    b_text.innerHTML = currentQuizData.b
    c_text.innerHTML = currentQuizData.c
    d_text.innerHTML = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++
           rightOrWrong = "right";
       }
       else {
           rightOrWrong = "wrong";
       }
       index++

       if(index < quizData.length) {
           loadQuiz()
       } else {
           quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly</h2>
           <button onclick="location.reload()">Reload</button>`
       }
    }
})