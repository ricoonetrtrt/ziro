const fs = require("fs");
module.exports.config = {
  name: "صوص",
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
  if (event.body.indexOf("صو")==0 || (event.body.indexOf("زامل")==0 || (event.body.indexOf("مك")==0 || (event.body.indexOf("مشكوك")==0)))) {
    var msg = {
        body: "صوص~~",
        attachment: fs.createReadStream(__dirname + `/noprefix/sus.mp3`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😸", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }