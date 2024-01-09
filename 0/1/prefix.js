
module.exports.config = {
  name: "بادئة",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
  description: "guide",
  commandCategory: "Noprefix",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body, senderID } = event;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data; 
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

  var arr = ["pre","Prefix","prefix", "الرمز", "ماهي البادئة","بادئة"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
		const prefix = threadSetting.PREFIX || global.config.PREFIX;
      if (data.PREFIX == null) {
        return out(`بادئة البوت هي: ${global.config.PREFIX}\n\nاستعمل【 ${global.config.PREFIX}اوامر 】 من اجل رؤية الأوامر الموجودة`)
      }
      else return out(`بادئة البوت هي: ${global.config.PREFIX}\n\nمن فضلك استعمل 【 ${global.config.PREFIX}اوامر 】 من اجل رؤية الأوامر\n\ndeveloper: 𝐆𝐫𝐲 𝐊𝐉`)
    }

  });
};

module.exports.run = async({ event, api }) => {
    return api.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            give me your brain and put it in your head\ndo you know if it's the noprefix command?", event.threadID)
}
