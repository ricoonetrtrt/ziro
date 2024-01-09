const fs = require("fs");
module.exports.config = {
  name: "المطور",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Gry KJ",
  description: "no prefix",
  commandCategory: "No command marks needed",
  usages: "Yo Yo",
  cooldowns: 5,
};
module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("المطور")==0 || (event.body.indexOf("المالك")==0 || (event.body.indexOf("مطور")==0))) {
    var msg = {
      body: "اسمه : Ŕi Čo\nعمره : 17 \nبلده : المغرب\n رابط حسابه : https://www.facebook.com/ricodzz",
      attachment: fs.createReadStream(`${__dirname}/noprefix/random/${Math.floor(Math.random() * 5)}.jpg`)
    }
    api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction("💗", event.messageID, (err) => {}, true)
      }
    }
    module.exports.run = function({ api, event, client, __GLOBAL }) {

    }