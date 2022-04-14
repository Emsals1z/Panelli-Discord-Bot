const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('<a:alert:871046210021122059>  Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  
  let panel = await db.fetch(`sunucupanel_${message.guild.id}`)
  if(args[0] === "sil" || args[0] === "kapat") {
    db.delete(`sunucupanel_${message.guild.id}`)
    try {
      await message.guild.channels.find(x => (x.name).includes("Sunucu Panel")).delete()
      await message.guild.channels.find(x => (x.name).includes("Toplam Üye:")).delete()
      await message.guild.channels.find(x => (x.name).includes("Aktif Üye:")).delete()
      await message.guild.channels.find(x => (x.name).includes("Botlar:")).delete()
      await message.guild.channels.find(x => (x.name).includes("Rekor Aktiflik:")).delete()
    } catch(e) { }
           const embed2 = new Discord.MessageEmbed()
   .setColor("BLACK")
        .setTitle("Sunucu Panel")
      .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:alert:871046210021122059> Ayarlanan sunucu paneli başarıyla devre dışı bırakıldı!`)
    message.channel.send(embed2)
   return 
  }
        const embed1 = new Discord.MessageEmbed()
   .setColor("BLACK")
        .setTitle("Sunucu Panel")
      .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:alert:871046210021122059> Bu sunucuda panel zaten ayarlanmış! Devredışı bırakmak için;  \`${prefix}sunucupanel sil\``)
  if(panel) return message.channel.send(embed1)
  
  message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setTitle('Sunucu Panel').setDescription('Gerekli dosaylar kurulsun mu?').setFooter('Onaylıyorsanız 15 saniye içerisinde "evet" yazmalısınız.'))
  .then(() => {
    message.channel.awaitMessages(response => response.content === 'evet', {
      max: 1,
      time: 15000,
      errors: ['time'],
    }) 
    .then((collected) => { 
      try {
        let role = message.guild.roles.cache.find(role => role.name === "@everyone");
        message.guild.channels.create(`Sunucu Panel`, {type: "category"}, [{id: message.guild.id, deny: ['CONNECT']}]);
        message.guild.channels.create(`Toplam Üye: ${message.guild.memberCount}`, {type: "voice"}).then(channel => channel.setParent(message.guild.channels.cache.find(channel => channel.name === `Sunucu Panel`))).then(c => {
          c.updateOverwrite(role, {
            CONNECT: false,
          });
        })
        message.guild.channels.create(`Aktif Üye: ${message.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`, {type: "voice"}).then(channel => channel.setParent(message.guild.channels.cache.find(channel => channel.name === `Sunucu Panel`))).then(c => {
          c.updateOverwrite(role, {
            CONNECT: false,
          });
        })
        message.guild.channels.create(`Botlar: ${message.guild.members.cache.filter(m => m.user.bot).size}`, {type: "voice"}).then(channel => channel.setParent(message.guild.channels.cache.find(channel => channel.name === `Sunucu Panel`))).then(c => {
          c.updateOverwrite(role, {
            CONNECT: false,
          });
        })
        message.guild.channels.create(`Rekor Aktiflik: ${message.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`, {type: "voice"}).then(channel => channel.setParent(message.guild.channels.cache.find(channel => channel.name === `Sunucu Panel`))).then(c => {
          c.updateOverwrite(role, {
            CONNECT: false,
          });
        })
     
        db.set(`sunucupanel_${message.guild.id}`, message.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
        const embed = new Discord.MessageEmbed()
   .setColor("BLACK")
        .setTitle("Sunucu Panel")
      .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:onayyy:825323769752977428> Sunucu panel için gerekli kanallar oluşturuldu, ayarlamaları yapıldı!  \`(Oda isimlerini değiştirmeyin, çalışmaz!)\``)
 
        message.channel.send(embed)
      } catch(e) {
        console.log(e.stack);
      }
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sunucu-panel",'panel','panel-kur'],
  permLevel: 3
};

exports.help = {
  name: 'sunucupanel',
  description: 'Sunucu istatistiklerini gösteren panel kurar ve otomatik olarak günceller.',
  usage: '!sunucupanel',
  kategori: 'moderasyon'
};