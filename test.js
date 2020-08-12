const Discord = require('discord.js');

const fs = require('fs');
const ytdl = require('ytdl-core');
var opus = require('node-opus');
const main = require('./main.js')

const client = new Discord.Client();

client.on("message", function (message) {
    if (message.content === 'test') {
        message.channel.send('test')
    }
})