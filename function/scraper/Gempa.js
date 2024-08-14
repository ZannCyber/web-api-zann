const axios = require('axios');
const cheerio = require('cheerio');

async function Gempa() {
  try {
    const response = await axios.get('https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg');
    const $ = cheerio.load(response.data);
    const urlElems = $('table.table-hover.table-striped');

    // Memeriksa dan menyimpan hasil parsing HTML untuk mendapatkan informasi gempa
    const urlSpan = urlElems.find('tbody').first();
    const urlData = urlSpan.find('tr').first();

    const Waktu = urlData.find('td').eq(1).text();
    const Letak = urlData.find('td').eq(2).text();
    const Magnitudo = urlData.find('td').eq(3).text();
    const Kedalaman = urlData.find('td').eq(4).text();
    const Wilayah = urlData.find('td').eq(5).text();

    const lintang = Letak.split(' ')[0];
    const bujur = Letak.split(' ')[2];
    const mapLink = $('div.row > div > img').attr('src');

    if (!Waktu || !Letak || !Magnitudo || !Kedalaman || !Wilayah) {
      throw new Error('Data gempa tidak lengkap');
    }

    return {
      status: true,
      code: 200,
      result: {
        Waktu,
        Lintang: lintang ?? '',
        Bujur: bujur ?? '',
        Magnitudo,
        Kedalaman: Kedalaman.replace(/\t/g, '').replace(/I/g, ''),
        Wilayah: Wilayah.replace(/\t/g, '').replace(/I/g, '').replace('-', '').replace(/\r/g, '').split('\n')[0] ?? '',
        Map: mapLink
      }
    };
  } catch (error) {
    throw error;
  }
}

module.exports = Gempa;
