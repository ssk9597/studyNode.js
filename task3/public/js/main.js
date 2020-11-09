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

    //arrayの0番目を取り出す、count_up
    let quizNum = 0;

    //正答数を管理する変数
    let score = 0;

    /* -------------------------- */
    /*  取得中の画面を出力させる  */
    acquiring();
    /* -------------------------- */

    (async function callAPI() {
        await fetch('/start')
            .then((res) => {
                return res.json();
            })
            .then((questions) => {
                console.log(questions);
                /* -------------------------- */
                /*  出力する  */
                const outputQuiz = () => {
                    while (answerWrapper.firstChild) {
                        answerWrapper.removeChild(answerWrapper.firstChild);
                    }

                    //問題番号を出力
                    headline.innerHTML = '問題' + (quizNum + 1);
                    //問題文を出力
                    message.innerHTML = questions[quizNum].question;
                    //ジャンルを出力
                    genre.innerHTML = questions[quizNum].category;
                    //難易度を出力
                    difficulty.innerHTML = questions[quizNum].difficulty;

                    //回答ボタンを出力
                    for (let i = 0; i < questions[quizNum].answers_array.length; i++) {
                        //ボタンタグを作る
                        const button = document.createElement('button');
                        //そのボタンに.activeをつける
                        button.classList.add('active');

                        //ボタンのテキストに代入する
                        button.textContent = questions[quizNum].answers_array[i];

                        //.answer-wrapperの中に配置させる
                        answerWrapper.appendChild(button);
                    }
                };
                /* -------------------------- */

                /* -------------------------- */
                /*  最終画面  */
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
                /* -------------------------- */

                /* -------------------------- */
                /*  1問目  */
                outputQuiz();

                /*  2問目以降  */
                answerWrapper.addEventListener('click', () => {
                    if (quizNum === questions.length - 1) {
                        announceResult();
                    } else {
                        quizNum++;
                        outputQuiz();

                        for (let i = 0; i < answersActive.length; i++) {
                            //回答の正誤をチェック、正しければscoreに+1
                            const checkAnswer = () => {
                                if (
                                    answersActive[i].innerHTML === questions[quizNum].correct_answer
                                ) {
                                    score++;
                                }
                            };

                            answersActive[i].addEventListener('click', () => {
                                checkAnswer();
                            });
                        }
                    }
                });
                /* -------------------------- */
            });
    })();
});
