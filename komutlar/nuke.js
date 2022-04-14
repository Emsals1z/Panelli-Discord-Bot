const Discord = require('discord.js');


exports.run = (client, message, arg) => {
  
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
 
        
        message.channel.clone().then(channel => {
            channel.setPosition(message.channel.position)
             const Embed = new Discord.MessageEmbed()
              Embed.setTitle('Bu kanala nükler bomba atıldı')
            Embed.setTimestamp()
            Embed.setColor('#000000')
         Embed.setImage('https://cdn.discordapp.com/attachments/773677879632199700/831458770327437322/bigbang_WVbHI4Ie.gif')
           channel.send(Embed);
        })
        message.channel.delete()
        
   
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bomba','nüklerbomba','nükler'],
  permLevel: 0
};

exports.help = {
  name: 'nuke',
  description: 'Yazdığınız kanalı tamamen sıfırlar.',
   kategori: "moderasyon",
  usage: '-nuke'
};