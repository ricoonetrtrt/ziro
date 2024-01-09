const fs = require("fs");
module.exports.config = {
  name: "مرحبا",
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
  if (event.body.indexOf("مرحبا")==0 || (event.body.indexOf("زب")==0 || (event.body.indexOf("اختك")==0 || (event.body.indexOf("زهي")==0)))) {
    var msg = {
        body: "welcome~~",
        attachment: fs.createReadStream(__dirname + `/noprefix/box.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😸", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }