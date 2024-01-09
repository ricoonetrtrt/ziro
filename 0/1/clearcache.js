module.exports.config = {
	name: "حذف-المهملات",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "𝐊𝐈𝐓𝐄 凧",
	description: "Delete cache file/folder",
	commandCategory: "system",
	usages: "",
	cooldowns: 2
};

module.exports.run = async function ({ event, api, Currencies, args, Threads }) {
const { writeFileSync, readdirSync, existsSync, unlinkSync } = require('fs-extra');
const permission = [`100075085058816`];
	if (!permission.includes(event.senderID)) return api.sendMessage("لا تمتلك الصلاحية فقط:\n ريكو ", event.threadID, event.messageID);
  /*
  if(args[0] == "spam"){
      const { resolve } = require('path');
for(let i = 0; i < args[1]; i++){
          const path = resolve(__dirname, "cache", i + ".txt");
if (!existsSync(path)) writeFileSync(path, "tdungdeptrai", "utf-8");
  console.log(i)
}
  }
  */
  if(!args[0]){ return api.sendMessage('لم تقم بادخال اسم الملف اللذي تريد حذفه', event.threadID, event.messageID)}
   const listFile = readdirSync(__dirname + '/cache').filter(item => item.endsWith("." + args[0]));
  var msg = "";
  for(i in listFile){
    console.log(listFile[i])
    msg += `${listFile[i]}\n`
  }
  console.log(msg)
  return api.sendMessage(`${msg}\n\nمن فضلك اضغط على Y لمواصلة حذف الملف`, event.threadID, (error, info) =>{
    if(error) console.log(error)
    global.client.handleReply.push({
        step: 0,
        name: this.config.name,
        file_en: args[0],
        messageID: info.messageID,
        author: event.senderID,
      }),
     event.messageID
  })
}
module.exports.handleReply = async function ({ event, api, Currencies, handleReply, Threads }) {
  if(handleReply.author !== event.senderID) return
  if(event.body == "Y"){
    const { writeFileSync, readdirSync, existsSync, unlinkSync } = require('fs-extra');
   const listFile = readdirSync(__dirname + '/cache').filter(item => item.endsWith("." + handleReply.file_en));
  for(i in listFile){
    unlinkSync(__dirname + '/cache/' + listFile[i])
  }
  return  api.sendMessage(`تم حذف ملف ${listFile.length} بالملحق ${handleReply.file_en} بنجاح ✅️`,event.threadID)
  }
  else {
    api.sendMessage(`تبا ☹️`,event.threadID)
  }
}