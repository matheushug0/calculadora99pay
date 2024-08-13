const puppeteer = require("puppeteer");

async function calc() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchUrl = `https://www.melhorcambio.com/cdi`;
  await page.goto(searchUrl);
  //await page.screenshot({ path: "example.png" });

  const result = await page.evaluate(() => {
    return document.querySelector("#inp-mes").value;
  });

  console.log(`Cdi Atual - Mensal: ${result}`);
  let cdiMensal = result;
  let numStr = cdiMensal.replace(/[^0-9,]/g, "").replace(",", ".");
  let num = parseFloat(numStr);
  console.log(num);
  await browser.close();

  return num;
}

calc();
