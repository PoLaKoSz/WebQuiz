class Answer {
	constructor(id, answer) {
		this.ID        = id;
		this.Answer    = answer;
	}
}

class Question {
	constructor(question, answers, correct) {
		this.Question      = question;
		this.AllAnswers    = this.AddID2AllAnswers(answers);
		this.StayedAnswers = this.AllAnswers.slice();
		this.Correct       = correct;
	}

	AddID2AllAnswers(answers) {
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
}

class Quiz {
	constructor(questions) {
		this.Questions      = questions;
		this.MaxCount       = this.Questions.length;
		this.QuestionsCount = this.MaxCount;
	}

	getRandomQuestion()
	{
		var questionIndex = Math.floor(Math.random() * this.Questions.length);
		var      question = this.Questions[questionIndex];

		this.removeIndex(questionIndex);

		return new Question(question['question'], question['answers'], question['correctIndexes']);
	}

	removeIndex(index) {
		this.Questions.splice(index, 1);
		this.QuestionsCount--;
	}
}

var quiz = new Quiz(jsonQuestions['questions']);
var randomQuestion;

function nextQuestionEvent() {
	randomQuestion = quiz.getRandomQuestion();

	document.getElementById("progressBar").value = quiz.MaxCount - quiz.QuestionsCount;

	questionPlaceholder.innerHTML = randomQuestion.Question;
	answers.innerHTML = "";

	for (var i = 0; i < randomQuestion.AllAnswers.length; i++) {
		var answer = randomQuestion.getRandomAnswer();

		answers.innerHTML += '<label><input type="checkbox" value="' + answer.ID + '">' + answer.Answer + "</label><br>";
	}

	if (quiz.QuestionsCount == 0) {
		document.getElementById("nextButton").disabled = true;
	}

	document.getElementById("checkButton").style.display = 'inline';
}

function checkQuestionEvent() {
	var ancestor = document.getElementById('answers');
	var descendents = ancestor.getElementsByTagName('input');

	for (var i = 0; i < descendents.length; i++) {
		var htmlElem = descendents[i];
		htmlElem.disabled = true;

		var answerID = parseInt(htmlElem.value);
		var isCheckedInUI = htmlElem.checked;

		/*
			if not checked in UI and not in the correct answers => true
			if     checked in UI and     in the correct answers => true
		*/
		var isCorrectAnswer = ((isCheckedInUI == false) && (randomQuestion.Correct.includes(answerID) == false)) ||
			((isCheckedInUI && randomQuestion.Correct.includes(answerID)));

		if (isCorrectAnswer) {
			htmlElem.parentNode.style.backgroundColor = "green";
		} else {
			htmlElem.parentNode.style.backgroundColor = "red";
		}
	}

	document.getElementById("checkButton").style.display = 'none';
}
