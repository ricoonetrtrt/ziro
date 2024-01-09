const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "العسكر",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Replit AI",
  description: "Send a random military video from a given link",
  commandCategory: "other",
  usages: " ",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs": "",
    "path": ""
  }
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  try {
    const videoUrl = 'https://api.easy0.repl.co/api/random-military-video';
    const response = await axios.get(videoUrl, { responseType: 'stream' });
    const videoStream = response.data;
    const videoPath = path.join(__dirname, 'military-video.mp4');
    
    const writer = fs.createWriteStream(videoPath);
    videoStream.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    const msg = {
      body: "هاهو الفيديو ديالك ازين",
      attachment: fs.createReadStream(videoPath)
    };

    api.sendMessage(msg, threadID, messageID);
    // Cleanup after sending the video
    fs.unlink(videoPath, (err) => {
      if (err) throw err;
    });

  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("ايرور.", threadID, messageID);
  }
};