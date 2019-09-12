const puppeteer = require('puppeteer');

const dateReturn = '23/09/2019'; // date of coming back 

async function returnKTM() {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://eticket.ktmb.com.my/eticket');
    await page.setViewport({width: 1000, height:800});

    await page.waitFor(1000);
    
    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(1) > select');
    await page.keyboard.type('J'); // JB
    await page.keyboard.press('Escape');

    await page.waitFor(1000); // wait for UI after selection


    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(2) > select');
    await page.keyboard.type('ww'); // woodlands
    await page.keyboard.press('Escape');

    await page.waitFor(1000); // wait for UI after selection

    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(3) > div > input');
    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(3) > div > div > ul > li.uib-button-bar.ng-scope > span > button.btn.btn-sm.btn-danger.uib-clear.ng-binding');
    await page.keyboard.type(dateReturn); 

    await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(4) > select');
    await page.keyboard.type('d');
    await page.keyboard.press('ArrowDown'); // time of going JB 
    await page.keyboard.press('ArrowDown'); // 7am-12pm
    await page.keyboard.press('ArrowDown'); // 12pm-7pm
    await page.keyboard.press('ArrowDown'); // 7pm-12am
    await page.keyboard.press('Escape');

    await page.waitFor(1000); // check time

    await page.click('#taboneway > form > ul:nth-child(3) > li:nth-child(1) > select');
    await page.keyboard.type('2'); // 2 adults
    await page.keyboard.press('Escape');

    await page.click('#taboneway > form > ul:nth-child(3) > li:nth-child(3) > input');

    // await page.waitFor(15000);
    // browser.close();

};

returnKTM();

// scrape().then((value) => {
//     console.log(value);
// });