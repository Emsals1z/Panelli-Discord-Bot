const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
   let mlog  = message.mentions.channels.first()
  let sıfırla = db.fetch(`rolgüncellemelog_${message.guild.id}`)
    {
          const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Bir Rol güncelleme log kanalı belirlemelisin. Ör:!rolgüncellemelog #kanal`);
           return message.channel.send(embed)
      }
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`<a:alert:871046210021122059> Rol Güncelleme Log Kanalı zaten ayarlı değil.`)
      .setColor("RED"))                     
      return
    }
    
    db.delete(`rolgüncellemelog_${message.guild.id}`)
    message.channel.send(new Discord.MessageEmbed()
     .setDescription(`<a:onayyy:825323769752977428> Rol Güncelleme Log Kanalı başarıyla sıfırlandı.`)
      .setColor("GREEN"))                   
    return
  }


  

   
  db.set(`rolgüncellemelog_${message.guild.id}` ,mlog.id)
 
  
  
 
  
  const embed = new Discord.MessageEmbed()
        .setDescription(`<a:onayyy:825323769752977428> Rol güncelleme Log kanalı başarıyla ${mlog} olarak ayarlandı.\nKanalı sıfırlamak için **-rolgüncellemelog sıfırla** yazabilirsiniz!`)
        .setColor("RANDOM")
        .setTimestamp()
       .setThumbnail(message.guild.iconURL({dynamic:true}))
       .setFooter(`${client.user.username}`,message.guild.iconURL({dynamic:true}))
    message.channel.send({embed})
  
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['rol-güncelleme-log', 'rol-güncelleme-log-ayarla', 'setrolgüncellemelog', 'Rolgüncelleme-log',"ROL-GÜNCELLEME-LOG","rolgüncellemelog"],
    permLevel: 0
}

exports.help = {
    name: 'rolgüncellemelog',
    description: 'Rol Güncelleme logunu belirlemenize yarar.',
   kategori: "log",
    usage: '!rolgüncellemelog #kanal'
}