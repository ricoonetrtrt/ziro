const request = require('request');
const axios = require('axios');
const fs = require('fs-extra');
module.exports.config = {
  name: "غمزة",
    version: "1.0.2",
  hasPermssion: 0,
  credits: "Gry KJ",
  description: "Just type the command with prefix in the beginning aziin",
  commandCategory: "معرفتش فين نحطو",
  usages: "e7m",
    cooldowns: 5, 
};


  module.exports.run = function({ api, event, client, __GLOBAL }) {
  api.sendMessage("بغمزة اسقط خمسة 😉", event.threadID, event.messageID );
    axios.get('https://anime-api.hisoka17.repl.co/img/wink').then(function (response) {
      var imageUrl = response.data.url;
      console.log(imageUrl);
      request({ url: imageUrl, encoding: null }, function (error, response, body) {
          if (error) throw error;
          fs.writeFileSync(__dirname + '/cache/wink.gif', body);
        api.sendMessage({body: `هيهيهي`, attachment: fs.createReadStream(__dirname + `/cache/wink.gif`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/wink.gif`), event.messageID);
      });
  });
  }