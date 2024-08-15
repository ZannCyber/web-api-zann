const axios = require('axios');
const cheerio = require('cheerio');

async function tiktokDownloader(url) {
  try {
    const response = await axios.get(`https://ttdownloader.com/`);
    const $ = cheerio.load(response.data);
    
    const token = $('input[name="token"]').val();

    const formData = new URLSearchParams();
    formData.append('url', url);
    formData.append('format', '');
    formData.append('token', token);

    const downloadResponse = await axios.post('https://ttdownloader.com/req/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const $$ = cheerio.load(downloadResponse.data);
    const noWatermarkUrl = $$('a.download-link').attr('href');

    if (!noWatermarkUrl) {
      throw new Error('Video tidak ditemukan atau tidak dapat diunduh');
    }

    return noWatermarkUrl;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { tiktokDownloader };
