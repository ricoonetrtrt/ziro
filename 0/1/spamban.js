 const num = 10 //number of times spam gets banned -1, for example 5 times 6 times will get banned
 const timee = 120 // During `timee` spam `num` times will be banned
 module.exports.config = {
  name: "سبام",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓", //fix get by  𝙍𝙖𝙩𝙪𝙡 𝙃𝙖𝙨𝙨𝙖𝙣
  description: `سيتم تلقائيا حظر كل شخص يرسل ${num} رسائل كل ${timee} ثانية`,
  commandCategory: "System",
  usages: "x",
  cooldowns: 5
};

module.exports.run = async function ({api, event})  {
  return api.sendMessage(`سيتم تلقائيا حظر كل شخص يرسل ${num} رسائل كل ${timee} ثانية`, event.threadID, event.messageID);
};

module.exports.handleEvent = async function ({ Users, Threads, api, event})  {
  let { senderID, messageID, threadID } = event;
  var datathread = (await Threads.getData(event.threadID)).threadInfo;
  
  if (!global.client.autoban) global.client.autoban = {};
  
  if (!global.client.autoban[senderID]) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  };
  
  const threadSetting = global.data.threadData.get(threadID) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  if (!event.body || event.body.indexOf(prefix) != 0) return;
  
  if ((global.client.autoban[senderID].timeStart + (timee*1000)) <= Date.now()) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  }
  else {
    global.client.autoban[senderID].number++;
    if (global.client.autoban[senderID].number >= num) {
      var namethread = datathread.threadName;
      const moment = require("moment-timezone");
      const timeDate = moment.tz("Asia/Dhaka").format("DD/MM/YYYY HH:mm:ss");
      let dataUser = await Users.getData(senderID) || {};
      let data = dataUser.data || {};
      if (data && data.banned == true) return;
      data.banned = true;
      data.reason = `spam bot ${num} times/${timee}s` || null;
      data.dateAdded = timeDate;
      await Users.setData(senderID, { data });
      global.data.userBanned.set(senderID, { reason: data.reason, dateAdded: data.dateAdded });
      global.client.autoban[senderID] = {
        timeStart: Date.now(),
        number: 0
      };
      api.sendMessage(senderID + " \n⚡️الاسم: " + dataUser.name + `\n⚡السبب: سبام ${num} التوقيت/${timee}s\n\n✔️تم ابلاغ  Ŕi Čo`, threadID,
    () => {
    var idad = global.config.ADMINBOT;
    for(let ad of idad) {
        api.sendMessage(`⚡️سبام بعدد ${num} لمدة ${timee}ثانية \n⚡️الاسم: ${dataUser.name} \n⚡️ID: ${senderID}\n⚡️ID المجموعة: ${threadID} \n⚡️اسم المجموعة: ${namethread} \n⚡️الوقت: ${timeDate}`, 
          ad);
    }
    })
    }
  }
};
