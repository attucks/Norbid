//NorbidGrentler1_0 2018 by Matt Cruz and the eople whose code he stole
//Required variables
const express = require("express"); // Relic (probably unsued but to afraid to remove it)
const app = express(); // Relic (probably unsued but to afraid to remove it)
var twit = require('twit'); //installs twit module (accesses library)
const config = require('./config.js'); //calls for the authentication key to present
const Twitter = new twit(config); //sets up var to use
var bodyParser = require('body-parser'); 
///Lisener library



//imports libraries and delcares prepositions
var w1a = require('./oneSyl.js');
var w2a = require('./twoSyl.js');
var v1a = require('./verbs.js');
var pra = ["to","from","at","while","for"];

////////////////////////
///////////////////////

//This was the original tweet generated froma thrd aprty app, since deleted, lives here
var postOutput = "cross subsequent as virus isolate corneal algal smallpox were";
////////////////////////////

//poem variable is served to the twitter post, this declares the var
var poem = "";
//Current array of templates, run through a randomizer, add and remove at will
var Templates =
[
[w1a, v1a, w2a, w1a,
w2a, v1a, pra, w1a, w2a,
w1a, w2a, w2a],
[w1a, v1a, w2a, w1a,
w1a, w1a, v1a, pra, w2a, w1a,
w2a, w2a, w1a],
[w1a, v1a, w1a, w1a, w1a,
w1a, v1a, w1a, w1a, pra, w1a, w1a,
w2a, v1a, pra, w1a]
];

// Sets sylCount allows the app to count- this will be useful later as well


//This function writes the poem
function writePoem(){
var sylCount = 0;
poem = "";
var Temp = Templates[Math.floor(Math.random() * Templates.length)];
var arrayLength = Temp.length;
function run(x) {
	var outPut = x[Math.floor(Math.random() * x.length)];
	return outPut;
};

for (var i = 0; i < arrayLength; i++) {
  //line breaks
    if (Temp[i] == w1a && sylCount ==5 || Temp[i] == pra && sylCount ==5 
   	|| Temp[i] == w1a && sylCount ==12 || Temp[i] == pra && sylCount ==12
    || Temp[i] == v1a && sylCount ==5 || Temp[i] == v1a && sylCount ==12) {
     sylCount ++;
   	 poem += "\r\n" + run(Temp[i]).toLowerCase() + " ";
   }
   else if (Temp[i] == w2a && sylCount ==5 || Temp[i] == w2a && sylCount ==12  ) {
   	sylCount = sylCount + 2;
   	poem += "\r\n" + run(Temp[i]).toLowerCase() + " ";
   }
    else if (Temp[i] == w1a && sylCount !==5 || Temp[i] == pra && sylCount !==5 
   	|| Temp[i] == w1a && sylCount !==12 || Temp[i] == pra && sylCount !==12
    || Temp[i] == v1a && sylCount !==5 || Temp[i] == v1a && sylCount !==12 ) {
   	sylCount ++;
   	poem += run(Temp[i]).toLowerCase() + " ";
   } 
    else if (Temp[i] == w2a && sylCount !==5 || Temp[i] == w2a && sylCount !==12  ) {
   	sylCount = sylCount + 2;
   	poem += run(Temp[i]).toLowerCase() + " ";
   };
  };
};


//Tweet function - this actually sends the tweet
function tweetPoem (tweet) {
    Twitter.post('statuses/update', { status: poem }, 
      //error handling, could be improved but connection always works so check the keys if you have a problem
        function(err, data, response) {
          if (err){
            console.log('Error!');
            console.log(err);
          }
          else{
            console.log('Success ' + Date.now());
            console.log(" ");
          }
})
};

// Runs the Write Poem and  when program is initialized
var poemLC = poem.toLowerCase();
writePoem();
console.log(poem);
console.log(" ");
tweetPoem(); 

//Sets how often the bot runs in minutes
var minutes = 42;
// Continues to run once every X minutes
setInterval( function() {
poemLC = poem.toLowerCase();
   writePoem();
 	tweetPoem();
console.log(poem);
console.log(" ");
}, 60 * minutes * 1000);


///////////Retweet Listener: 

//Listens for mentions
var stream= Twitter.stream('user');
stream.on('tweet', tweetEvent);

function tweetEvent(tweetMSG) {
var json = JSON.stringify(tweetMSG, null, 2);

// This is meant to log the tweets but it keeps throwing
// a deprecation error so I got rid of it for now. worth coming 
// back to when this is left on for good
//
//  var fs= require('fs');
//  fs.write("tweets.json", json);

//pulls replyto email and screen_name which took forever
  var replyTo = tweetMSG.in_reply_to_screen_name;
  var from = tweetMSG.user.screen_name;

//checks to be sure the tweet was @ the bot and then
//write a poem and appends their name. consider adding flare 
//somehow. also images eventually, maybe.

  if (replyTo == 'NorbidGrentler') {
    console.log('New tweet from: '+from)
    writePoem();
    poem+= " @"+from;
    console.log(poem);
    console.log(" ");
    tweetPoem();
  }
};


