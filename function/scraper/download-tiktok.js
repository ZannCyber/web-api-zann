const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

async function downloadTikTok(url) {
  try {
    const response = await axios.post("https://ttsave.app/download", null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        url: url
      }
    });

    // Sesuaikan dengan struktur data yang diterima dari API
    const downloadLink = response.data.downloadUrl; // Gantilah dengan key yang tepat dari response

    return downloadLink;
  } catch (error) {
    console.error('Error fetching download link:', error.message);
    throw error;
  }
}

app.post('/download-tiktok', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send({ error: 'URL is required' });
  }

  try {
    const downloadLink = await downloadTikTok(url);
    res.send({ downloadLink });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch download link' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
