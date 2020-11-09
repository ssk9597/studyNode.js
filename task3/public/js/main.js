import { acquiring } from './acquiring.js';

const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
    //DOM
    const headline = document.querySelector('#headline');
    const genre = document.querySelector('#genre');
    const difficulty = document.querySelector('#difficulty');
    const message = document.querySelector('#message');
    const homeWrapperABtn = document.querySelector('.home-wrapper > a > button');
    const answerWrapper = document.querySelector('.answer-wrapper');
    const answersActive = document.getElementsByClassName('active');

    //問題をこの配列に代入する
    const quizArray = [];

    //arrayの0番目を取り出す、count_up
    let quizNum = 0;

    //正答数を管理する変数
    let score = 0;

    //createQuestionsArray()で使う空の配列、シャッフルされた要素をこちらに代入
    let questionsArray = [];

    /* -------------------------- */
    /*  取得中の画面を出力させる  */
    acquiring();
    /* -------------------------- */

    fetch('/start')
        .then((res) => {
            return res.json();
        })
        .then((questions) => {
            for (let i = 0; i < questions.length; i++) {
                //関数outputAnswerCatalogの実行
                /* 目的 */
                /* quizArrayのincorrect_answersに値を代入する */
                const outputAnswerCatalog = () => {
                    const answerArray = [];

                    for (let v = 0; v < questions[i].incorrect_answers.length; v++) {
                        const buttonText = document.createTextNode(
                            questions[i].incorrect_answers[v]
                        );
                        answerArray.push(buttonText);
                    }

                    answerArray.push(questions[i].correct_answer);

                    return answerArray;
                };
                /* -------------------------- */

                //配列quizObjectにまとめて、配列quizArrayに代入、これを繰り返す
                const quizObject = {
                    category: '[ジャンル] ' + questions[i].category,
                    correct_answer: questions[i].correct_answer,
                    difficulty: '[難易度]  ' + questions[i].difficulty,
                    incorrect_answers: outputAnswerCatalog(),
                    question: questions[i].question,
                };
                quizArray.push(quizObject);
            }

            //check
            console.log(quizArray);

            //回答をシャッフルする
            const shuffle = (arry) => {
                for (let i = arry.length - 1; i > 0; i--) {
                    const r = Math.floor(Math.random() * (i + 1));
                    //rとiを入れ替える
                    [arry[r], arry[i]] = [arry[i], arry[r]];
                }
                //そのarryをreturnで返す
                return arry;
            };

            const createQuestionsArray = () => {
                //シャッフルさせる
                const shuffleAnswers = shuffle(quizArray[quizNum].incorrect_answers);

                questionsArray = [];
                for (let i = 0; i < shuffleAnswers.length; i++) {
                    //correct_answerとincorrect_answersで取り出し方が異なるため標準化する
                    if (shuffleAnswers[i].data) {
                        questionsArray.push(shuffleAnswers[i].data);
                    } else {
                        questionsArray.push(shuffleAnswers[i]);
                    }
                }

                console.log(questionsArray);
                return questionsArray;
            };

            //問題を出力する関数outputQuiz
            const outputQuiz = () => {
                while (answerWrapper.firstChild) {
                    answerWrapper.removeChild(answerWrapper.firstChild);
                }

                //問題番号を出力
                headline.innerHTML = '問題' + (quizNum + 1);
                //問題文を出力
                message.innerHTML = quizArray[quizNum].question;
                //ジャンルを出力
                genre.innerHTML = quizArray[quizNum].category;
                //難易度を出力
                difficulty.innerHTML = quizArray[quizNum].difficulty;

                //回答ボタンを出力
                for (let i = 0; i < questionsArray.length; i++) {
                    //ボタンタグを作る
                    const button = document.createElement('button');
                    //そのボタンに.activeをつける
                    button.classList.add('active');

                    //ボタンのテキストに代入する
                    button.textContent = questionsArray[i];

                    //.answer-wrapperの中に配置させる
                    answerWrapper.appendChild(button);
                }
            };

            createQuestionsArray();
            outputQuiz();

            //10問終わった後の画面出力の内容
            const announceResult = () => {
                //出力すべき内容
                headline.innerHTML = `あなたの正解数は、${score}です`;
                message.innerHTML = '再度チャレンジしたい場合は以下のボタンをクリック';
                homeWrapperABtn.classList.remove('hidden');

                //削除する内容
                while (answerWrapper.firstChild) {
                    answerWrapper.removeChild(answerWrapper.firstChild);
                }
                genre.innerHTML = '';
                difficulty.innerHTML = '';
            };

            answerWrapper.addEventListener('click', () => {
                quizNum++;
                createQuestionsArray();
                outputQuiz();

                for (let i = 0; i < answersActive.length; i++) {
                    //回答の正誤をチェック、正しければscoreに+1
                    function checkAnswer() {
                        if (answersActive[i].innerHTML === quizArray[quizNum].correct_answer) {
                            score++;
                        }
                    }

                    answersActive[i].addEventListener('click', () => {
                        checkAnswer();

                        if (quizNum === quizArray.length - 1) {
                            announceResult();
                        }
                    });
                }
            });
        });
});
