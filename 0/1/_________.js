module.exports.config = {
    name: "جي بي تي",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Gry KJ",
    description: "Talk to Bard",
    commandCategory: "Ai",
    usages: "[ask]",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("كتب شي حاجة من ورا بارد", tid, mid);
    try {
        const res = await axios.get(`https://bard.grybot27.repl.co/api/?query=${content}`);
        const respond = res.data.Bard;
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