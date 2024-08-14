const puppeteer = require("puppeteer");

async function getValueFromWebsite() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchUrl = `https://puppeteer-render-qb42.onrender.com/api`;
  await page.goto(searchUrl);

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

module.exports = getValueFromWebsite;
