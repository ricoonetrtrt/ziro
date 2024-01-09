module.exports.config = {
 	name: "بان-السبام",
 	version: "1.0.0",
 	hasPermssion: 0,
 	credits: "𝐊𝐈𝐓𝐄 凧",
 	description: "automatically ban the group by bot if spam bot 10 times/minute",
 	commandCategory: "system",
 	usages: "",
 	cooldowns: 5
 };
 
 module.exports.run = ({api, event}) => {
   api.sendMessage("اذا تم عمل سبام فسيتم حظر المجموعة", event.threadID, event.messageID);
 };
 
 module.exports.handleEvent = async ({ Threads, api, event}) => {
   const fs = require("fs-extra");
   const moment = require("moment-timezone");
   
   let { senderID, messageID, threadID } = event;
   const so_lan_spam = 1; // Spam times, exceeding will be banned
   const thoi_gian_spam = 60000; // 60000 millisecond (1 phút)
   const unbanAfter = 600000; // 600000 millisecond (10 phút) 
   const folderRandomImage = __dirname + "/cache/randomImgAutobanThread";
   const allImage = fs.readdirSync(folderRandomImage);
   if (!global.client.autobanthread) global.client.autobanthread = {};
   
   if (!global.client.autobanthread[threadID]) {
     global.client.autobanthread[threadID] = {
       timeStart: Date.now(),
       number: 0
     }
   };
   
   const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
 	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
 	if (!event.body || event.body.indexOf(prefix) != 0) return;
 	
 	let dataThread = (await Threads.getData(threadID)) || {};
 	let data = dataThread.data;
 	
 	if ((global.client.autobanthread[threadID].timeStart + thoi_gian_spam) <= Date.now()) {
 	  global.client.autobanthread[threadID] = {
 	    timeStart: Date.now(),
 	    number: 0
 	  }
 	}
 	else {
 	  global.client.autobanthread[threadID].number++;
 	  if (global.client.autobanthread[threadID].number >= so_lan_spam) {
 	    const time = moment.tz("Asia/Dhaka").format("DD/MM/YYYY HH:mm:ss");
 			if (data && data.banned == true) return;
 			data.banned = true;
 			data.reason = `spam bot ${so_lan_spam} time/${thoi_gian_spam/60000}minute`;
 			data.dateAdded = time;
 			await Threads.setData(threadID, { data });
 			global.data.threadBanned.set(threadID, { reason: data.reason, dateAdded: data.dateAdded });
 			global.client.autobanthread[threadID] = {
 	      timeStart: Date.now(),
 	      number: 0
 	    };
 			api.sendMessage({
 			  body: `${threadID}\n ${dataThread.threadInfo.threadName}\nتم حظر المجموعة من استخدام البوت \nالسبب: سبام  ${so_lan_spam}الوقت/${thoi_gian_spam/60000}دقيقة\سيتم فك الحظر بعد ${Math.floor(unbanAfter/60000)}دقائق`,
 			  attachment: fs.createReadStream(`${folderRandomImage}/${allImage[Math.floor(Math.random()*allImage.length)]}`)
 			}, threadID, () => {
 			  setTimeout(async function() {
 			    delete data.autoban;
     	    data.banned = false;
     			data.reason = null;
     			data.dateAdded = null;
     			await Threads.setData(threadID, { data });
     			global.data.threadBanned.delete(threadID);
				api.sendMessage("اسف لحظر المجموعة\nلا تقم بعمل سبام مجددا", threadID);
 			  }, unbanAfter);
 			});
 			api.sendMessage(`خاصية الاوتوبان ${threadID} | ${dataThread.threadInfo.threadName} \n${so_lan_spam}الوقت/${Math.floor(thoi_gian_spam/60000)}دقيقة\nالوقت: ${time}`, global.config.ADMINBOT[0]);
 	  }
 	}
 };
 