let currentQuestion = 0;
let rightAnswerCount = 0;

function init() {
    document.getElementById('totalQuestionCount').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];
    let progressbar = document.getElementById('progressbar');
    let currentPercentage = 100 / questions.length * currentQuestion;
    progressbar.ariaValueNow = currentPercentage;
    progressbar.style = `width: ${currentPercentage}%`;
    document.getElementById('currentQuestion').innerHTML = currentQuestion+1;
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
        document.getElementById(selectedAnswer).parentNode.classList.add('correctanswer');
        document.getElementById('letter_'+selectedAnswer).classList.add('correctanswer-letter');
        rightAnswerCount++;
    } else if (question['right_answer'] != selectedQuestionNumber) {
        document.getElementById(selectedAnswer).parentNode.classList.add('wronganswer');
        document.getElementById('letter_'+selectedAnswer).classList.add('wronganswer-letter');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('correctanswer');
        document.getElementById('letter_'+idOfRightAnswer).classList.add('correctanswer-letter');
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
            <button class="btn buttonbg" onclick="location.reload()">nochmal spielen!</button>
        </div>
        `;
        document.getElementById('progressbar').style = 'width: 100%';
    } else {
        currentQuestion++;
        showQuestion();
        removeClass();
    }
}

function removeClass() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).parentNode.classList.remove('wronganswer');
        document.getElementById(`answer_${i}`).parentNode.classList.remove('correctanswer');
        document.getElementById(`letter_answer_${i}`).classList.remove('wronganswer-letter');
        document.getElementById(`letter_answer_${i}`).classList.remove('correctanswer-letter');
    }
}