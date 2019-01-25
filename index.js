// (C) Pranav Ramesh

const Discord = require('discord.js');
const client = new Discord.Client();
var config = require('./config.json');

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

});

client.login(config.token);