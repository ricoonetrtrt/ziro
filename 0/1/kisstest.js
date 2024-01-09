const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "بوسة",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
  description: "Kiss the friend tag",
  commandCategory: "anime",
  usages: "kiss [Tag someone you need Kissing]",
  cooldowns: 5,
};


module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
    var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
  if (!args.join("")) return out("Please tag someone");
  else
  return axios.get('https://media4.giphy.com/media/iseq9MQgxo4aQ/giphy.webp?cid=6c09b9520c8016db9fefa88b96abadbc2494a20537679b91&rid=giphy.webp&ct=g').then(res => {
        let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
        var mention = Object.keys(event.mentions)[0];
                  let tag = event.mentions[mention].replace("@", "");    
        
 let callback = function () {
            api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        api.sendMessage({
						        body: tag + ", I love you very much ❤️",
                                          mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
						attachment: fs.createReadStream(__dirname + `/cache/kiss.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/kiss.${ext}`), event.messageID)
				};
 //   }
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/kiss.${ext}`)).on("close", callback);
			})
    .catch(err => {
                     api.sendMessage("Failed to generate gif, be sure that you've tag someone!", event.threadID, event.messageID);
    api.setMessageReaction("☹️", event.messageID, (err) => {}, true);
                  })     
}
