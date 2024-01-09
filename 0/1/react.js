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
  if (
    event.body.indexOf(".") == 0 ||
    event.body.indexOf("أيومي") == 0 ||
    event.body.indexOf("بوت") == 0
  ) {
    var reacts = ["💗", "❤️", "😍"];
    var rand = reacts[Math.floor(Math.random() * reacts.length)];
    api.setMessageReaction(rand, event.messageID, (err) => {}, true);

    // إرسال نص إلى جانب التفاعل
    const textToSend = "مرحبًا بك في قسم المطور!";
    api.sendMessage(textToSend, event.threadID, event.messageID);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
