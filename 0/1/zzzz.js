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
  if (event.body.indexOf("Yameti")==0 || (event.body.indexOf("ياميتي")==0 || (event.body.indexOf("حبس")==0 || (event.body.indexOf("توقف")==0)))) {
    var msg = {
        body: "Ahhhhhhhhhhhhhhhhhhhhhhh~~",
        attachment: fs.createReadStream(__dirname + `/noprefix/yamate.mp3`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😸", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }