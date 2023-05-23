let currentQuestion = 0;
let rightAnswerCount = 0;

function init() {
    document.getElementById('totalQuestionCount').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('nextQuestionBtn').disabled = true;
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selectedAnswer) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selectedAnswer.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (question['right_answer'] == selectedQuestionNumber) {
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-success');
        rightAnswerCount++;
    } else if (question['right_answer'] != selectedQuestionNumber) {
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('nextQuestionBtn').disabled = false;
}

function nextQuestion() {
    if (currentQuestion+1 == questions.length) {
        document.getElementById('quizCard').innerHTML = '';
        document.getElementById('quizCard').innerHTML += `
        <div class="finalScreen">
            <div class="trophy">
                <img src="./img/tropy.png">
                <img src="./img/tropy.png" class="imgMirrorY">
            </div>
            <h2>Herzlichen Glückwunsch!</h2><br>
            <h3>Du hast ${rightAnswerCount} Fragen von ${questions.length} Fragen richtig beantwortet!</h3>
        </div>
        `;
    } else {
        currentQuestion++;
        showQuestion();
        removeClass();
    }
}

function removeClass() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}