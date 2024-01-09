module.exports.config = {
  name: "احسب",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "𝐊𝐈𝐓𝐄 凧", 
  description: "count all", 
  commandCategory: "group", 
  usages: `Please enter some category\n\nHow to use?\n${global.config.PREFIX}count <category>\n\nCategory's available:\n\nmessage, admin, member, male, female, gei, allgroup, alluser, boxdata, boxleave\n`,
  cooldowns: 5,  
  envConfig: {
  }
};

module.exports.run = async function ({ api, Threads, Users, event, args, client, __GLOBAL }) {
  const { threadID, messageID, participantIDs } = event;
  var input = args.join();
  var nameMen = [];
  var gendernam = [];
  var gendernu = [];
  var nope = [];
  let threadInfo = await api.getThreadInfo(threadID);
  for (let z in threadInfo.userInfo) {
    var gioitinhone = threadInfo.userInfo[z].gender;
    if (gioitinhone == "MALE") {
      gendernam.push(gioitinhone)
    } else {
      if (gioitinhone == "FEMALE") {
        gendernu.push(gioitinhone)
      } else { nope.push(gioitinhone) }
    }
  }
  ///////////////////////
      var threadList = [];
      var inbox = await api.getThreadList(150, null, ['INBOX']);
      let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

      for (var groupInfo of list) {
          threadList.push({
              id: groupInfo
          });
      } 
  ///////////////////////

  ///////////////////////
      var listLeave = [];
      var inbox = await api.getThreadList(100, null, ['ARCHIVED']);

      for (var groupInfo of inbox) {
          listLeave.push({
              id: groupInfo
          });
      } 
  ///////////////////////

  var threadData = (await Threads.getData(threadID)).threadInfo;
  var out = (msg) => api.sendMessage(msg, threadID, messageID);
  var boxget = await Threads.getAll(['threadID']);
  var userget = await Users.getAll(['userID']);
  if (input == "") { out(`من فضلك اكتب احد التصنيفات \n\nكيف تستعمله ?\n${global.config.PREFIX}احسب <تصنيف>\n\nالتصنيفات المتاحة:\n\nmessage, admin, member, male, female, gei, allgroup, alluser, boxdata, boxleave\n\nصنع بواسطة: 𝐊𝐈𝐓𝐄 凧`) }
  if (input == "message") { out(`This Group Has ${threadInfo.messageCount} message`) }
  if (input == "admin") { out(`المجموعة بها  ${threadData.adminIDs.length} من الادمن`) }
  if (input == "member") { out(`هذه المجموعة تحتوي على ${participantIDs.length} من الاعضاء`) }
  if (input == "male") { out(`هناك : ${gendernam.length} ولدا في المجموعة`) }
  if (input == "female") { out(`هناك : ${gendernu.length} فتاة في المجموعة`) }
  if (input == "gei") { out(`This Group Has ${nope.length} Member Is Gei`) }
  if (input == "allgroup") { out(`هناك : ${threadList.length} مجموعة تستخدم البوت في هذا الحساب`) }
  if (input == "alluser") { out(`هناك ${userget.length} مستخدما للبوت `) }
  if (input == "boxdata") { out(`هناك ${boxget.length} مجموعة في النظام باكمله تستخدم البوت`) }
  if (input == "boxleave") { out(`خرج من المجموعة: ${listLeave.length} عضو`) }
  }