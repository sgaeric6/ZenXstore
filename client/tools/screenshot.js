const puppeteer = require('puppeteer');

(async () => {
  const url = process.env.SCREENSHOT_URL || 'http://localhost:3000';
  const out = process.env.SCREENSHOT_OUT || 'screenshot.png';

  console.log(`Opening ${url} and saving to ${out}...`);

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.screenshot({ path: out, fullPage: true });
  await browser.close();

  console.log('Screenshot saved to', out);
})();
