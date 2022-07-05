const Discord = require('discord.js');
const client = new Discord.Client();//lrows
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');//lrows
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');//lrows
const db = require('quick.db');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');//lrows
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

//-----------------------------------------------\\//lrows
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log("Bot Aktf!");
  response.sendStatus(200);
});//lrows
app.listen(8000);
setInterval(() => {
  http.get(`http://projeadın.glitch.me/`);//lrows
}, 280000)
//-----------------------------------------------\\//lrows

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};//lrows//lrows

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);//lrows
    files.forEach(f => {//lrows
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);//lrows
        props.conf.aliases.forEach(alias => {//lrows
            client.aliases.set(alias, props.help.name);//lrows//lrows
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {//lrows
        try {//lrows
            delete require.cache[require.resolve(`./komutlar/${command}`)];//lrows
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);//lrows
            client.aliases.forEach((cmd, alias) => {//lrows//lrows
                if (cmd === command) client.aliases.delete(alias);
            });//lrows
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {//lrows
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();//lrows
        } catch (e) {
            reject(e);
        }//lrows
    });
};
//lrows
client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);//lrows
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });//lrows//lrows
            resolve();
        } catch (e) {
            reject(e);
        }//lrows//lrows//lrows//lrows
    });
};
//lrows
//lrows


client.unload = command => {
    return new Promise((resolve, reject) => {
        try {//lrows
            delete require.cache[require.resolve(`./komutlar/${command}`)];//lrows//lrows
            let cmd = require(`./komutlar/${command}`);//lrows
            client.commands.delete(command);//lrows//lrows
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);//lrows
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;//lrows//lrows//lrows
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });//lrows//lrows

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {//lrows
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);//lrows

//-----------------------KOMUTLAR-----------------------\\//lrows//lrows