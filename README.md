**what is this?**

An automation script made with JS, node and puppeteer to help book KTM train tickets. 
From Woodlands to JB Sentral. and back, depending on which function you choose. 

**How to use this**

For starters, refer to https://codeburst.io/a-guide-to-automating-scraping-the-web-with-javascript-chrome-puppeteer-node-js-b18efb9e9921

**Required**

Need to install puppeteer node package.
>npm install --save puppeteer

**Execution**
In the file ktm.js, comment out either functions to go or return. So that you don't run both commands. That's crazy.

Then execute the file ktm.js: 
>node ktm.js

Your Chrome browser should start and you can see what happens.


**Future Improvements**

***Check results***

To add dom query selector something like that to see whether any results come back.
If no results, then try another timing or another date.

***Console Query***

The console will prompt you on your going and return dates, plus timings, before carrying out the commands.
