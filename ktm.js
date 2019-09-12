const puppeteer = require('puppeteer');

const dateGo = '12/10/2019'; // date of going 
const dateReturn = '12/10/2019'; // date of coming back 
const timeGo = 2; // 1 = 12am-7am, 2 = 7am-12pm, 3 = 12pm-7pm, 4 = 7pm-12am
const timeReturn = 3; // 1 = 12am-7am, 2 = 7am-12pm, 3 = 12pm-7pm, 4 = 7pm-12am

goKTM();
// returnKTM();

async function goKTM() {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://eticket.ktmb.com.my/eticket');
    await page.setViewport({width: 1000, height:800});

    await page.waitFor(1000);
    
    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(1) > select');
    await page.keyboard.type('ww'); // woodlands
    await page.keyboard.press('Escape');

    await page.waitFor(1000); // wait for UI after selection

    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(2) > select');
    await page.keyboard.type('J'); // jb sentral
    await page.keyboard.press('Escape');

    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(3) > div > input');
    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(3) > div > div > ul > li.uib-button-bar.ng-scope > span > button.btn.btn-sm.btn-danger.uib-clear.ng-binding');
    await page.keyboard.type(dateGo); // date of going JB must be xx/xx/xx

    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(4) > select');
    await page.keyboard.type('d');
    // await page.keyboard.press('ArrowDown'); // time of going JB 
    // await page.keyboard.press('ArrowDown'); // 7am-12pm
    // await page.keyboard.press('ArrowDown'); // 12pm-7pm
    // await page.keyboard.press('ArrowDown'); // 7pm-12am

    for (var i = 1; i <= timeGo; i++) {
        await page.keyboard.press('ArrowDown')
    }
    await page.keyboard.press('Escape');

    await page.waitFor(1000); // check time

    await page.click('#taboneway > form > ul:nth-child(3) > li:nth-child(1) > select');
    await page.keyboard.type('2'); // 2 adults
    await page.keyboard.press('Escape');

    await page.click('#taboneway > form > ul:nth-child(3) > li:nth-child(3) > input');

    // await page.waitFor(15000);
    // browser.close();

};




async function returnKTM() {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://eticket.ktmb.com.my/eticket');
    await page.setViewport({width: 1000, height:800});

    await page.waitFor(1000);
    
    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(1) > select');
    // await page.keyboard.type('O') // origin
    await page.keyboard.type('J'); // JB
    await page.keyboard.press('Escape');

    await page.waitFor(1000); // wait for UI after selection, so can choose Woodlands


    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(2) > select');
    await page.keyboard.type('ww'); // woodlands
    await page.keyboard.press('Escape');

    await page.waitFor(1000); // wait for UI after selection

    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(3) > div > input');
    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(3) > div > div > ul > li.uib-button-bar.ng-scope > span > button.btn.btn-sm.btn-danger.uib-clear.ng-binding');
    await page.keyboard.type(dateReturn); 

    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(4) > select');
    await page.keyboard.type('d');
    // await page.keyboard.press('ArrowDown'); // time of going JB 
    // await page.keyboard.press('ArrowDown'); // 7am-12pm
    // await page.keyboard.press('ArrowDown'); // 12pm-7pm
    // await page.keyboard.press('ArrowDown'); // 7pm-12am
    for (var i = 1; i <= timeReturn; i++) {
        await page.keyboard.press('ArrowDown')
    }
    await page.keyboard.press('Escape');

    await page.waitFor(1000); // check time

    await page.click('#taboneway > form > ul:nth-child(3) > li:nth-child(1) > select');
    await page.keyboard.type('2'); // 2 adults
    await page.keyboard.press('Escape');

    await page.click('#taboneway > form > ul:nth-child(3) > li:nth-child(3) > input');

    // await page.waitFor(15000);
    // browser.close();

};


// scrape().then((value) => {
//     console.log(value);
// });