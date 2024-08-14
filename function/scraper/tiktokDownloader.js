const axios = require('axios');
const cheerio = require('cheerio');

async function tiktokDownloader(url) {
  try {
    const response = await axios.get(`https://ttsave.app/download?url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(response.data);

    // Menyimpan hasil parsing HTML untuk menemukan link unduhan
    const downloadLink = $('a[href*="cdn.tiktokcdn"]').attr('href');

    if (!downloadLink) {
      throw new Error('Link unduhan tidak ditemukan');
    }

    return { downloadLink };
  } catch (error) {
    throw error;
  }
}

module.exports = tiktokDownloader;
