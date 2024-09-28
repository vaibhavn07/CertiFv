const puppeteer = require('puppeteer');
const generateHtml = require('./htmlContent');

async function generatePDFfromHTML(htmlContent, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: outputPath, format: 'A4' });
  await browser.close();
}

module.exports = generatePDFfromHTML;

