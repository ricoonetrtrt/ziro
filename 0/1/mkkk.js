const fs = require("fs");
module.exports.config = {
  name: "ارا",
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
  if (event.body.indexOf("ara ara")==0 || (event.body.indexOf("Ara ara")==0 || (event.body.indexOf("ارا")==0 || (event.body.indexOf("سلام")==0)))) {
    var msg = {
        body: "Ara ara~~",
        attachment: fs.createReadStream(__dirname + `/noprefix/ara.mp3`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😸", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }