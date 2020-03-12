var pokeMatch = require('../data/friends.js');

//ROUTING
// Two Routes with express parameters
module.exports = function(app) {
   // A GET json route to display all possible friends
  app.get('/api/friends', function (req, res) {
    res.json(pokeMatch);
  });
  // A POST route to handle incoming survey results
  app.post('/api/friends', function (req, res) {

    //req.body is available since we're using body-parser middleware
    var newPokeFriend = req.body;
    //score loop
    for(var i = 0; i < newPokeFriend.scores.length; i++) {
      if(newPokeFriend.scores[i] == "1 (Yes)") {

        newPokeFriend.scores[i] = 1;
      } else if(newPokeFriend.scores[i] == "3 (No)") {

        newPokeFriend.scores[i] = 3;
      } else {

        newPokeFriend.scores[i] = parseInt(newPokeFriend.scores[i]);
      }
    }
    
    //array for the comparison
    var comparisonArray = [];

    for(var i = 0; i < pokeMatch.length; i++) {
      //Determine the users most compatible friend
      var comparedPokeFriend = pokeMatch[i];
      //calculate the totaldifference between friends
      var totalDifference = 0;
      
      for(var k = 0; k < comparedPokeFriend.scores.length; k++) {
        //return the absolute value of a number *use abs()method
        var differenceOneScore = Math.abs(comparedPokeFriend.scores[k] - newPokeFriend.scores[k]);
        totalDifference += differenceOneScore;
      }

      comparisonArray[i] = totalDifference;
    }

    var bestPokeFriendNum = comparisonArray[0];
    var bestPokeFriendI = 0;

    for(var i = 1; i < comparisonArray.length; i++) {
      if(comparisonArray[i] < bestPokeFriendNum) {
        bestPokeFriendNum = comparisonArray[i];
        bestPokeFriendI = i;
      }
    }
    //push new friend
    pokeMatch.push(newPokeFriend);
    //json bf to the current friend match array
    res.json(pokeMatch[bestFriendI]);
  });
};