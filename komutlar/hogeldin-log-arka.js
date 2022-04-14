const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  message.channel.bulkDelete(1).then
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
    if(db.has(`hglogarka_${message.guild.id}`) === "resimli")
        {const embed = new Discord.MessageEmbed()
      .setColor("BLACK")

    .setFooter(`F-Bot`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059>`+"** Lütfen ilk başta resimli hoş geldini açın Ör: -hg-log-aç aç resimli**")
         message.channel.send({embed})
        }

   let seçim1 = args[0]
  
  let sıfırla = db.fetch(`hglogarkaresim_${message.guild.id}`)
 if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("HG Log")
    .setFooter(`F-Bot| HG Log Sistemi.`,client.user.avatarURL({dynamic:true}))  
      .setDescription(`<a:alert:871046210021122059>`+"** Hatalı kullanım! örnek: -hg-resim <fotoğraf linki>**");
     message.channel.send(embed);
    return;
  }
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`<a:onayyy:825323769752977428> Hoşgeldin resmi zaten ayarlı değil.`)
      .setColor("RED"))                     
      return
    }
    db.delete(`hglogarkaresim_${message.guild.id}`)
   
    message.channel.send(new Discord.MessageEmbed()
     .setDescription(`<a:onayyy:825323769752977428> Hoşgeldin resmi başarıyla sıfırlandı.`)
      .setColor("GREEN"))                   
    return
  }

  

  
 db.set(`hglogarkaresim_${message.guild.id}` ,seçim1)
    
   

  
  
 
  
  const embed = new Discord.MessageEmbed()
        .setDescription(`<a:loading2:698852588765839360> Hoşgeldin resmi başarıyla ${seçim1} olarak ayarlandı.\nKanalı sıfırlamak için **-hoşgeldinresim sıfırla** yazabilirsiniz!`)
        .setColor("RANDOM")
        .setTimestamp()
  .setImage(seçim1)
  .setThumbnail(message.guild.iconURL({dynamic:true}))
       .setFooter(`${client.user.username}`,message.guild.iconURL({dynamic:true}))
    message.channel.send({embed})
  
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['hg-resim', 'hoşgeldinresim', 'sethoşgeldinresim'],
    permLevel: 0
}

exports.help = {
    name: 'hg-resim',
    description: 'Hoşgeldin log arka plan resmini ayarlamanızı sağlar.',
   kategori: "moderasyon",
    usage: 'hg-resim <foto linki>'
}