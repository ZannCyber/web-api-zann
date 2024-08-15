const axios = require('axios');
const FormData = require('form-data');
const yts = require('yt-search');

// Function to fetch YouTube video and audio details
async function youtube(url) {
    try {
        const form = new FormData();
        form.append('url', url);

        const response = await axios.post('https://www.aiodownloader.in/wp-json/aio-dl/video-data/', form, {
            headers: form.getHeaders(),
        });

        const data = response.data;
        const result = {
            title: data.title,
            thumbnail: data.thumbnail,
            duration: data.duration,
            video: {
                url: data.medias[0].url,
                size: data.medias[0].size,
                quality: data.medias[0].quality,
                formattedSize: data.medias[0].formattedSize,
            },
            audio: {
                url: data.medias[5].url,
                size: data.medias[5].size,
                quality: data.medias[5].quality,
                formattedSize: data.medias[5].formattedSize,
            },
        };

        return result;
    } catch (error) {
        throw error;
    }
}

// Function to search for YouTube videos
async function search(query) {
    try {
        const response = await yts(query);
        const results = response.videos.map(video => ({
            title: video.title,
            url: video.url,
            thumbnail: video.image,
            duration: {
                seconds: video.seconds,
                timestamp: video.timestamp,
            },
            views: video.views,
            publish: video.ago,
        }));

        return results;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    youtube,
    search
};
