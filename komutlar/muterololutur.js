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
var muterole1 = qdb.fetch(`muteroluid_`);
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
        qdb.set(`muteroluid_`, muterole2.id);
          qdb.set(`antispamr_${message.guild.id}`, muterole2.id)
        qdb.set(`antispamrn_${message.guild.id}`, muterole2.name)
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
         const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle("Mute rol oluşturucu")
      .setFooter(`F-Bot| Mute rol oluşturucu`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:onayyy:825323769752977428>`+"** Mute rolü oluşturulup ayarlandı!**");

      message.channel.send(embed);
};

exports.conf = {
  aliases: ['mute-rol-oluştur',],
  permLevel: 2
};

exports.help = {
  name: 'muterololuştur',
  description: 'Sunucuya hazır bir mute rol oluşturur ve antispam için kaydeder.',
   kategori: "moderasyon",
  usage: 'muterololuştur'
};