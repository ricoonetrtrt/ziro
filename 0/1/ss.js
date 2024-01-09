const fs = require("fs");
module.exports.config = {
  name: "اناث",
    version: "1.0.2",
  hasPermssion: 0,
  credits: "Cjas",
  description: "no prefix",
  commandCategory: "No command marks needed",
  usages: "Yo Yo",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("فتاة")==0 || (event.body.indexOf("انثى")==0 || (event.body.indexOf("البنات")==0 || (event.body.indexOf("Women")==0)))) {
    var msg = {
        body: "Women hhhhhhhhhhhhhh~~",
        attachment: fs.createReadStream(__dirname + `/noprefix/women.mp3`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😸", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }