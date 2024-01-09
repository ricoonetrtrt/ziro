module.exports.config = {
	name: "سين",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "𝐊𝐈𝐓𝐄 凧",
	description: "mark group",
	commandCategory: "system",
  usages: "",
	cooldowns: 0
};

module.exports.handleEvent = async ({ api, event, args }) => {
    api.markAsReadAll(() => {});
};

module.exports.run = async function({}) {}