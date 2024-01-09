module.exports.config = {
    name: "نداء",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Your Name",
    description: "Send a message to all users of the bot",
    commandCategory: "system",
    usages: "[text]",
    cooldowns: 5,
};

module.exports.run = async function({ api, args }) {
    const allThreadData = await api.getThreadList(100, null, ["INBOX"], "ALL");

    const allThreadIDs = allThreadData.map(threadInfo => threadInfo.threadID);

    const text = args.join(" ");

    allThreadIDs.forEach(async threadID => {
        await api.sendMessage(text, threadID);
    });

    return "Message sent to all users.";
};