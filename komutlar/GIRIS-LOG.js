const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
   let mlog  = message.mentions.channels.first()
  let sıfırla = db.fetch(`girişlog_${message.guild.id}`)
 if (!args[0])
      {
          const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Bir giriş log kanalı belirlemelisin. Ör:!girişlog #kanal`);
           return message.channel.send(embed)
      }
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`<a:alert:871046210021122059> Giriş Log Kanalı zaten ayarlı değil.`)
      .setColor("RED"))                     
      return
    }
    
    db.delete(`girişlog_${message.guild.id}`)
    message.channel.send(new Discord.MessageEmbed()
     .setDescription(`<a:onayyy:825323769752977428> Giriş Log Kanalı başarıyla sıfırlandı.`)
      .setColor("GREEN"))                   
    return
  }


  

   
  db.set(`girişlog_${message.guild.id}` ,mlog.id)
  
  
  
 
  
  const embed = new Discord.MessageEmbed()
        .setDescription(`<a:onayyy:825323769752977428> Giriş Log kanalı başarıyla ${mlog} olarak ayarlandı.\nKanalı sıfırlamak için **-girişlog sıfırla** yazabilirsiniz!`)
        .setColor("RANDOM")
        .setTimestamp()
  .setThumbnail(message.guild.iconURL({dynamic:true}))
       .setFooter(`${client.user.username}`,message.guild.iconURL({dynamic:true}))
    message.channel.send({embed})
  
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['g-log', 'g-log-ayarla', 'girişçıkışlog',"glog","GLOG","G-LOG","GİRİŞLOG"],
    permLevel: 0
}

exports.help = {
    name: 'girişlog',
    description: 'Giriş logu kanalını ayarlamanızı sağlar.',
  kategori:"moderasyon",
   kategori: "log",
    usage: '!girişlog #kanal'
}