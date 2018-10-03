test = {
    "name": "Module test",
    "modules": [
    {
        "name": "Első fejezet",
        "questions": [
        {
            "answers": [
                "Igen",
                "Nem",
            ],
            "correctIndexes": [
                0,
            ],
            "question": "Jó?",
        }
        ]
    }
    ]
}

quiz = new Quiz(test);

quizzes.addQuiz(quiz);

delete test;
delete quiz;
