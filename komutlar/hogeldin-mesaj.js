const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  message.channel.bulkDelete(1).then
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
   

   let seçim1 = args.slice(0).join(" ")
  
  let sıfırla = db.fetch(`hgmesaj_${message.guild.id}`)
 if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("HG Log")
    .setFooter(`F-Bot| HG Log Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059>`+"** Hatalı kullanım! örnek: -hg-mesaj <mesaj> /mesajınızda {kullanıcı} ve {sunucu} kullanabilirsiniz.**");
     message.channel.send(embed);
    return;
  }
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`<a:alert:871046210021122059> Hoşgeldin mesajı zaten ayarlı değil.`)
      .setColor("RED"))                     
      return
    }
    db.delete(`hgmesaj_${message.guild.id}`)
   
    message.channel.send(new Discord.MessageEmbed()
     .setDescription(`<a:onayyy:825323769752977428> Hoşgeldin mesajı başarıyla sıfırlandı.`)
      .setColor("GREEN"))                   
    return
  }

  

  
 db.set(`hgmesaj_${message.guild.id}` ,seçim1)
    
   

  
  
 
  
  const embed = new Discord.MessageEmbed()
        .setDescription(`<a:onayyy:825323769752977428> Hoşgeldin mesajı başarıyla ${seçim1} olarak ayarlandı.\nKanalı sıfırlamak için **-hoşgeldinresim sıfırla** yazabilirsiniz!`)
        .setColor("RANDOM")
        .setTimestamp()

  .setThumbnail(message.guild.iconURL({dynamic:true}))
       .setFooter(`${client.user.username}`,message.guild.iconURL({dynamic:true}))
    message.channel.send({embed})
  
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['hg-mesaj', 'hoşgeldinmesaj', 'sethoşgeldinmesaj',"hgmesaj"],
    permLevel: 0
}

exports.help = {
    name: 'hg-mesaj',
    description: 'Hoşgeldin mesajı ayarlamanızı sağlar.',
   kategori: "moderasyon",
    usage: 'hg-mesaj <mesajınız>'
}