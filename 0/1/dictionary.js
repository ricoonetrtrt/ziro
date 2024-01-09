module.exports.config = {
	name: "قاموس",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "𝐊𝐈𝐓𝐄 凧",
	description: "Look up the dictionary",
  	usage: `Missing input\n\nHow to use?\n${global.config.PREFIX}dictionary <input>\n\nExample:\n${global.config.PREFIX}dictionary aesthetic\n`,
	commandCategory: "study",
  	cooldowns: 5
}

module.exports.run = function({api,event,args}) {
  const { threadID, messageID } = event;
  const fs = require('fs');
  if (args[0]) {
    return require('axios').get(encodeURI(`https://api.dictionaryapi.dev/api/v2/entries/en/${args.join(" ").trim().toLowerCase()}`)).then(res => {
      let data = res.data[0];
      let example = data.meanings[0].definitions.example;
      let phonetics = data.phonetics;
      let meanings = data.meanings
      msg_meanings = "";
      meanings.forEach(items => {
        example = items.definitions[0].example?`\n*example:\n \"${items.definitions[0].example[0].toUpperCase() + items.definitions[0].example.slice(1)}\"`:'';
        msg_meanings += `\n• ${items.partOfSpeech}\n ${items.definitions[0].definition[0].toUpperCase() + items.definitions[0].definition.slice(1) + example}`
      });
      msg_phonetics = '';
      phonetics.forEach(items => {
        text = items.text?`\n    /${items.text}/`:'';
        msg_phonetics += text;
      })
      var msg = `❰ ❝ ${data.word} ❞ ❱` +
                msg_phonetics +
                msg_meanings;
      return api.sendMessage(msg, threadID, messageID);
    }).catch(err => {
      if (err.response.status === 404) {
        return api.sendMessage('لم يتم العثور على شيء', threadID, messageID);
      }
    })
  } else api.sendMessage(`خطا في الادخال\n\nكيف تستخدمه?\n${global.config.PREFIX}مجلد <شيء>\n\nمثال:\n${global.config.PREFIX}مجلد aesthetic\n\nصنع بواسطة: 𝐊𝐈𝐓𝐄 凧`, threadID, messageID);
        }