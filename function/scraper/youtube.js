const yts = require('yt-search');

async function youtubev3(query) {
  try {
    const data = await yts(query);
    return data;
  } catch (e) {
    throw e;
  }
}

module.exports = youtubev3;
