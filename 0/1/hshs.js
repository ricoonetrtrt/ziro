const fs = require("fs");
module.exports.config = {
  name: "زاهيا",
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
  if (event.body.indexOf("الحوا")==0 || (event.body.indexOf("زاهيا")==0 || (event.body.indexOf("L7wa")==0 || (event.body.indexOf("Zahya")==0)))) {
    var msg = {
        body: "زاهياااااااا~~",
        attachment: fs.createReadStream(__dirname + `/noprefix/rankup.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😸", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }