//modules
const request = require('request');

//QuestionsAPI
const url = 'https://opentdb.com/api.php?amount=10';

module.exports = (req, res) => {
    request.get(
        {
            url: url,
            headers: { 'Content-type': 'application/json' },
            json: true,
        },
        (err, req, data) => {
            questionsArray = data.results;

            for (let i = 0; i < questionsArray.length; i++) {
                const outputAnswerCatalog = () => {
                    const answersArray = [];

                    for (let v = 0; v < questionsArray[i].incorrect_answers.length; v++) {
                        answersArray.push(questionsArray[i].incorrect_answers[v]);
                    }

                    //正解の回答もこちらに代入しておく
                    answersArray.push(questionsArray[i].correct_answer);

                    return answersArray;
                };

                const quizObject = {
                    category: '[ジャンル] ' + questionsArray[i].category,
                    difficulty: '[難易度]  ' + questionsArray[i].difficulty,
                    correct_answer: questionsArray[i].correct_answer,
                    answers_array: outputAnswerCatalog(),
                    question: questionsArray[i].question,
                };
                quizArray.push(quizObject);
            }
            console.log(quizArray);
            res.json(quizArray);
        }
    );
};
