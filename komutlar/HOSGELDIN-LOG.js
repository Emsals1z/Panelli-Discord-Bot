const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  message.channel.bulkDelete(1).then
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
   let mlog  = message.mentions.channels.first()
   let seçim = args[1]
  let sıfırla = db.fetch(`hglog_${message.guild.id}`)
  let sıfırla1 = db.fetch(`hglogarka_${message.guild.id}`)
 if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("HG Log")
    .setFooter(`E-Bot| HG Log Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059>`+"** Hatalı kullanım! örnek: -hg-log #kanal resimli/yazı**");
    message.channel.send(embed);
    return;
  }
     if (!args[1]) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("HG Log")
    .setFooter(`E-Bot| HG Log Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059>`+"** Hatalı kullanım! resimli mi yazılı mı? örnek: -hg-log #kanal resimli/yazı**");
    message.channel.send(embed);
    return;
  }
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`<a:onayyy:825323769752977428> Hoşgeldin Log Kanalı ve  Hoşgeldin Log Seçim resim/yazı zaten ayarlı değil.`)
      .setColor("RED"))                     
      return
    }
    db.delete(`hglogarka_${message.guild.id}`)
    db.delete(`hglog_${message.guild.id}`)
    message.channel.send(new Discord.MessageEmbed()
     .setDescription(`<a:onayyy:825323769752977428> Hoşgeldin Log Kanalı ve  Hoşgeldin Log Seçim resim/yazıbaşarıyla sıfırlandı.`)
      .setColor("GREEN"))                   
    return
  }

  

  
 db.set(`hglogarka_${message.guild.id}` ,seçim)
    
   
  db.set(`hglog_${message.guild.id}` ,mlog.id)
   
  
  
 
  
  const embed = new Discord.MessageEmbed()
        .setDescription(`<a:onayyy:825323769752977428> Hoşgeldin log kanalı başarıyla ${mlog} olarak ayarlandı.\nHoşgeldin Log Seçim başarıyla ${seçim} olarak ayarlandı \nKanalı sıfırlamak için **-hoşgeldinlog sıfırla** yazabilirsiniz!`)
        .setColor("RANDOM")
        .setTimestamp()
  .setThumbnail(message.guild.iconURL({dynamic:true}))
       .setFooter(`${client.user.username}`,message.guild.iconURL({dynamic:true}))
    message.channel.send({embed})
  
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['hg-log', 'hg-log-ayarla', 'sethoşgeldinlog'],
    permLevel: 0
}

exports.help = {
    name: 'hoşgeldinlog',
    description: 'Hoşgeldin logu ayarlamanızı sağlar',
   kategori: "log",
    usage: '!hoşgeldinlog #kanal'
}