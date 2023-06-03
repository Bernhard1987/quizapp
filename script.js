let currentQuestion = 0;
let rightAnswerCount = 0;
let AUDIO_SUCCESS = new Audio('sounds/ríght.mp3');
let AUDIO_FAIL = new Audio('sounds/wrong.mp3');

function showQuestion() {
    let question = questions[currentQuestion];
    showQuestionHTML();
    document.getElementById('totalQuestionCount').innerHTML = questions.length;
    updateProgressbar();
    updateQuestion(question);
}

function updateProgressbar() {
    let progressbar = document.getElementById('progressbar');
    let currentPercentage = 100 / questions.length * currentQuestion;
    progressbar.ariaValueNow = currentPercentage;
    progressbar.style = `width: ${currentPercentage}%`;
    progressbar.innerHTML = `${currentPercentage.toFixed(0)}%`;
}

function updateQuestion(question) {
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('nextQuestionBtn').disabled = true;
    document.getElementById('questionText').innerHTML = question['question'];
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).innerHTML = question[`answer_${i}`];
    }
}

function answer(selectedAnswer) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selectedAnswer.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    if (rightAnswerSelected(question, selectedQuestionNumber)) {
        correctAnswerAction(selectedAnswer);
    } else {
        wrongAnswerAction(selectedAnswer, idOfRightAnswer);
    }
    document.getElementById('nextQuestionBtn').disabled = false;
    disableAnswers();
}

function rightAnswerSelected(question, selectedQuestionNumber) {
    return question['right_answer'] == selectedQuestionNumber;
}

function correctAnswerAction(selectedAnswer) {
    document.getElementById(selectedAnswer).parentNode.classList.add('correctanswer');
    document.getElementById(`letter_${selectedAnswer}`).classList.add('correctanswer-letter');
    AUDIO_SUCCESS.play();
    rightAnswerCount++;
}

function wrongAnswerAction(selectedAnswer, idOfRightAnswer) {
    document.getElementById(selectedAnswer).parentNode.classList.add('wronganswer');
    document.getElementById(`letter_${selectedAnswer}`).classList.add('wronganswer-letter');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('correctanswer');
    document.getElementById(`letter_${idOfRightAnswer}`).classList.add('correctanswer-letter');
    AUDIO_FAIL.play();
}

function nextQuestion() {
    if (questionNumberEqualsLength()) {
        showEndscreen();
    } else {
        showNextQuestion();
    }
}

function questionNumberEqualsLength() {
    return currentQuestion + 1 == questions.length;
}

function showStartScreenHTML() {
    document.getElementById('rightSection').innerHTML = '';
    document.getElementById('rightSection').innerHTML = `
    <div class="startScreen">
          <div class="startScreenContent">
            <h1>Willkommen beim beeindruckenden HTML Quiz!</h1>
            <div>Bereit für die Herausforderung?</div>
          </div>
          <div class="startScreenBottom">
            <button class="btn startScreenButton" onclick="showQuestion()">JETZT STARTEN!<img src="./img/arrow_forward.png" alt="" class="arrow"></button>
          </div>
        </div>
    `;
    document.getElementById('trophy').classList.add('dnone');
}

function showQuestionHTML() {
    document.getElementById('rightSection').innerHTML = '';
    document.getElementById('rightSection').innerHTML += `
    <div class="card-body">
    <h5 class="card-title" id="questionText"></h5>
    <div class="card mb-2 quiz-answer-card dflexrow " onclick="answer('answer_1')">
      <div class="answerLetter" id="letter_answer_1">A</div>
      <div class="card-body" id="answer_1">
      </div>
    </div>
    <div class="card mb-2 quiz-answer-card dflexrow" onclick="answer('answer_2')">
      <div class="answerLetter" id="letter_answer_2">B</div>
      <div class="card-body" id="answer_2">
      </div>
    </div>
    <div class="card mb-2 quiz-answer-card dflexrow" onclick="answer('answer_3')">
      <div class="answerLetter" id="letter_answer_3">C</div>
      <div class="card-body" id="answer_3">
      </div>
    </div>
    <div class="card mb-2 quiz-answer-card dflexrow" onclick="answer('answer_4')">
      <div class="answerLetter" id="letter_answer_4">D</div>
      <div class="card-body" id="answer_4">
      </div>
    </div>
    <div class="question-footer">
      <div>
        <b id="currentQuestion">1</b> von <b id="totalQuestionCount">5</b> Fragen
      </div>
      <button class="btn circlebutton" id="nextQuestionBtn" onclick="nextQuestion()"></button>
    </div>
  </div>
  `;
}

function showEndscreen() {
    document.getElementById('rightSection').innerHTML = '';
    document.getElementById('rightSection').innerHTML += `
    <div class="finalScreen">
        <img src="./img/brain_result.png">
        <h2>HTML QUIZ FERTIG!</h2>
        <h3>DEINE PUNKTZAHL <div class="finalScore">${rightAnswerCount}/${questions.length}</div></h3>
        <button class="btn bg-primary text-white">TEILEN</button>
        <button class="btn text-primary" onclick="resetQuiz()">NOCHMAL SPIELEN</button>
    </div>
    `;
    document.getElementById('trophy').classList.remove('dnone');
    document.getElementById('progressbar').style = 'width: 100%';
    document.getElementById('progressbar').innerHTML = '100%';
}

function showNextQuestion() {
    currentQuestion++;
    showQuestion();
    resetAnswerStyle();
}

function resetAnswerStyle() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).parentNode.classList.remove('wronganswer');
        document.getElementById(`answer_${i}`).parentNode.classList.remove('correctanswer');
        document.getElementById(`letter_answer_${i}`).classList.remove('wronganswer-letter');
        document.getElementById(`letter_answer_${i}`).classList.remove('correctanswer-letter');
    }
}

function disableAnswers() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).parentNode.onclick = "";
    }
}

function resetQuiz() {
    currentQuestion = 0;
    rightAnswerCount = 0;
    updateProgressbar();
    showStartScreenHTML();
}