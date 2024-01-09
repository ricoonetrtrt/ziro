module.exports.config = {
  name: "الاوامر",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "PetterSever",
  description: "Beginner's Guide",
  commandCategory: "system",
  usages: "[Tên module]",
  cooldowns: 1,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 300
  }
};

module.exports.languages = {
  "vi": {
    "moduleInfo": "「 %1 」\n%2\n\n❯ Cách sử dụng: %3\n❯ Thuộc nhóm: %4\n❯ Thời gian chờ: %5 giây(s)\n❯ Quyền hạn: %6\n\n» Module code by %7 «",
    "helpList": '[ Hiện tại đang có %1 lệnh có thể sử dụng trên bot này, Sử dụng: "%2help nameCommand" để xem chi tiết cách sử dụng! ]"',
    "user": "Người dùng",
        "adminGroup": "Quản trị viên nhóm",
        "adminBot": "Quản trị viên bot"
  },
  "en": {
    "المعلومات": " ◤ %1 ◥\n%2\n\n●الاستخدام: %3\n●التصنيف: %4\n●وقت الانتظار: %5 seconds(s)\n●الاذن: %6\n\n►تم تحريره بواسطة %7◄ ",
    "helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
    "user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports.run = function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  if (!command) {
    const arrayInfo = [...commands.keys()];
    arrayInfo.sort();

    const numberOfCommandsPerPage = 10;
    const page = parseInt(args[0]) || 1;
    const startSlice = numberOfCommandsPerPage * (page - 1);
    const endSlice = startSlice + numberOfCommandsPerPage;
    const returnArray = arrayInfo.slice(startSlice, endSlice);

    let msg = `✅ Commands List (Page ${page}) ✅\n\n`;

    for (let i = 0; i < returnArray.length; i++) {
      const commandName = returnArray[i];
      const commandInfo = commands.get(commandName).config;
      msg += `→ ${prefix}${commandName} ←\n   ${commandInfo.description}\n\n`;
    }

    const totalPages = Math.ceil(arrayInfo.length / numberOfCommandsPerPage);
    const pageInfo = `================\n\nPage ${page}/${totalPages}\nUse "${prefix}الاوامر [number]" for more details.\n`;

    const footer = `Enjoy using ${global.config.BOTNAME} Bot`;

    const text = `${msg}${pageInfo}\n${footer}`;

    return api.sendMessage(text, threadID, async (error, info) => {
      if (autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
        return api.unsendMessage(info.messageID);
      } else return;
    }, event.messageID);
  }

  return api.sendMessage(
    getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
    command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};