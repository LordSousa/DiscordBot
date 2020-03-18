const {prefix, token} = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const readyArray = ["rdy", "ready"];
const jabronisArray = [];

client.once("ready", () => {
	console.log("Ready!");
});

client.on("message", message => {
	console.log(message.author.username);
	const messageContent = message.content.toLowerCase();

	if(messageContent.startsWith(`${prefix}listjabronis`)) {
		listJabronis(message);
	}
	else if(readyArray.includes(messageContent) && !jabronisArray.includes(message.author.username)) {
		jabronisArray.push(message.author.username);
		listJabronis(message);
	}
});

function listJabronis(message) {
	let completeListMarkDown = "\n >>>  	__**Jabronis**__ \n";
	jabronisArray.forEach(element => {
		completeListMarkDown += `${element} :white_check_mark: \n`;
	});
	message.channel.send(completeListMarkDown);
}

client.login(token);