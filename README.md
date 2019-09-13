**what is this?**

An automation script made with JS, node and puppeteer to help book KTM train tickets. 
From Woodlands to JB Sentral. and back, depending on which function you choose. 

**How to use this**

For starters, refer to https://codeburst.io/a-guide-to-automating-scraping-the-web-with-javascript-chrome-puppeteer-node-js-b18efb9e9921

**Required**

Need to install puppeteer module either globally or in your project directory.
>npm install --save puppeteer

Refer to https://github.com/GoogleChrome/puppeteer for more info.

**Execution**

Only use ktm.js, the rest are code examples I was learning from.

In the file ktm.js, comment out either functions to go or return. So that you don't run both commands. That's crazy. Or maybe you don't have to do this.

Then, just execute the file ktm.js: 
>node ktm.js

Your Chrome browser should start and you can see what happens.

**Known Issues**

When buying the ticket, the browser window might be too short to click the "pay" button.
Then you need to zoom out by pressing ctrl + '-', or how you usually zoom out.
This way, you can see more of the website.


**Future Improvements**

***Check results (WIP)***

To add dom query selector something like that to see whether any results come back.
If no results, then try another timing or another date.


***Console Query***

The console will prompt you on your going and return dates, plus timings, before carrying out the commands.
