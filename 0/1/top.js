module.exports.config = {
  name: "الأعلى",
  version: "0.0.5",
  hasPermssion: 0,
  credits: "السيد توم",
  description: "أعلى الخوادم!",
  commandCategory: "المجموعة",
  usages: "[الموضوع/المستخدم/المال/المستوى]",
  cooldowns: 5
};

module.exports.run = async ({ event, api, args, Currencies, Users }) => {
    const { threadID, messageID } = event;

  if (args[1] && isNaN(args[1]) || parseInt(args[1]) <= 0) return api.sendMessage("يجب أن تكون معلومات طول القائمة عددًا وألا تكون أقل من 0", event.threadID, event.messageID);
  var option = parseInt(args[1] || 10);
  var data, msg = "";

  var fs = require("fs-extra");
  var request = require("request");
    function expToLevel(point) {
  if (point < 0) return 0;
  return Math.floor((Math.sqrt(1 + (4 * point) / 3) + 1) / 2);
    }
    if (args[0] == "user") { 
    let all = await Currencies.getAll(['userID', 'exp']);
        all.sort((a, b) => b.exp - a.exp);
        let num = 0;
               let msg = {
          body: 'أفضل 10 أشخاص من حيث المستوى على الخادم!',
          
        }
        for (var i = 0; i < 10; i++) {
   
          let level = expToLevel(all[i].exp);
          var name = (await Users.getData(all[i].userID)).name;      
  
          num += 1;
          msg.body += '\n' + num + '. ' + name + ' - المستوى ' + level;}
           console.log(msg.body)
                    api.sendMessage(msg, event.threadID, event.messageID)
    }
  if (args[0] == "thread") {
    var threadList = [];
    try {
          data = await api.getThreadList(option + 10, null, ["INBOX"]);
    }
    catch (e) {
      console.log(e);
    }

    for (const thread of data) {
      if (thread.isGroup == true) threadList.push({ threadName: thread.name, threadID: thread.threadID, messageCount: thread.messageCount });
    }
    
    threadList.sort((a, b) => {
      if (a.messageCount > b.messageCount) return -1;
            if (a.messageCount < b.messageCount) return 1;
    })

    var i = 0;
    for(const dataThread of threadList) {
      if (i == option) break;
      msg += `${i+1}/ ${(dataThread.threadName)||"بلا اسم"}\nTID: [${dataThread.threadID}]\nعدد الرسائل: ${dataThread.messageCount} رسالة\n\n`;
      i+=1;
    }
    
    return api.sendMessage(`أعلى ${threadList.length} مجموعات من حيث عدد الرسائل:\n_____________________________\n${msg}\n_____________________________`, threadID, messageID);
  }
  
 if (args[0] == "money") { 
    let all = await Currencies.getAll(['userID', 'money']);
        all.sort((a, b) => b.money - a.money);
        let num = 0;
               let msg = {
          body: 'أغنى 10 أشخاص على الخادم!',
          
        }
        for (var i = 0; i < 10; i++) {
      
          let money = all[i].money;
      
          var name = (await Users.getData(all[i].userID)).name;    
                    
          num += 1;
          msg.body += '\n' + num + '. ' + name + ': ' + money + "💵";}
                    console.log(msg.body)
                    api.sendMessage(msg, event.threadID, event.messageID)
    }

}