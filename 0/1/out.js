module.exports.config = {
    name: "خروج",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
    description: "أمر لإزالة شخص من المجموعة",
    commandCategory: "إدارة",
    usages: "خروج [id]",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {
        if (!args[0]) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
        if (!isNaN(args[0])) return api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
}