const fs = require("fs");
module.exports.config = {
  name: "عطاك",
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
  if (event.body.indexOf("Aot")==0 || (event.body.indexOf("عطاك")==0 || (event.body.indexOf("اتاك")==0 || (event.body.indexOf("هجوم العمالقة")==0)))) {
    var msg = {
        body: "اعظم انمي مع اعظم نهاية.\n\nعمل لن يكرره التاريخ~~",
        attachment: fs.createReadStream(__dirname + `/noprefix/AOT.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💗", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }