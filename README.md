##what is this?

An automation script made with JS, node and puppeteer to help you book KTM train tickets. 
From Woodlands to JB Sentral. and back, depending on which function (start() or back()) you choose. 

##How to use this

For starters, if you're interested about the basics, refer to https://codeburst.io/a-guide-to-automating-scraping-the-web-with-javascript-chrome-puppeteer-node-js-b18efb9e9921

It's a great guide.

Else, just do the steps below:

##Required

You need node. Install it the usual way.

Also, you need puppeteer module, either install globally or in your project directory.
>npm install --save puppeteer

Refer to https://github.com/GoogleChrome/puppeteer for more info about its API or stuff.

##Execution

Only use ktm.js, the rest are code examples I was learning from.

In the file ktm.js, comment out either functions: 
> start()

> //back()

By default, it's start().

Then, just execute the file ktm.js: 
>node ktm.js

Your Chrome browser should start and you can see what happens.

You can also try running both functions. I think the KTM website might show an error, maybe too many requests? I'm not sure.

##Limitations

- Only works for the KTM website.
- This tool will NOT help you book tickets.
- After getting train results, user has to book manually, i.e. select the exact timing they want, etc.

##Known Issues

When buying the ticket, the browser window might be too short to click the "pay" button.
You need to zoom out by pressing ctrl + '-', or how you usually zoom out.
This way, you can see more of the website.


##Future Improvements


###Console Query

The console will prompt you on your going and return dates, plus timings.


###Online or serverless

To learn how to host this online or serverless, so that user can run this from anywhere using a browser.
