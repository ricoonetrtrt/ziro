module.exports.config = {
 name: "حظر_مجموعة",
 eventType: ["log:subscribe"],
 version: "1.0.0",
 credits: "𝐊𝐈𝐓𝐄 凧",
 description: "Ban new members from the group"
};

module.exports.run = async function ({ event, api, Threads, Users }) {
 	let data = (await Threads.getData(event.threadID)).data
 	if (data.newMember == false) return;
 	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) return
    else if(data.newMember == true) {
    var memJoin = event.logMessageData.addedParticipants.map(info => info.userFbId)
			for (let idUser of memJoin) {
					await new Promise(resolve => setTimeout(resolve, 1000));
					api.removeUserFromGroup(idUser, event.threadID, async function (err) {
                        if (err) return data["newMember"] = false;
                            await Threads.setData(event.threadID, { data });
                              global.data.threadData.set(event.threadID, data);
                    })
			}
 	return api.sendMessage(`[ERROR]- مجموعتك تقوم بتشغيل نظام antijoin من فضلك قم باطفائه واعد المحاولة`, event.threadID);
 }
}
