const { client, Status, GenerationStyle } = require("imaginesdk"); 
const request = require("request");
module.exports.config = {
    name: "تخيلي",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Gry KJ",
    description: "Generate an image from a text description.",
    commandCategory: "utility",
    usages: "[description]",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = args.join(" ")
    if (!args[0]) return api.sendMessage("اكتب شيئ  🦄", tid, mid);
    try {
        const imagineClient = client("vk-iNzDaw9I62nOQWDkeqTvAIeZhMqDxUAyEq3Fglv3iF6el");

        const response = await imagineClient.generations(
            content,
            {
                style: GenerationStyle.IMAGINE_V5
            }
        );

        if (response.status() === Status.OK) {
            const image = response.data();
            if (image) {
                const imagePath = "/cache/result.png";
                await image.asFile(imagePath);
                const msg = { body: "", attachment: fs.createReadStream(imagePath) };
                api.sendMessage(msg, tid, mid);
            }
        }
        else {
            console.log(`Status Code: ${response.status()}`);
            api.sendMessage("Failed to generate the image.", tid, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", tid, mid);
    }
};