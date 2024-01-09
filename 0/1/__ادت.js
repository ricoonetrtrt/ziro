const axios = require('axios');
const fs = require('fs');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyBFNMIC7pTPGo2zBxE8JrF0oPpOpxV6KU8');

module.exports.config = {
	name: "ادت",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Replit AI",
	description: "Sends a random video with sound from the top 10 'Neymar edit' search results on YouTube",
	commandCategory: "media",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  var tl = ["xenoz","neptun","chrolo","guren","daddy","after hours - ","kaneki"];
  var rand = tl[Math.floor(Math.random() * tl.length)];
	const keyword = `${rand} edit`;
	const limit = 40; // Get top 10 search results
	try {
		const results = await youtube.searchVideos(keyword, limit);
		// Choose a random video from the top 10 results
		const randomIndex = Math.floor(Math.random() * results.length);
		const videoID = results[randomIndex].id;
		const videoURL = `https://www.youtube.com/watch?v=${videoID}`;
		// Using 'highestaudio' and 'mp4' format to keep the sound
		const streamOptions = { quality: 'highestaudio', filter: 'audioandvideo', format: 'mp4' };
		const stream = ytdl(videoURL, streamOptions);
		const tempPath = `./temp-${videoID}.mp4`;

		stream.pipe(fs.createWriteStream(tempPath));
		stream.on('end', () => {
			api.sendMessage({
				body: `ادت: ${results[randomIndex].title}`,
				attachment: fs.createReadStream(tempPath)
			}, event.threadID, () => {
				fs.unlinkSync(tempPath); // Delete the temp file after sending the video with sound
			}, event.messageID);
		});
	} catch (err) {
		api.sendMessage("An error occurred while fetching the video.", event.threadID, event.messageID);
		console.error(err);
	}
};