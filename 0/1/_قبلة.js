const request = require('request');
const axios = require('axios');
const fs = require('fs-extra');
module.exports.config = {
  name: "قبلة",
    version: "1.0.2",
  hasPermssion: 0,
  credits: "Gry KJ",
  description: "Just type the command with prefix in the beginning aziin",
  commandCategory: "معرفتش فين نحطو",
  usages: "e7m",
    cooldowns: 5, 
};


  module.exports.run = function({ api, event, client, __GLOBAL }) {
  axios.get('https://anime.grykj.repl.co/api/kiss').then(function (response) {
      var imageUrl = response.data.url;
      console.log(imageUrl);
      request({ url: imageUrl, encoding: null }, function (error, response, body) {
          if (error) throw error;
          fs.writeFileSync(__dirname + '/cache/kiss.gif', body);
        api.sendMessage({body: `muaah 💋💋💋`, attachment: fs.createReadStream(__dirname + `/cache/kiss.gif`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/kiss.gif`), event.messageID);
      });
  });
  }