module.exports.config = {
 name: "قفل-ادمن",
 version: "1.0.0",
 credits: "𝐊𝐈𝐓𝐄 凧",
 hasPermssion: 1,
 description: "Prevent changing group administrators",
 usages: "",
 commandCategory: "Box Chat",
 cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('بحاجة إلى أذونات مسؤول المجموعة ، يرجى الإضافة والمحاولة مرة أخرى!', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["guard"] == "guard" || data["guard"] == false) data["guard"] = true;
    else data["guard"] = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`${(data["guard"] == true) ? "تم تفعيل" : "تم الغاء تفعيل"}  Anti-Robbery بنجاح`, event.threadID, event.messageID);
}