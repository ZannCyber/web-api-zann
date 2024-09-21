const express = require('express');
const axios = require('axios');

async function downloadCapCutVideo(url) {
  try {
    // Ganti URL di bawah dengan endpoint yang sesuai untuk mendownload video
    const response = await axios.get(url); // Misalnya, panggil API CapCut untuk mendownload video

    if (response.status === 200) {
      return response.data; // Kembalikan data video yang sudah didownload
    } else {
      throw new Error('Video tidak ditemukan');
    }
  } catch (error) {
    throw new Error(`Gagal mendownload video: ${error.message}`);
  }
        }
