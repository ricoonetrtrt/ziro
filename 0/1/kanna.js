module.exports.config = {
  name: "كانا",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
  description: "شاهد صور لتنانين صغيرة",
  commandCategory: "صور-عشوائية",
  usages: "كانا",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://apikanna.khoahoang2.repl.co').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `⚡️هذه كانا <3\n⚡️عدد الصور المتاحة: ${count} صورة`,
            attachment: fs.createReadStream(__dirname + `/cache/kanna.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/kanna.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/kanna.${ext}`)).on("close", callback);
      })
}