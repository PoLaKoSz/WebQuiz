test = {
    "name": "Matematika",
    "modules": [
    {
        "name": "DiMat",
        "modules": [
        {
            "name": "Vektorok",
            "modules": [
            {
                "name": "Nullvektorok",
                "questions": [
                    {
                        "answers": [
                            "Jó",
                            "Rossz",
                        ],
                        "correctIndexes": [
                            0,
                        ],
                        "question": "Milyen a nullvektor?",
                    }
                    ]
            },
            {
                "name": "Helyvektorok",
                "questions": [
                {
                    "answers": [
                        "Igen",
                        "Nem",
                    ],
                    "correctIndexes": [
                        0,
                    ],
                    "question": "Milyen a helyvektor?",
                }
                ]
            }],
        }]
    },
    {
        "name": "Analízis",
        "modules": [
        {
            "name": "Komplex számok",
            "modules": [
            {
                "name": "Beveztés",
                "questions": [
                    {
                        "answers": [
                            "Igen",
                            "Nem",
                        ],
                        "correctIndexes": [
                            0,
                        ],
                        "question": "Milyen a bevezetés?",
                    }
                    ]
            },
            {
                "name": "Példák",
                "questions": [
                    {
                        "answers": [
                            "Jók",
                            "Rosszak",
                        ],
                        "correctIndexes": [
                            0,
                        ],
                        "question": "Milyek a példák?",
                    }
                    ]
            }],
        }]
    }]
};

quiz = new Quiz(test);

quizzes.addQuiz(quiz);

delete test;
delete quiz;
