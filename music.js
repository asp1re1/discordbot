require('dotenv').config()
const { Client } = require('discord.js');

    const fs = require('fs');
    const ytdl = require('ytdl-core');
    var opus = require('node-opus');

const client = new Client({disableEveryone: true});

const queue = new Map()
const prefix = '%'
client.login('NzQwNTkzNDA4NzQxMDgxMjA4.XyrRXA.za6_ls3i34F3uvCWnqZfGyxNG0M');

client.on('ready', () => console.log('Active'))

client.on('message', async message => {

    const args = message.content.substring(prefix.length).split(" ")

    if (message.content.startsWith(`${prefix}play`)) {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music")
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has('CONNECT')) return message.channel.send("I don't have permissions to connect to the voice channel")
        if (!permissions.has('SPEAK')) return message.channel.send("I don't have permissions to speak in the channe")

        const songinfo = await ytdl.getInfo(args[1])
        const song = {
            title: songInfo.title,
            url: songInfo.video_url
        }

        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            }
            queue.set(message.guild.id, queueConstruct)

            queueConstruct.songs.push(song)


            try {
                var connection = await voiceChannel.join()
                queueConstruct.connection = connection
                play(message.guild, queueConstruct.songs[0])
            } catch (error) {
                console.log(`There was an error connecting to the voice channel: ${error}`)
                queue.delete(message.guild.id)
                return message.channel.send(`There was an error connecting to the voice channel: ${error}`)
            }
        }  else {
            serverQueue.songs.push(song)
            return message.channel.send(`**${song.title}** has been added to the queue`)
        }
        return undefined

    } else if (message.content.startsWith(`${prefix}stop`)) {
        if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to stop the music")
        if (!serverQueue) return message.content.send("There is nothing playing")
        serverQueue.songs = []
        serverqueue.connection.dispatcher.end()
        message.channel.send("I have stopped the music for you")
        return undefined
    }   else if (message.content.startsWith(`${prefix}skip`)) {
            if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to skip the music")
            if (!serverQueue) return message.channel.send("There is nothing playing")
            serverQueue.connection.dispatcher.end()
            message.channel.send("I have skipped the music for you")
            return undefined
        }
    }
)

function play(guild, song) {
    const serverQueue = queue.get(guild.id)

    if (!song) {
        serverQueue.voiceChannel.leave()
        queue.delete(guild.id)
        return
    }

    const dispatcher = serverQueue.connection.play(ytdl(song.url))
        .on('finish', () => {
            serverQueue.songs.shift()
            play(guild, serverQueue.songsp[0])
        })
        .on('error', error => {
            console.log(error)
        })
    dispatcher.setVolumeLogarithmic(setQueue.volume / 5)
}