// (C) Pranav Ramesh

const Discord = require('discord.js');
const client = new Discord.Client();
var config = require('./config.json');
var responses = ["blank", "yello", "howdy", "hola", "wassup", "hi" , "hello", "hoi", "bonjour"];



client.on('ready', () => {
    console.log("I have started.")
});

client.on('message', message => {

    if (message.content == "!ping") {
        message.channel.send("Pong!")
    }

    if (message.content == "!creator") {
        message.channel.send("Laphatize is my creator.")
    }

    if (message.content == "!help") {
        message.channel.send({
            "embed": {
             "title": "You needed help?",
             "description": "I think I have just the right thing for you!",
             "color": 7469282,
            
             "fields": [
               {
                 "name": "__Prefix: !__",
                 "value": "Always start your commands with the prefix"
               },
               {
                 "name": "__Commands:__",
                 "value": "!help\n!notify [@projectrole] [@yourusername]\n!creator\n!eval [node.js code]"
               }
               ]
           }
         })
    }

    if (message.content.startsWith("!notify")) {

        let member = message.mentions.members.first();
        let role = message.mentions.roles.first();
        message.channel.send("Registering " + message.author.username + " for " + role + "...");
        member.addRole(role);
        message.channel.send(message.author.username + " is now registered to get updates for " + role);
		
		//var server = message.guild.id;
		
        client.channels.get("538132739749052431").send(message.author.username + " signed up for " + role + "!");

    }

    if (message.content.startsWith("!eval")) {
        if (message.author.username === "Laphatize") {
            try {
                eval(message.content.slice(6));
            } catch(err) {
				console.log("Somethings not right with that code.");
            }
        } else {
			message.reply("You don't have the permissions to execute this command.");
		}
    }
	
	if (message.content.startsWith("!donate")) {
		message.channel.send('Do you want to donate to Laphatize?')
		.then(() => {
		  message.channel.awaitMessages(response => response.content === 'yes', {
			max: 1,
			time: 5000,
			errors: ['time'],
		  })
		  .then((collected) => {
		
			  message.channel.send(`Cool! Here is his patron https://www.patreon.com/join/2368589/signup.`);
			
		  }).catch(() => {
			  message.channel.send('Cancelled!');
			});
		});
	}
	
	if (message.content === "!hi") {
		var x = Math.floor((Math.random() * 8) + 1);
		message.reply(responses[x]);
	}


});

client.login(config.token);