//Norbid 2018 by Matt Cruz and the eople whose code he stole

      // This project was really to find a fun way to learn how to utilize an API
      // I chose twitter's api after hearing a podcast that had Jonny Sun and he
      // spoke about his twitter bots. I plan on taking what I learned here and 
      // applying it elsewhere. Is this the best haiku writing bot? Hell no. But,
      // it was incredibly fun to make and when you get the first 'Success' returned,
      // you'll know what you did it. Steal this code and make it your own. I may tweak
      // Norbid in the future over time but this is where I left it happily.

      // What does this bot do? 
      // Tweets haikus every 42 minutes (yes, because od Douglas Adams) (set in var minutes ) 
      // or if someone tweets at it see ~ lines 164 on)

      // How does it do it? 
      // writePoem() cycles through templates of module which import from other js files, 
      // these are used in a for loop that checks the syllable count and either returns 
      // or only adds to the poem variable. If you want to steal this code to just 
      // tweet something, strip out the haiku app and use the poem variable to deliver the status
      // Bot does not upload images because I didn't feel like it, but maybe later. 



//Required variables
const express = require("express"); // Relic (probably unsued but to afraid to remove it)
const app = express(); // Relic (probably unsued but to afraid to remove it)

const config = require('./config.js'); //calls for the authentication key to present
var twit = require('twit'); //installs twit module (accesses library)
const Twitter = new twit(config); //sets up var to use



//imports libraries and delcares prepositions
var w1a = require('./oneSyl.js');
var n2a = require('./twoSyl.js');
var v1a = require('./verbs.js');
var pra = ["to","from","at","while","for","at","by","with",];
var adj = (require('./Adj1.js'));
var adj2 = (require('./Adj2.js'));
var id2 = (require('./Id2.js'));
var id3 = (require('./Id3.js'));

///////////////////////
///////////////////////

//This was the original tweet generated from a third aprty app, since deleted, lives here
var postOutput = "cross subsequent as virus isolate corneal algal smallpox were";
////////////////////////////

//poem variable is served to the twitter post, this declares the var
var poem = "";
//Current array of templates, run through a randomizer, add and remove at will
var Templates =
[
[w1a, v1a, pra, n2a, adj, n2a, v1a, pra, n2a, n2a, v1a, pra, w1a],
[adj, w1a, adj, w1a, adj, w1a, v1a, pra, w1a, n2a, w1a, n2a, v1a, pra, w1a],
[adj, w1a, id3, w1a, v1a, pra, w1a, adj, n2a, w1a, v1a, pra, adj, w1a],
[id2, adj, n2a, n2a, v1a, pra, n2a, w1a, adj, w1a, id3],
[adj2, n2a, v1a, w1a, v1a, pra, adj2, n2a, adj, n2a, v1a],
[id2, adj2, w1a, w1a, v1a, pra, adj2, n2a, adj, w1a, adj2, w1a],
];


//This function writes the poem
function writePoem(){
//start by setting the syllable count to 0 and the poem to null
var sylCount = 0;
poem = "";
//cycle through the templates and select one at random
var Temp = Templates[Math.floor(Math.random() * Templates.length)];
var arrayLength = Temp.length;
//this function returns random values from the selected array like v1a verbs
function run(x) {
	var outPut = x[Math.floor(Math.random() * x.length)];
	return outPut;
};
//For loop that 'writes' the poem, cycling through checking for syls and adding to the sylcount
for (var i = 0; i < arrayLength; i++) {
  //ONE SYLL
    if (
       Temp[i] == w1a && sylCount ==5 || Temp[i] == w1a && sylCount ==12 
   	|| Temp[i] == pra && sylCount ==5 || Temp[i] == pra && sylCount ==12
    || Temp[i] == v1a && sylCount ==5 || Temp[i] == v1a && sylCount ==12
    || Temp[i] == adj && sylCount ==5 || Temp[i] == adj && sylCount ==12) {
     sylCount ++;
   	 poem += "\r\n" + run(Temp[i]).toLowerCase() + " ";
   }
    else if (
       Temp[i] == w1a && sylCount !==5 || Temp[i] == w1a && sylCount !==12 
   	|| Temp[i] == pra && sylCount !==5 || Temp[i] == pra && sylCount !==12
    || Temp[i] == v1a && sylCount !==5 || Temp[i] == v1a && sylCount !==12
    || Temp[i] == adj && sylCount !==5 || Temp[i] == adj && sylCount !==12) {
   	sylCount ++;
   	poem += run(Temp[i]).toLowerCase() + " ";
   }
   
   ///TWO SYLL
    else if (Temp[i] == n2a && sylCount ==5 || Temp[i] == n2a && sylCount ==12 
          || Temp[i] == adj2 && sylCount ==5 || Temp[i] == adj2 && sylCount ==12
          || Temp[i] == id2 && sylCount ==5 || Temp[i] == id2 && sylCount ==12) {
    sylCount = sylCount + 2;
    poem += "\r\n" + run(Temp[i]).toLowerCase() + " ";
   } 
    else if (Temp[i] == n2a && sylCount !==5 || Temp[i] == n2a && sylCount !==12
          || Temp[i] == adj2 && sylCount !==5 || Temp[i] == adj2 && sylCount !==12
          | Temp[i] == id2 && sylCount !==5 || Temp[i] == id2 && sylCount !==12) {
   	sylCount = sylCount + 2;
   	poem += run(Temp[i]).toLowerCase() + " ";
   } 

   /////THREE SYLL
   else if (Temp[i] == id3 && sylCount ==5 || Temp[i] == id3 && sylCount ==12  ) {
    sylCount = sylCount + 3;
    poem += "\r\n" + run(Temp[i]) + " ";
   }
   else if (Temp[i] == id3 && sylCount !==5 || Temp[i] == id3 && sylCount !==12  ) {
    sylCount = sylCount + 3;
    poem += run(Temp[i]) + " ";
   }
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
            var timeStamp = Date.now() * 1000 

            
            console.log('Success ' + formattedTime);
            console.log(" ");
          }
    })
};

// Runs the Write Poem and  when program is initialized
var poemLC = poem.toLowerCase(); //pretty sure this does not work but didnt bother removing it
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
// a deprecation error so I got rid of it for now. 
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


