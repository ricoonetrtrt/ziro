const fs = require("fs");
module.exports.config = {
  name: "ياميتي",
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
  if (event.body.indexOf("سوكونا")==0 || (event.body.indexOf("حاول")==0 || (event.body.indexOf("غمبري")==0 || (event.body.indexOf("Gambare")==0)))) {
    var msg = {
        body: "Gambare Gambare~~",
        attachment: fs.createReadStream(__dirname + `/noprefix/Gambare.mp3`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😸", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }