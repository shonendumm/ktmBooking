const puppeteer = require('puppeteer');

async function getPic() {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('http://books.toscrape.com/');
  // await page.goto('https://eticket.ktmb.com.my/eticket');
  await page.setViewport({width: 1000, height:800});

  await page.waitFor(1000);

  browser.close();
  

}

getPic();