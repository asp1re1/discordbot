    const test = require("./test.js")
    const Discord = require('discord.js');
    const fs = require('fs')
    const Canvas = require('canvas');
    const enums = require('./enums.json')
    const config = require('./config.json')
    const tictactoe = require('./tictactoe.json')

    const client = new Discord.Client();

    client.once('ready', () => {
        console.log('bot is online');
    });

client.login(config.token)

var stream = fs.createWriteStream("./ideas.txt");
var jebait = 'https://www.youtube.com/watch?v=d1YBv2mWll0';
var tictactoestatus = 1;

let helpEnum = enums.helpsEnum
let botAuthorh = enums.botAuthors
let dataEnum = enums.datasEnum
let configLEnum = enums.configLanguageEnum
let members = enums.membersEnum
let rps = enums.RPSEnum

let currentlanguage = enums.languageEnum.EN;

const commandsmessage = [
    ['Commands', 'Команды'],
    ['shows channel id', 'показывает id канала'],
    ['pong', 'понг'],
    ['bonk', 'бонк'],
    ['donate link', 'ссылка на донат'],
    ['this panel', 'эта панель'],
    ['reverse message', 'переворачивает сообщение'],
    ['shows your id', 'показывает ваш id'],
    ['shows bot author', 'автор бота'],
    ['shows member count on server', 'показывает количество пользователей на сервере'],
    ['shows data', 'показывает статистику'],
    ['send to the author message', 'отправить сообщение автору'],
    ['delete message', 'мгновенно удалит сообщение'],
    ['jebaited song', 'джеБАЙТЕД'],
];

const botAuthor = [
    [' ``` Bot author: asp1re#2624\n Help: ♥Nayuta Kani♥#2269```', '``` Автор бота: asp1re#2624\n Помощь: ♥Nayuta Kani♥#2269```'],
]

const data = [
    ['Username: ', 'Ник: '],
    ['Discriminator: ', 'Тег: '],
    ['Id: ', 'Айди: '],
    ['Avatar: ', 'Аватарка: '],
    ['Mention someone.', 'Упомяните кого-нибудь.']
]

const configL = [
    ['Language has changed.', 'Язык был успешно изменён.'],
    ['You writed wrong language.', 'Вы написали не тот язык.'],
    ['You don\'t have permissions.', 'У вас нет разрешения на это.']
]

const member = [
    ['Members: ', 'Участников: '],
    ['Bots: ', 'Ботов: '],
]

const duousercommandW = [
    ['You should mention 1 user.', 'Вы должны упомянуть 1 пользователя.']
]

const rpsmessages = [
    ['You get challenged to rock-paper-scissors, you have 10 seconds. [y] [n]', 'Вы были вызваны в камень-ножницы-бумага, 10 секунд на ответ. [y] [n]'],
    ['You declined challenge.', 'Вы отклонили вызов.'],
    ['You accepted challenge, check DM.', 'Вы приняли вызов, проверьте личные сообщения.'],
    ['Time ended.', 'Время закончилось'],
    ['Don\'t write another symbols after challenge.', 'Не пишите ничего другого после вызова.'],
    ['You can\'t challenge yourself.', 'Вы не можете дать вызов себе.'],
    ['Write rock, paper or scissors', 'Напишите камень, ножницы или бумага']
]

client.on("message", async message => { 
    if (message.author.bot === false) {
        if (message.channel.id === config.channelid || message.channel.id === config.testid) {
            if (message.content.startsWith(`${config.prefix}bonk`)) {
                if (message.mentions.users.size === 1) {
                    var user = message.mentions.users.first();
                    const canvas = Canvas.createCanvas(400, 210);
                    const ctx = canvas.getContext('2d');
                    const background = await Canvas.loadImage('./images/bonk.png');
                    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = '#74037b';
                    ctx.strokeRect(0, 0, canvas.width, canvas.height);
                    ctx.beginPath();
                    ctx.arc(125, 65, 50, 0, Math.PI * 2, true);
                    ctx.arc(300, 140, 50, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.clip();
                    const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
                    ctx.drawImage(avatar, 75, 15, 100, 100);
                    const avatar2 = await Canvas.loadImage(user.displayAvatarURL({ format: 'png' }));
                    ctx.drawImage(avatar2, 250, 90, 100, 100);
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'bonk.png');
                    message.channel.send(attachment)
                    console.log(message.author.avatar)
                }
                else { message.channel.send(duousercommandW[0][currentlanguage]) }
            }

            if (message.content.startsWith(`${config.prefix}tictactoe`)) {
                if (message.mentions.users.size === 1) {
                    const filter = m => m.author.id === message.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1, // leave this the same
                        time: 10000, // time in MS. there are 1000 MS in a second
                    }).then(async (collected) => {
                        if (collected.first().content == 'n') {
                            message.reply('Command cancelled.')
                        }
                        else if (collected.first().content == 'y') {
                            const canvas = Canvas.createCanvas(650, 650);
                            const ctx = canvas.getContext('2d');
                            const background = await Canvas.loadImage('./images/tictactoeback.jpg');
                            const circle = await Canvas.loadImage('./images/circle.png')
                            const cross = await Canvas.loadImage('./images/cross.png')
                            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                            ctx.strokeStyle = '#74037b';
                            ctx.strokeRect(0, 0, canvas.width, canvas.height);
                            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'tictactoeback.png');
                            message.channel.send(attachment)
                            message.channel.send('1')

                            const filter2 = m => m.author.id === message.author.id;
                            message.channel.awaitMessages(filter2, {
                                max: 1, // leave this the same
                                time: 20000, // time in MS. there are 1000 MS in a second
                            }).then(async (collected) => {
                                if (collected.first().content == 'cancel') {
                                    message.reply('Command cancelled.')
                                }
                                else if (collected.first().content == 1)
                                    console.log('collecred :' + collected.first().content)
                            }).catch(() => {
                                // what to do if a user takes too long goes here 

                                message.reply('You took too long! Goodbye!')
                            });
                        }
                        else {
                            message.channel.send(rps[RPSEnum.Unknown][currentlanguage])
                        }
                    console.log('collecred :' + collected.first().content)
                    }).catch(() => {
                                        // what to do if a user takes too long goes here 

                        message.reply('You took too long! Goodbye!')
                    });
                }
                else {
                    message.channel.send(duousercommandW[0][currentlanguage])
                }
            }
        }
    }
});

client.on("message", function (message) {
    if (message.author.bot === false) {
        if (message.content === `${config.prefix}channelid`) {
            message.channel.send(message.channel.id)
            console.log('CHANNELID has been used.')
        }

        if (message.content.startsWith(`${config.prefix}delete`)) {
            message.delete()
            console.log('DELETE has been used')
        }

        if (message.content.startsWith(`${config.prefix}soi`)) {
            message.channel.send('', { files: ['./images/soi.png'] });
        }

        if (message.channel.id === config.channelid || message.channel.id === config.testid) {
            if (message.content === `${config.prefix}ping`) {
                message.channel.send('pong');
                console.log('PING have been used.');
            }

            if (message.content === `${config.prefix}dance`) {
                message.channel.send('', { files: [ "./images/dance.gif" ] })
                console.log('DANCE has been used.')
            }

            if (message.content === `${config.prefix}donate`) {
                message.channel.send(config.donatelink);
                console.log('DONATE have been used.');
            }

            if (message.content === `${config.prefix}help`) {
                const embedhelp = new Discord.MessageEmbed()
                    .setTitle(commandsmessage[helpEnum._COMMANDS][currentlanguage])
                    .setFooter('Bot\'s Author: asp1re', config.authorAvatar)
                    .setThumbnail('https://cdn.discordapp.com/avatars/329679428580016138/a_d523963459e9451f7bf079486d4118e9.gif')
                    .setTimestamp()
                    .setColor('#3db8ff')
                    .addFields(
                        { name: '%channelid: ', value: commandsmessage[helpEnum._CHANNELID][currentlanguage] },
                        { name: '%ping: ', value: commandsmessage[helpEnum._PONG][currentlanguage] },
                        { name: '%bonk: ', value: commandsmessage[helpEnum._BONK][currentlanguage] },
                        { name: '%donate: ', value: commandsmessage[helpEnum._DONATELINK][currentlanguage] },
                        { name: '%help: ', value: commandsmessage[helpEnum._HELP][currentlanguage] },
                        { name: '%reverse: ', value: commandsmessage[helpEnum._REVERSE][currentlanguage] },
                        { name: '%id: ', value: commandsmessage[helpEnum._YOURID][currentlanguage] },
                        { name: '%botauthor: ', value: commandsmessage[helpEnum._BOTAUTHOR][currentlanguage] },
                        { name: '%membercount: ', value: commandsmessage[helpEnum._MEMBERCOUNT][currentlanguage] },
                        { name: '%data: ', value: commandsmessage[helpEnum._YOURDATA][currentlanguage] },
                        { name: '%idea: ', value: commandsmessage[helpEnum._SENDTOAUTHOR][currentlanguage] },
                        { name: '%delete: ', value: commandsmessage[helpEnum._DELETE][currentlanguage] },
                        { name: '%jebaited: ', value: commandsmessage[helpEnum._JEBAITED][currentlanguage] }
                    )
                message.channel.send(embedhelp)
                console.log('HELP has been used.');
            }

            if (message.channel.id === config.testid) {
                const messagenew = new Discord.MessageEmbed()
                    .setTitle('Server: ' + message.guild.name)
                    .setTimestamp()
                    .setColor('#3db8ff')
                    .addFields(
                        { name: message.author.username, value: message.content },
                    )
                client.channels.cache.get(config.channelid).send(messagenew)
            }

            if (message.content.startsWith(`${config.prefix}reverse`)) {
                var str = message.content;
                var reverseStr = '';
                for (var i = str.length - 1; i >= str.length - (str.length - 8); i--) {
                    reverseStr += str[i];
                }
                message.channel.send(reverseStr);
                console.log('REVERSE have been used.')
            }

            if (message.content === `${config.prefix}jebaited`) {
                message.channel.send(jebait)
                console.log('JEBAITED')
            }
            
            if (message.content === `${config.prefix}id`) {
                message.channel.send(message.author.id)
                console.log('ID has been used.')
            }

            if (message.content === `${config.prefix}botauthor`) {
                message.channel.send(botAuthor[0][currentlanguage])
                console.log('BOTAUTHOR has been used')
            }

            if (message.content === `${config.prefix}membercount`) {
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('0077ff')
                    .addFields(
                        { name: member[members.Members][currentlanguage], value: message.guild.members.cache.filter(member => !member.user.bot).size },
                        { name: member[members.Bots][currentlanguage], value: message.guild.members.cache.filter(member => member.user.bot).size },
                    )
                message.channel.send(exampleEmbed)
            }

            if (message.content.startsWith(`${config.prefix}data`)) {
                if (message.mentions.users.size === 1) {
                    var user = message.mentions.users.first();
                    var avatar = user.displayAvatarURL
                    const embeddata = new Discord.MessageEmbed()
                        .setThumbnail(avatar)
                        .setColor('#3db8ff')
                        .addFields(
                            { name: data[dataEnum.Username][currentlanguage], value: user.username },
                            { name: data[dataEnum.Discriminator][currentlanguage], value: user.discriminator },
                            { name: data[dataEnum.Id][currentlanguage], value: user.id },
                            { name: data[dataEnum.Avatar][currentlanguage], value: user.displayAvatarURL({ dynamic: true }) },
                        )
                    message.channel.send(embeddata)
                    console.log('MYDATA has been used')
                }
                else { message.channel.send(data[dataEnum.Wrong][currentlanguage]) }
            }
            if (message.content.startsWith(`${config.prefix}idea`)) {
                message.content = message.content.replace(`${config.prefix}idea `, '');
                stream.write(message.content + ' | ' + message.author.username + '#' + message.author.discriminator + '\n') // example: idea | nick(discord)#tag
            }

            if (message.content.includes(`${config.prefix}config language`)) {
                if (message.member.roles.cache.has('611212211855032320') || message.member.roles.cache.has('623118782012850195')) {
                    if (message.content === `${config.prefix}config language EN` || message.content === `${config.prefix}config language en`) {
                        currentlanguage = enums.languageEnum.EN;
                        message.channel.send(configL[configLEnum.Correct][currentlanguage])
                        user.delete
                    }
                    else if (message.content === `${config.prefix}config language RU` || message.content === `${config.prefix}config language ru`) {
                        currentlanguage = enums.languageEnum.RU;
                        message.channel.send(configL[configLEnum.Correct][currentlanguage])
                    }
                    else {
                        message.channel.send(configL[configLEnum.Wrong][currentlanguage])
                    }
                }
                else { message.channel.send(configL[configLEnum.WrongRole][currentlanguage]) }
            }
        }
    }
        client.user.setActivity('%help', { type: 'PLAYING' });

});