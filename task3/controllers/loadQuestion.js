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
            console.log(questionsArray);
            res.json(questionsArray);
        }
    );
};
