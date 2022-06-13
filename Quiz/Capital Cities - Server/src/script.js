new URL(url, "http://localhost:3000")

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
    questionEl.innerHTML += `Question ${index + 1} / ${quizData.length}: <br><p>${currentQuizData.question}</p>`;
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