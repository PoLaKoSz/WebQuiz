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
                "questions": []
            },
            {
                "name": "Helyvektorok",
                "questions": []
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
                "questions": []
            },
            {
                "name": "Példák",
                "questions": []
            }],
        }]
    }]
};

quiz = new Quiz(test);

quizzes.addQuiz(quiz);

delete test;
delete quiz;
