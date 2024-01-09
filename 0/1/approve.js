module.exports.config = {
	name: "مصادقة",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "𝐊𝐈𝐓𝐄 凧",
	description: "approve the gc using bots xD",
	commandCategory: "Admin",
    cooldowns: 5
};


const dataPath = __dirname + "/cache/approvedThreads.json";
const dataPending = __dirname + "/cache/pendingdThreads.json";
const fs = require("fs");

module.exports.onLoad = () => {
	if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  if (!fs.existsSync(dataPending)) fs.writeFileSync(dataPending, JSON.stringify([]));
}
module.exports.handleReply = async function ({ event, api, Currencies, handleReply, Users, args }) {
    if (handleReply.author != event.senderID) return;
    const { body, threadID, messageID, senderID } = event;
    const { type } = handleReply;
    let data = JSON.parse(fs.readFileSync(dataPath));
    let dataP = JSON.parse(fs.readFileSync(dataPending));
    let idBox = (args[0]) ? args[0] : threadID;
  switch (type) {
        case "pending": {
          switch (body) {
                case `A`: {
   			data.push(idBox);
   			fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
   			api.sendMessage(`» تمت المصادقة على المجموعة بنجاح:\n${idBox}`, threadID, () => {
          dataP.splice(dataP.indexOf(idBox), 1);
    		fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
    	}, messageID)
        }
        }
      }
    }
  }
module.exports.run = async ({ event, api, args, Threads, handleReply, Users }) => {
	const { threadID, messageID, senderID } = event;
	let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  let msg = "";
  var lydo = args.splice(2).join(" ");
  let idBox = (args[0]) ? args[0] : threadID;
        if (args[0] == "list" || args[0] == "l") {
    	msg = `=====「 المجموعات اللتي تمت المصادقة عليها: ${data.length} 」 ====`;
    	let count = 0;
    	for (e of data) {
        let threadInfo = await api.getThreadInfo(e);
          let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
    		msg += `\n〘${count+=1}〙» ${threadName}\n${e}`;
    	}
    	api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "a",
        })
    }, messageID);
        }
     else if (args[0] == "pending" || args[0] == "p") {
    	msg = `=====「 المجموعات اللتي تحتاج المصادقة: ${dataP.length} 」 ====`;
    	let count = 0;
    	for (e of dataP) {
        let threadInfo = await api.getThreadInfo(e);
          let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
    		msg += `\n〘${count+=1}〙» ${threadName}\n${e}`;
    	}
    	api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "pending",
        })
    }, messageID);
     }
       else if (args[0] == "help" || args[0] == "h") {
         const tst = (await Threads.getData(String(event.threadID))).data || {};
  const pb = (tst.hasOwnProperty("PREFIX")) ? tst.PREFIX : global.config.PREFIX;
  const nmdl = this.config.name
  const cre = this.config.credits
        return api.sendMessage(`=====「 مصادقة 」=====\n\n${pb}${nmdl} l/list => لرؤية المجموعات المصادق عليها\n\n${pb}${nmdl} p/pending => لرؤية المجموعات اللتي تنتظر المصادقة\n\n${pb}${nmdl} d/del => اكتب ID لمنع المجموعة من استخدام البوت\n\n${pb}${nmdl} => ادخل ID لاستكشاف هذه المجموعة\n\n⇒ ${cre} ⇐`, threadID, messageID);
       }
      
    else if (args[0] == "del" || args[0] == "d") {
    	idBox = (args[1]) ? args[1] : event.threadID;
      if (isNaN(parseInt(idBox))) return api.sendMessage("[ ERR ] ليس رقما", threadID, messageID);
    	if (!data.includes(idBox)) return api.sendMessage("[ ERR ] المجموعة ليس مصادقا عليها بعد!", threadID, messageID);
      api.sendMessage(`[ OK ] لقد تم حذف مجموعتك من قائمة استكشاف البوت بسبب: ${lydo}`, idBox);
    	api.sendMessage(`[ OK ] تم حذف المجموعة من قائمة البوت ولن يتفاعل معها مجددا`, threadID, () => {
    		data.splice(data.indexOf(idBox), 1);
    		fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    	}, messageID)
    }
    else if (isNaN(parseInt(idBox))) api.sendMessage("[ ERR ] ال ID اللذي ادخلته غير صحيح", threadID, messageID);
    else if (data.includes(idBox)) api.sendMessage(`[ - ] ID ${idBox} تم المصادقة عليها مسبقا!`, threadID, messageID);
   	else api.sendMessage("[ تم بنجاح ] *(^_^)/* تمت المصادقة على المجموعة من طرف 𝐊𝐈𝐓𝐄 凧\n☆ ┑(￣▽￣)┍ ☆\n ༻المالك:- ☞MAJD☜ ༺\n ༒يمكنك مناداته 〠𝐊𝐈𝐓𝐄 凧〠.༒\n ༒حسابه على الفيسبوك༒:\n- ☞ https://www.facebook.com/ELECTR01 ☜ \n ֎تواصل معه على الواتساب֍ :-  ☞+212619070906 ☜", idBox, (error, info) => {
   		api.changeNickname(` 〖 ${global.config.PREFIX} 〗 ➺ ${(!global.config.BOTNAME) ? "" : global.config.BOTNAME}`, idBox, global.data.botID);
      const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
   let admID = "100075085058816";    
  
      api.getUserInfo(parseInt(admID), (err, data) => {
      if(err){ return console.log(err)}
     var obj = Object.keys(data);
    var firstname = data[obj].name.replace("@", "");  
      
      axios.get('https://api.satou-chan.xyz/api/endpoint/happy').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
      api.sendMessage({body: `❒❒تم الاتصال بنجاح❒❒\n=====================\n┏━━━━ 🖤 ━━━━┓
   ✦❥⋆⃝𝐊𝐈𝐓𝐄 凧 ✦ 
┗━━━    🖤 ━━━━┛\n=====================\n➪ البوت: ${global.config.BOTNAME}\n➪ البادئة: ${global.config.PREFIX}\n➪ المستخدمون: ${global.data.allUserID.length}\n➪ المجموعات: ${global.data.allThreadID.length}\n=====================\n[]---------------------------------------[]\nاستخدم '${global.config.PREFIX}الاوامر' لرؤية الاوامر المتاحة!(ღ˘⌣˘ღ)\n[]---------------------------------------[]\n⌨  صنع بواسطة : ${firstname}\n`, mentions: [{
                           tag: firstname,
                           id: admID,
                           fromIndex: 0,
                 }],
						attachment: fs.createReadStream(__dirname + `/cache/duyet.${ext}`)
					}, idBox,() => fs.unlinkSync(__dirname + `/cache/duyet.${ext}`));
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/duyet.${ext}`)).on("close", callback);
			}) 
      })
   		if (error) return api.sendMessage("[ ERR ] حدث خطا, تاكد من ان الID اللذي ادخلته صحيح ومن ان البوت في المجموعة!", threadID, messageID);
   		else {
   			data.push(idBox);
   			fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
   			api.sendMessage(`[ OK ] تم المصادقة على المجموعة بنجاح (◕‿◕):\n${idBox}`, threadID, () => {
          dataP.splice(dataP.indexOf(idBox), 1);
    		fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
    	}, messageID)
        }
   	});
  }