module.exports.config = {
    name: "عيد_ميلاد_السيد",
    version: "1.0.0",
    hasPermssion: 0,
    description: "احصل على الوقت المتبقي حتى 8 يونيو",
    commandCategory: "general",
    usages: "", // قم بالتحديث إذا لزم الأمر
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    const today = new Date();
    const targetDate = new Date(today.getFullYear(), 8, 19); // 8th of June

    if (today.getMonth() > 5 || (today.getMonth() === 5 && today.getDate() > 8)) {
        targetDate.setFullYear(targetDate.getFullYear() + 1);
    }

    const remainingTime = targetDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

    return api.sendMessage(`تبقى ${daysLeft} يوم لعيد ميلاد  Ŕi Čo`, event.threadID);
};