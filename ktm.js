const puppeteer = require('puppeteer');


const dateGo = '12/10/2019'; // date of going JB must be xx/xx/xx
const dateGoArray = ['06/10/2019','07/10/2019']; // list of potential dates to go

const dateReturn = dateGo; // date of coming back
const dateReturnArray = dateGoArray; // list of dates coming back

const timeGo = 1; // 1: all timings, 2: 12am-7am, 3: 7am-12pm, 4: 12pm-7pm, 5: 7pm-12am
const timeReturn = 1; // not sure if correct TODO:

let repeat = true; // for implementing user input later, maybe

// comment out function depending on going or coming back. Can run both too.
// start();
back();

// should ask for user input to enter list of dates TODO:

async function start() {
    
    const browser = await puppeteer.launch({headless:false});
    // let goKTM = async (date) => {
    async function goKTM(date) {

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
        const result = await page.evaluate(() => { // check train timing results
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
        let x = 0; // reinitialise it everytime.
        x = await goKTM(dateGoArray[i]);
        if (x.includes('Opps')) {
            console.log(`No train for ${dateGoArray[i]}, pls try again.`);
        } else { // else if x.includes(positive results)
        console.log(`Success! Got train for ${dateGoArray[i]}, go book it`);
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


async function back() {
    
    const browser = await puppeteer.launch({headless:false});
    // let goKTM = async (date) => {
    async function returnKTM(date) {

        const page = await browser.newPage();
        await page.goto('https://eticket.ktmb.com.my/eticket');
        await page.setViewport({width: 1200, height:1200});

        await page.waitFor(1000);
        
        await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(1) > select'); // select departure
        await page.keyboard.type('J'); // JB
        await page.keyboard.press('Escape');

        await page.waitFor(1000); // wait for UI after selection

        await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(2) > select'); // select destination
        await page.keyboard.type('ww'); // woodlands
        await page.keyboard.press('Escape');

        await page.waitFor(1000); // wait for UI after selection

        await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(3) > div > input'); // select date
        await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(3) > div > div > ul > li.uib-button-bar.ng-scope > span > button.btn.btn-sm.btn-danger.uib-clear.ng-binding');
        await page.keyboard.type(date); 

        await page.click('#taboneway > form > ul:nth-child(1) > li:nth-child(4) > select'); // select timing
        await page.keyboard.type('d');
        for (var i = 1; i <= timeReturn; i++) {
            await page.keyboard.press('ArrowDown')
        }
        await page.keyboard.press('Escape');

        await page.waitFor(1000); // for user to do visual check time

        await page.click('#taboneway > form > ul:nth-child(3) > li:nth-child(1) > select');
        await page.keyboard.type('2'); // 2 adults
        await page.keyboard.press('Escape');

        let picName = date.replace('/', '-'); // date string contains '/' which interferes with saving pic
        picName = picName.replace('/', '-'); // do it twice since can't no replaceAll function and using escape // is a comment
        await page.screenshot({ fullPage:true, path: `${picName}.png` }); // take a pic before sending request
        await page.click('#taboneway > form > ul:nth-child(3) > li:nth-child(3) > input');

        await page.waitFor(5000);      
        const result = await page.evaluate(() => { // check train timing results
            
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

    for (var i = 0; i < dateReturnArray.length; i++) { // iterate through dates provided
        let x = 0; // reinitialise it everytime.
        x = await returnKTM(dateReturnArray[i]);
        if (x.includes('Opps')) {
            console.log(`No return train for ${dateReturnArray[i]}, pls try again.`);
        } else { // else if x.includes(positive results)
        console.log(`Success! Got return train for ${dateReturnArray[i]}, go book it`);
        repeat = false; 
        };
    };


// scrape().then((value) => {
//     console.log(value);
// });