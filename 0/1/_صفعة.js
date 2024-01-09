const request = require('request');
const axios = require('axios');
const fs = require('fs-extra');
module.exports.config = {
  name: "صفعة",
    version: "1.0.2",
  hasPermssion: 0,
  credits: "Gry KJ",
  description: "Just type the command with prefix in the beginning aziin",
  commandCategory: "معرفتش فين نحطو",
  usages: "e7m",
    cooldowns: 5, 
};


  module.exports.run = function({ api, event, client, __GLOBAL }) {
  axios.get('https://anime-api.hisoka17.repl.co/img/slap').then(function (response) {
      var imageUrl = response.data.url;
      console.log(imageUrl);
      request({ url: imageUrl, encoding: null }, function (error, response, body) {
          if (error) throw error;
          fs.writeFileSync(__dirname + '/cache/slap.gif', body);
        api.sendMessage({body: `رح اصفعك زي كذا`, attachment: fs.createReadStream(__dirname + `/cache/slap.gif`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/slap.gif`), event.messageID);
      });
  });
  }