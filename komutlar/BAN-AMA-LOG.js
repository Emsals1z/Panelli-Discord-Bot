const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
   let mlog  = message.mentions.channels.first()
  let sıfırla = db.fetch(`banaçmalog_${message.guild.id}`)
 if (!args[0])
      {
          const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Bir ban açma log kanalı belirlemelisin. Ör:!banaçmalog #kanal`);
           return message.channel.send(embed)
      }
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`<a:alert:871046210021122059> Ban Açma Log Kanalı zaten ayarlı değil.`)
      .setColor("RED"))                     
      return
    }
    
    db.delete(`banaçmalog_${message.guild.id}`)
    message.channel.send(new Discord.MessageEmbed()
     .setDescription(`<a:onayyy:825323769752977428> Ban Açma Log Kanalı başarıyla sıfırlandı.`)
      .setColor("GREEN"))                   
    return
  }


  

   
  db.set(`banaçmalog_${message.guild.id}` ,mlog.id)
   
  
  
 
  
  const embed = new Discord.MessageEmbed()
        .setDescription(`<a:onayyy:825323769752977428> Ban Açma log kanalı başarıyla ${mlog} olarak ayarlandı.\nKanalı sıfırlamak için **-banaçnalog sıfırla** yazabilirsiniz!`)
        .setColor("RANDOM")
        .setTimestamp()
  .setThumbnail(message.guild.iconURL({dynamic:true}))
       .setFooter(`${client.user.username}`,message.guild.iconURL({dynamic:true}))
    message.channel.send({embed})
  
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ban-açma-log', 'ban-açma-log-ayarla', 'setbanlog', 'banAçmalog',"ban-açma-log"],
    permLevel: 0
}

exports.help = {
    name: 'banaçmalog',
    description: 'Ban logu ayarlamanızı sağlar.',
   kategori: "log",
    usage: '!banaçmalog #kanal'
}