const sith = require('./app/data/friends');

module.exports = function(app) {

    app.get('/api/sith', function(req, res){
        return res.json(sith);
    });
    
    app.post('/api/sith', function(req, res){
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

        let newSith = req.body;
        let bestMatch = findMatch(newSith);
        sith.push(newSith);
        res.json(bestMatch);
    });

}
