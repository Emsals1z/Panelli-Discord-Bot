const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  message.channel.bulkDelete(1).then
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
   let mlog  = message.mentions.channels.first()
  let sıfırla = db.fetch(`kanalaçmalog_${message.guild.id}`)
 if (!args[0])
      {
          const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Bir kanal açma log kanalı belirlemelisin. Ör:!kanalaçmalog #kanal`);
           return message.channel.send(embed)
      }
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`<a:alert:871046210021122059> Kanal Açma Log Kanalı zaten ayarlı değil.`)
      .setColor("RED"))                     
      return
    }
    
    db.delete(`kanalaçmalog_${message.guild.id}`)
    message.channel.send(new Discord.MessageEmbed()
     .setDescription(`<a:onayyy:825323769752977428> Kanal Açma Log Kanalı başarıyla sıfırlandı.`)
      .setColor("GREEN"))                   
    return
  }


  

   
  db.set(`kanalaçmalog_${message.guild.id}` ,mlog.id)
     
  
  
 
  
  const embed = new Discord.MessageEmbed()
        .setDescription(`<a:onayyy:825323769752977428> Kanal Açma Log Kanalı başarıyla ${mlog} olarak ayarlandı.\nKanalı sıfırlamak için **-kanalaçmalog sıfırla** yazabilirsiniz!`)
        .setColor("RANDOM")
        .setTimestamp()
  .setThumbnail(message.guild.iconURL({dynamic:true}))
       .setFooter(`${client.user.username}`,message.guild.iconURL({dynamic:true}))
    message.channel.send({embed})
  
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kanal-açma-log', 'kanal-açma-log-ayarla', 'setkanalaçmalog'],
    permLevel: 0
}

exports.help = {
    name: 'kanalaçmalog',
    description: 'Kanal açma logunu ayarlamanızı sağlar.',
   kategori: "log",
    usage: '!kanalaçmalog #kanal'
}