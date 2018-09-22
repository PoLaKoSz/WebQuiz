class Answer {
	constructor(id, answer) {
		this.ID        = id;
		this.Answer    = answer;
	}
}

class Question {
	constructor(question, answers, correct) {
		this.Question      = question;
		this.AllAnswers    = this.generateIDs(answers);
		this.StayedAnswers = this.AllAnswers.slice();
		this.Correct       = correct;
	}

	generateIDs(answers) {
		var tmpArr = [];

		for (var i = 0; i < answers.length; i++) {						
			tmpArr.push(new Answer(i, answers[i]));
		}

		return tmpArr;
	}

	getRandomAnswer() {
		var answerIndex = Math.floor(Math.random() * this.StayedAnswers.length);

		var answer = this.StayedAnswers[answerIndex];

		this.removeIndex(answerIndex);

		return answer;
	}

	removeIndex(index) {
		this.StayedAnswers.splice(index, 1);
	}

	shuffledAnswers() {
		var answers = [];

		while (this.StayedAnswers.length != 0) {
			answers.push(this.getRandomAnswer());
		}

		return answers;
	}
}

class Quiz {
	constructor(quiz) {
		this.Name   		= quiz.name;
		this.Questions      = quiz.questions;
		this.RandomQuestion = null;
		this.MaxCount       = this.Questions.length;
		this.QuestionsCount = this.MaxCount;
		this.View 			= null;
	}

	getRandomQuestion() {
		var questionIndex = Math.floor(Math.random() * this.Questions.length);
		var      question = this.Questions[questionIndex];

		this.removeIndex(questionIndex);

		return new Question(question['question'], question['answers'], question['correctIndexes']);
	}

	removeIndex(index) {
		this.Questions.splice(index, 1);
		this.QuestionsCount--;
	}

	nextQuestion() {
		this.RandomQuestion = quizzes.ActiveQuiz.getRandomQuestion();

		this.View.updateQuestion(this.RandomQuestion.Question);

		var progBarValue = quizzes.ActiveQuiz.MaxCount - quizzes.ActiveQuiz.QuestionsCount;
		this.View.updateProgressBar(progBarValue);
		
		this.View.updateAnswers(this.RandomQuestion.shuffledAnswers());
		
		if (quizzes.ActiveQuiz.QuestionsCount == 0) {
			this.View.disableNextButton();
		}

		this.View.showCheckButton();
	}

	checkAnswers() {
		var ancestor = this.View.AnswersDOM;
		var descendents = ancestor.getElementsByTagName('input');
	
		for (var i = 0; i < descendents.length; i++) {
			var answerDOM = descendents[i];
			answerDOM.disabled = true;
			
			var answerID = parseInt(answerDOM.value);
			var isCheckedInUI = answerDOM.checked;
			
			/*
				if not checked in UI and not in the correct answers => true
				if     checked in UI and     in the correct answers => true
			*/
			var isCorrectAnswer = ((isCheckedInUI == false) && (this.RandomQuestion.Correct.includes(answerID) == false)) ||
				((isCheckedInUI && this.RandomQuestion.Correct.includes(answerID)));
			
			if (isCorrectAnswer) {
				answerDOM.parentNode.style.backgroundColor = "green";
			} else {
				answerDOM.parentNode.style.backgroundColor = "red";
			}
		}
		
		this.View.hideCheckButton();
	}
}

class QuizView {
	constructor(htmlDOM) {
		this.Container    = htmlDOM;

		this.QuestionDOM  = document.createElement("p");
		this.AnswersDOM   = document.createElement("p");

		this.NextButton   = document.createElement("button");
		this.NextButton.innerHTML = 'Következő!';
		this.NextButton.setAttribute("onclick","nextQuestionEvent();");

		this.CheckButton  = document.createElement("button");
		this.CheckButton.innerHTML = 'Ellenőrzés!';
		this.CheckButton.setAttribute("onclick","checkQuestionEvent();");
	}

	show() {
		this.Container.innerHTML = "";

		this.Container.appendChild(this.QuestionDOM);
		this.Container.appendChild(this.AnswersDOM);
		this.Container.appendChild(this.NextButton);
		this.Container.appendChild(this.CheckButton);
	}

	/**
	 * @param {string} question 
	 */
	updateQuestion(question) {
		this.QuestionDOM.innerText = question;
	}
	
	/**
	 * @param {int} value 
	 */
	updateProgressBar(value) {
		document.getElementById("progressBar").value = value;
	}
	
	/**
	 * @param {int} value 
	 */
	setProgressBarMax(value) {
		document.getElementById("progressBar").max = value;
	}

	/**
	 * @param {Answer[]} answers 
	 */
	updateAnswers(answers) {
		this.AnswersDOM.innerHTML = "";

		for (var i = 0; i < answers.length; i++) {
			var answer = answers[i];

			this.AnswersDOM.innerHTML += '<label><input type="checkbox" value="' + answer.ID + '">' + answer.Answer + "</label><br>";
		}
	}

	disableNextButton() {
		this.NextButton.disabled = true;
	}

	hideCheckButton() {
		this.CheckButton.style.display = 'none';
	}

	showCheckButton() {
		this.CheckButton.style.display = 'inline';
	}
}

class QuizManager {
	constructor(htmlDOM) {
		this.Quizzes    = [];
		this.ActiveQuiz = null;
		this.View		= new QuizManagerView(htmlDOM);
	}

	/**
	 * @param {Quiz} quiz 
	 */
	addQuiz(quiz) {
		quiz.View = new QuizView(this.View.Container);

		this.Quizzes.push(quiz);
	}

	/**
	 * @param {Quiz} quiz 
	 */
	changeQuiz(quiz) {
		this.ActiveQuiz = quiz;

		this.ActiveQuiz.View.setProgressBarMax(this.ActiveQuiz.MaxCount);

		this.updateQuizName(this.ActiveQuiz);

		this.ActiveQuiz.nextQuestion();

		this.ActiveQuiz.View.show();
	}

	/**
	 * @param {Quiz} quiz 
	 */
	updateQuizName(quiz) {
		this.View.updateQuizHeader(quiz.Name);
	}

	displayQuizSelector() {
		this.View.showSelector();
	}
}

class QuizManagerView {
	constructor(htmlDOM) {
		this.Container = htmlDOM;
	}

	showSelector() {
		this.Container.innerHTML = '<p>Please select a Quiz!</p>';
	}

	updateQuizHeader(content) {
		document.getElementById("quizName").innerHTML = content + " Quiz";
	}
}

htmlDOM = document.getElementById('quizContainer');

var quizzes = new QuizManager(htmlDOM);
quizzes.displayQuizSelector();

delete htmlDOM;

function nextQuestionEvent() {
	quizzes.ActiveQuiz.nextQuestion();
}

function checkQuestionEvent() {
	quizzes.ActiveQuiz.checkAnswers();
}
