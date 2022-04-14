const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
   let mlog  = message.mentions.channels.first()
  let sıfırla = db.fetch(`roldeğiştirmelog_${message.guild.id}`)
    {
          const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
   .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059> Bir Değiştirme açma log kanalı belirlemelisin. Ör:!roldeğiştirmelog #kanal`);
           return message.channel.send(embed)
      }
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`<a:alert:871046210021122059> Rol Değiştirme Log Kanalı zaten ayarlı değil.`)
      .setColor("RED"))                     
      return
    }
    
    db.delete(`roldeğiştirmelog_${message.guild.id}`)
    message.channel.send(new Discord.MessageEmbed()
     .setDescription(`<a:onayyy:825323769752977428> Rol Değiştirme Log Kanalı başarıyla sıfırlandı.`)
      .setColor("GREEN"))                   
    return
  }


  

   
  db.set(`roldeğiştirmelog_${message.guild.id}` ,mlog.id)
 
  
  
 
  
  const embed = new Discord.MessageEmbed()
        .setDescription(`<a:onayyy:825323769752977428> Rol Değiştirme Log kanalı başarıyla ${mlog} olarak ayarlandı.\nKanalı sıfırlamak için **-roldeğiştirmelog sıfırla** yazabilirsiniz!`)
        .setColor("RANDOM")
        .setTimestamp()
       .setThumbnail(message.guild.iconURL({dynamic:true}))
       .setFooter(`${client.user.username}`,message.guild.iconURL({dynamic:true}))
    message.channel.send({embed})
  
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['rol-değiştirme-log', 'rol-değiştirme-log-ayarla', 'setroldeğiştirmelog', 'Roldeğiştirme-log',"ROL-DEĞİŞTİRME-LOG","roldeğiştirmelog"],
    permLevel: 0
}

exports.help = {
    name: 'roldeğiştirmelog',
    description: 'Rol Değiştirme logunu belirlemenize yarar.',
   kategori: "log",
    usage: '!roldeğiştirmelog #kanal'
}