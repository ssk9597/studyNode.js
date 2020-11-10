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
                const answersArray = [];
                for (let v = 0; v < questionsArray[i].incorrect_answers.length; v++) {
                    answersArray.push(questionsArray[i].incorrect_answers[v]);
                }

                //正解の回答もこちらに代入しておく
                answersArray.push(questionsArray[i].correct_answer);

                // //シャッフル
                const shuffle = (arry) => {
                    for (let t = arry.length - 1; t > 0; t--) {
                        const r = Math.floor(Math.random() * (t + 1));
                        //rとtを入れ替える
                        [arry[r], arry[t]] = [arry[t], arry[r]];
                    }
                    //そのarryをreturnで返す
                    return arry;
                };

                const createQuestionsArray = () => {
                    //シャッフル
                    const shuffleAnswers = shuffle(answersArray);

                    array = [];

                    for (let i = 0; i < shuffleAnswers.length; i++) {
                        //correct_answerとanswers_arrayで取り出し方が異なるため標準化する
                        if (shuffleAnswers[i].data) {
                            array.push(shuffleAnswers[i].data);
                        } else {
                            array.push(shuffleAnswers[i]);
                        }
                    }

                    return array;
                };

                const quizObject = {
                    category: '[ジャンル] ' + questionsArray[i].category,
                    difficulty: '[難易度]  ' + questionsArray[i].difficulty,
                    correct_answer: questionsArray[i].correct_answer,
                    answers_array: createQuestionsArray(),
                    question: questionsArray[i].question,
                };
                quizArray.push(quizObject);
            }
            console.log(quizArray);
            res.json(quizArray);
        }
    );
};
