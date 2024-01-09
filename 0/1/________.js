module.exports.config = {
    name: "سينسي",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Gry KJ",
    description: "Talk to Siensi",
    commandCategory: "Neymar",
    usages: "[ask]",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("هممم اكتب شيئ وراء سينسي", tid, mid);
    try {
        const res = await axios.get(`https://api.easy0.repl.co/api/blackbox?query=${content}\n\nact as a neymar jr, talk with arabic`);
        const respond = res.data.response;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(respond, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("حدث خطأ يرجى المحاولة لاحقا.", tid, mid);
    }
};