test = {
    "name": "Makroökonómia",
    "modules": [
    {
        "name": "Alapfogalmak",
        "modules": [
        {
            "name": "Háztartások",
            "modules": [
            {
                "name": "Hazai",
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
                }]
            },
            {
                "name": "Külföldi",
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
                }]
            }],
        },
        {
            "name": "Vállalatok",
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
            }]
        }]
    }]
};

quiz = new Quiz(test);

quizzes.addQuiz(quiz);

//delete test;
delete quiz;
