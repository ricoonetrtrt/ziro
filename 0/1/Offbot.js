module.exports.config = {
  name: "ايقاف",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ƤӇƠƬƠƝ 𖠰",
  description: "ايقاف تشغيل البوت",
  commandCategory: "النظام",
  cooldowns: 0
        };
module.exports.run = ({event, api}) =>{
    const permission = [`100075085058816`];
  if (!permission.includes(event.senderID)) return api.sendMessage("انت لا تمتلك الصلاحية.\nفقط ريكو", event.threadID, event.messageID);
  api.sendMessage(`[ حسنا ] ${global.config.BOTNAME} تم ايقاف تشغيله .`,event.threadID, () =>process.exit(0))
}