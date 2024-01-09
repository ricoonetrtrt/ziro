const axios = require('axios');
const fs = require('fs');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyBFNMIC7pTPGo2zBxE8JrF0oPpOpxV6KU8');

module.exports.config = {
	name: "راندم",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Replit AI",
	description: "Sends a random video with sound from the top 10 'Neymar edit' search results on YouTube",
	commandCategory: "media",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  var additionalSongs = [
    "Mood - 24kGoldn ft. iann dior",
    "Good Days - SZA",
    "Positions - Ariana Grande",
    "Save Myself - Ed Sheeran",
    "Leave Before You Love Me - Marshmello, Jonas Brothers",
    "Butter - BTS",
    "Heat Waves - Glass Animals",
    "Stay - The Kid LAROI, Justin Bieber",
    "Drivers License - Olivia Rodrigo",
    "Wild Side - Normani ft. Cardi B",
    "Shivers - Ed Sheeran",
    "Beautiful Mistakes - Maroon 5 ft. Megan Thee Stallion",
    "Pilot - Now United",
    "Love Again - Dua Lipa",
    "Late at Night - Roddy Ricch",
    "Cold Heart (PNAU Remix) - Elton John, Dua Lipa",
    "Astronaut in the Ocean - Masked Wolf",
    "Demeanor - Pop Smoke ft. Dua Lipa",
    "Industry Baby - Lil Nas X ft. Jack Harlow",
    "Life Support - Madison Beer",
    "Telepatía - Kali Uchis",
    "Higher Power - Coldplay",
    "Don't Go Yet - Camila Cabello",
    "Up - Cardi B",
    "Essence - WizKid ft. Tems",
    "You Right - Doja Cat, The Weeknd",
    "Woman - Doja Cat",
    "Heat Waves - Glass Animals",
    "Good 4 U - Olivia Rodrigo",
    "Happier Than Ever - Billie Eilish",
    "Waves - Luke Bryan",
    "Straightenin - Migos",
    "Wild Side - Normani ft. Cardi B",
    "Peaches - Justin Bieber ft. Daniel Caesar, Giveon",
    "One Too Many - Keith Urban, P!nk",
    "Girls Want Girls - Drake ft. Lil Baby",
    "Fair Trade - Drake ft. Travis Scott",
    "Bad Habits - Ed Sheeran",
    "Favorite Crime - Olivia Rodrigo",
    "SoulFly - Rod Wave"
  ];

;
  var song = additionalSongs[Math.floor(Math.random() * additionalSongs.length)];

  const keyword = song;
	const limit = 1; // Get top 10 search results
	try {
		const results = await youtube.searchVideos(keyword, limit);
		// Choose a random video from the top 10 results
		const randomIndex = Math.floor(Math.random() * results.length);
		const videoID = results[randomIndex].id;
		const videoURL = `https://www.youtube.com/watch?v=${videoID}`;
		// Using 'highestaudio' and 'mp4' format to keep the sound
		const streamOptions = { quality: 'highestaudio', filter: 'audioonly' };
		const stream = ytdl(videoURL, streamOptions);
		const tempPath = `temp/temp-${videoID}.mp3`;
		stream.pipe(fs.createWriteStream(tempPath));
		stream.on('end', () => {
			api.sendMessage({
				body: `اغنية: ${results[randomIndex].title}`,
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