const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  message.channel.bulkDelete(1).then
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
   let mlog  = message.mentions.channels.first()
  let sıfırla = db.fetch(`kanalsilmelog_${message.guild.id}`)
 if (!args[0])
      {
          const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Bir silme açma log kanalı belirlemelisin. Ör:!kanalsilmelog #kanal`);
           return message.channel.send(embed)
      }
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`<a:alert:871046210021122059> Silme Açma Log Kanalı zaten ayarlı değil.`)
      .setColor("RED"))                     
      return
    }
    
    db.delete(`kanalsilmelog_${message.guild.id}`)
    message.channel.send(new Discord.MessageEmbed()
     .setDescription(`<a:onayyy:825323769752977428> Kanal Silme Log Kanalı başarıyla sıfırlandı.`)
      .setColor("GREEN"))                   
    return
  }


  

   
  db.set(`kanalsilmelog_${message.guild.id}` ,mlog.id)
     
  
  
 
  
  const embed = new Discord.MessageEmbed()
        .setDescription(`<a:onayyy:825323769752977428> Kanal Silme Log Kanalı başarıyla ${mlog} olarak ayarlandı.\nKanalı sıfırlamak için **-kanalsilmelog sıfırla** yazabilirsiniz!`)
        .setColor("RANDOM")
        .setTimestamp()
  .setThumbnail(message.guild.iconURL({dynamic:true}))
       .setFooter(`${client.user.username}`,message.guild.iconURL({dynamic:true}))
    message.channel.send({embed})
  
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kanal-silme-log', 'kanal-silme-log-ayarla', 'setkanalsilmelog'],
    permLevel: 0
}

exports.help = {
    name: 'kanalsilmelog',
    description: 'Kanal silme logunu ayarlamanızı sağlar.',
   kategori: "log",
    usage: '!kanalsilmelog #kanal'
}