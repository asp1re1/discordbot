    const music = require("./music.js")
    const test = require("./test.js")
    const Discord = require('discord.js');

    const client = new Discord.Client();


    client.once('ready', () => {
        console.log('bot is online');
        global.botid = client.user.id
    });

client.login('NzQwNTkzNDA4NzQxMDgxMjA4.XyrRXA.za6_ls3i34F3uvCWnqZfGyxNG0M');

const prefix = '%'

client.on("message", function (message) {
    if (botid != message.author.id) {
        if (message.content === `${prefix}ping`) {
                message.channel.send('pong');
                console.log('PING have been used.');
        }
        
        if (message.content === prefix + 'bonk') {
                message.channel.send('', { files: ["./images/bonk.png"] });
                console.log('BONK have been used.');
        }

        if (message.content === prefix + 'donate') {
                message.channel.send('https://steamcommunity.com/tradeoffer/new/?partner=1012227432&token=87PC92Gi');
                console.log('DONATE have been used.');
        }

        if (message.content === prefix + 'help') {
            if (botid != message.author.id) {
                message.channel.send('```\t  COMMAND \t    DESCRIPTION \n \t %ping \t \t pong \n \t %bonk \t \t bonk \n \t %donate \t    donate link \n \t %reverse \t   reverse string \n \t %id \t \t   shows your id```');
                console.log('HELP has been used.');
            }
        }

        if (message.content.includes(prefix + 'reverse')) {
                var str = message.content;
                var reverseStr = '';
                for (var i = str.length - 1; i >= str.length - (str.length - 8); i--) {
                    reverseStr += str[i];
                }
            message.channel.send(reverseStr);
            console.log('REVERSE have been used.')
        }

        if (message.content === prefix + 'id') {
            message.channel.send(message.author.id)
            console.log('ID has been used.')
        }

    }
    client.user.setActivity('%help', { type: 'STREAMING' });
    
});