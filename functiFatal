const puppeteer = require('puppeteer');

async function downloadTikTokVideo(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Tunggu video dimuat
  await page.waitForSelector('video');

  // Ambil URL video
  const videoUrl = await page.evaluate(() => {
    return document.querySelector('video').src;
  });

  await browser.close();
  return videoUrl;
}

module.exports = downloadTikTokVideo;
