const Discord = require('discord.js');
const qdb = require('quick.db');
const ms = require("ms");
const ayarlar = require('../ayarlar.json');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./database/systems.json');
const sdb = low(adapter);

exports.run = async (client, message, args) => {    

var msg = message;
sdb.read()
var muterole1 = qdb.fetch(`muteroluid_${message.guild.id}`);
var muterole2 = message.guild.roles.cache.find(r => r.id === muterole1);
if (!muterole2) {
    try {
     muterole2 = await message.guild.roles.create({ 
            data: {
                name: "Muted",
                color: "#080707",
                permissions: []
              },
            reason: 'Mute Rolü!' 
            })
        qdb.set(`muteroluid_${message.guild.id}`, muterole2.id);
        message.guild.channels.cache.forEach(async (channel) => {
            await channel.createOverwrite(muterole2, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                  CONNECT: false
              });
          });
} catch (err) {
    console.log(err);
}
};
var kisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!kisi) return message.reply("<a:alert:871046210021122059> Susturmam İçin Bir Kullanıcı Belirtiniz!");
var time = args[1];
var reason = args.slice(2).join(" ")
if (!time) {
    if(reason) {
        if(!sdb.get('mute').find({guild: message.guild.id, user: kisi.id}).value()) {
            let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: reason, time: "INFINITY", finishtime: "INFINITY"}
            sdb.get('mute').push(obj12).write()
            } else {
                let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: reason, time: "INFINITY", finishtime: "INFINITY"}
                sdb.get('mute').find({guild: msg.guild.id, user: kisi.id}).assign(obj12).write()
            }
            if(!kisi.roles.cache.has(muterole2.id)) await kisi.roles.add(muterole2.id);
        message.channel.send(`${kisi} **SINIRSIZ** Şekilde Susturuldu!\nNedeni: **${reason}**\nYetkili: **${message.author}**`);
    } else {
        if(!sdb.get('mute').find({guild: message.guild.id, user: kisi.id}).value()) {
            let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: "No Reason Given", time: "INFINITY", finishtime: "INFINITY"}
            sdb.get('mute').push(obj12).write()
            } else {
                let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: "No Reason Given", time: "INFINITY", finishtime: "INFINITY"}
                sdb.get('mute').find({guild: msg.guild.id, user: kisi.id}).assign(obj12).write()
            }
            if(!kisi.roles.cache.has(muterole2.id)) await kisi.roles.add(muterole2.id);
        message.channel.send(`${kisi} **SINIRSIZ** Şekilde Susturuldu!\nYetkili: **${message.author}**`);
    };
} else {
    let finishtime = Date.now() + ms(time.replace(' dakika', 'm').replace(' saat', 'h').replace(' saniye', 's').replace(' gün', 'd'))
    if(reason){
        if(!sdb.get('mute').find({guild: message.guild.id, user: kisi.id}).value()) {
            let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: reason, time: time, finishtime: finishtime}
            sdb.get('mute').push(obj12).write()
            } else {
                let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: reason, time: time, finishtime: finishtime}
                sdb.get('mute').find({guild: msg.guild.id, user: kisi.id}).assign(obj12).write()
            }
            if(!kisi.roles.cache.has(muterole2.id)) await kisi.roles.add(muterole2.id);
        message.channel.send(`${kisi} **${time}** Süresince Şekilde Susturuldu!\nNedeni: **${reason}**\nYetkili: **${message.author}**`);
        sdb.read()
        let bitiszamani = sdb.get('mute').find({guild: msg.guild.id, user: kisi.id}).value().finishtime
        if(bitiszamani && bitiszamani !== null && bitiszamani !== "INFINITY") {
        let ainterval = setInterval(function() {
            if(bitiszamani <= Date.now()) {
                clearInterval(ainterval)
            if(kisi.roles.cache.find(r => r.id === muterole2.id)){
                kisi.roles.remove(muterole2.id)
                sdb.get('mute').remove(sdb.get('mute').find({guild:message.guild.id, user: kisi.id}).value()).write()
              message.channel.send(`${kisi} Susturulma Süresi Dolduğu İçin Susturulması Kaldırılmıştır.`)
            }
        }
           }, 6000);
        }
    } else {
        if(!sdb.get('mute').find({guild: message.guild.id, user: kisi.id}).value()) {
            let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: "No Reason Given", time: time, finishtime: finishtime}
            sdb.get('mute').push(obj12).write()
            } else {
                let obj12 = {guild: msg.guild.id, guild_name: msg.guild.name, user: kisi.id, user_name: kisi.user.username, staff: msg.author.id, staff_username: message.author.username, channel: message.channel.id, channel_name: message.channel.name, reason: "No Reason Given", time: time, finishtime: finishtime}
                sdb.get('mute').find({guild: msg.guild.id, user: kisi.id}).assign(obj12).write()
            }
            if(!kisi.roles.cache.has(muterole2.id)) await kisi.roles.add(muterole2.id);
        message.channel.send(`${kisi} **${time}** Süresince Şekilde Susturuldu!\nYetkili: **${message.author}**`);
        sdb.read()
        let bitiszamani = sdb.get('mute').find({guild: msg.guild.id, user: kisi.id}).value().finishtime
        if(bitiszamani && bitiszamani !== null && bitiszamani !== "INFINITY") {
        let ainterval = setInterval(function() {
            if(bitiszamani <= Date.now()) {
                clearInterval(ainterval)
                if(kisi.roles.cache.find(r => r.id === muterole2.id)){
                    kisi.roles.remove(muterole2.id)
                    sdb.get('mute').remove(sdb.get('mute').find({guild:message.guild.id, user: kisi.id}).value()).write()
                  message.channel.send(`${kisi} Susturulma Süresi Dolduğu İçin Susturulması Kaldırılmıştır.`)
                }
            }
           }, 6000);
        }
    }
};
};

exports.conf = {
  aliases: ['sustur',],
  permLevel: 2
};

exports.help = {
  name: 'mute',
   kategori: "moderasyon",
  description: 'Sunucudaki Bir Kişiyi Susuturur.',
  usage: 'mute {@kullanici} {zaman} {sebep}'
};