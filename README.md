# Norbid
Norbid is a twitter bot that writes haikus ever 42m or with a @mention using nodejs and twit


This project was really to find a fun way to learn how to utilize an API
I chose twitter's api after hearing a podcast that had Jonny Sun and he
spoke about his twitter bots. I plan on taking what I learned here and 
applying it elsewhere. Is this the best haiku writing bot? Hell no. But,
it was incredibly fun to make and when you get the first 'Success' returned,
you'll know what you did it.<b> Steal this code and make it your own</b>. I may tweak
Norbid in the future over time but this is where I left it happily.

<b>What does this bot do? </b>
Tweets haikus every 42 minutes (yes, because od Douglas Adams) (set in var minutes ) 
or if someone tweets at it see ~ lines 164 on)

<b>How does it do it? </b>
writePoem() cycles through templates of module which import from other js files, 
these are used in a for loop that checks the syllable count and either returns 
or only adds to the poem variable. If you want to steal this code to just 
tweet something, strip out the haiku app and use the poem variable to deliver the status
Bot does not upload images because I didn't feel like it, but maybe later. 

File to see is Norbid.js

See Norbid in action at <a href="twitter.com/NorbidGrentler">twitter.com/NorbidGrentler</a>
