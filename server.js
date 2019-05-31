const express = require("express");
const path = require("path");
const sith = require('./app/data/friends');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function findMatch(newSith){
    let bestMatchIndex = 0;
    let lowestScore = 999;
    for (i = 0; i < sith.length; i++) {
        let score = 0;
        for (j = 0; j < 10; j++) {
            score += Math.abs(sith[i].scores[j] - newSith.scores[j])
        }
        if (score < lowestScore) {
            lowestScore = score;
            bestMatchIndex = i;
        }
    }
    console.log(sith[bestMatchIndex]);
    return sith[bestMatchIndex];
}

app.get('/api/sith', function(req, res){
    return res.json(sith);
});

app.post('/api/sith', function(req, res){
    let newSith = req.body;
    let bestMatch = findMatch(newSith);
    sith.push(newSith);
    res.json(bestMatch);
});

app.get('/survey', function(req, res){
    res.sendFile(path.join(__dirname, 'public/survey.html'));
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'public/home.html'));
});

// Starts server

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

