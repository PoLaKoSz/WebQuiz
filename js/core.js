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