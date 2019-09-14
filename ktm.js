const puppeteer = require('puppeteer');


const dateGo = '12/10/2019'; // date of going JB must be xx/xx/xx

const dateGoArray = ['06/10/2019','07/10/2019'];

const dateReturn = dateGo; // date of coming back 
const timeGo = 1; // 1 = all, 2 = 12am-7am, 3 = 7am-12pm, 4 = 12pm-7pm, 5 = 7pm-12am
const timeReturn = 1; // not sure if correct TODO:
let repeat = true;

start();


// returnKTM();
async function start() {
    const browser = await puppeteer.launch({headless:false});
    
    let goKTM = async (date) => {
        
        // should ask for user input to continue? If no, repeat = false
        // ask user input for date and time
        const page = await browser.newPage();
        await page.goto('https://eticket.ktmb.com.my/eticket');
        await page.setViewport({width: 1200, height:1200});

        await page.waitFor(1000);
        
        await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(1) > select'); // select departure
        await page.keyboard.type('ww'); // woodlands
        await page.keyboard.press('Escape');

        await page.waitFor(1000); // wait for UI after selection

        await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(2) > select'); // select destination
        await page.keyboard.type('J'); // jb sentral
        await page.keyboard.press('Escape');

        await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(3) > div > input'); // select date
        await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(3) > div > div > ul > li.uib-button-bar.ng-scope > span > button.btn.btn-sm.btn-danger.uib-clear.ng-binding');
        await page.keyboard.type(date); 

        await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(4) > select'); // select timing
        await page.keyboard.type('d');
        for (var i = 1; i <= timeGo; i++) {
            await page.keyboard.press('ArrowDown')
        }
        await page.keyboard.press('Escape');

        await page.waitFor(1000); // check time

        await page.click('#taboneway > form > ul:nth-child(3) > li:nth-child(1) > select');
        await page.keyboard.type('2'); // 2 adults
        await page.keyboard.press('Escape');

        let picName = date.replace('/', '-'); // date string contains '/' which interferes with saving pic
        picName = picName.replace('/', '-'); // do it twice since can't no replaceAll function and using escape // is a comment
        await page.screenshot({ fullPage:true, path: `${picName}.png` }); // take a pic before sending request
        await page.click('#taboneway > form > ul:nth-child(3) > li:nth-child(3) > input');

        await page.waitFor(5000);      
        const result = await page.evaluate(() => {
            // #\33  > div:nth-child(3) > div:nth-child(1) > div > span.skin-clr
            // #\32  > div:nth-child(3) > div:nth-child(1) > div > span.skin-clr
            // #\31  > div:nth-child(3) > div:nth-child(1) > div > span.skin-clr

            let initialRes = document.querySelector('#\\31  > div:nth-child(3) > div:nth-child(1) > div > span.skin-clr');            
            if (initialRes == null) {
                initialRes = document.querySelector('#tab4 > div:nth-child(4)');
            }    
            let text = initialRes.innerText;        
            return text;
        });
        // console.log(result);
        return result;
        
    };

    for (var i = 0; i < dateGoArray.length; i++) { // iterate through dates provided
        var x = 0; // reinitialise it everytime.
        x = await goKTM(dateGoArray[i]);
        if (x.includes('Opps')) {
            console.log('No train, pls try again.');
        } else { // else if x.includes(positive results)
        console.log('Success! Got train, go book it');
        repeat = false; 
        };
    };


    // goKTM().then((value) => {
    //     console.log(value);
    //     if (value.includes('Opps')) {
    //         console.log('Hi Soo Hian, no train, pls try again.');
    //     } else {
    //         console.log('Success.');
    //     }
    // });

   
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