const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
 
exports.run = (client, message, params) => {
   if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
   message.channel.bulkDelete(1).then 
  let a = ""
if(message.guild.iconURL({ dynamic : true }))
    {
        a = `[GIF](${message.guild.iconURL({ dynamic : true })})`
    }
    else {
        a = "__[GIF]__"
    }
  const CrewCodeembed = new Discord.MessageEmbed()
  .setColor("RANDOM")
   .setAuthor(`${message.guild.name} Adlı Sunucunun Resmi:`)
   .setDescription(`[PNG](${message.guild.iconURL({ format: 'png' })})|[JPEG](${message.guild.iconURL({ format: 'jpeg' })})|${a}|[WEBP](${message.guild.iconURL({ format: 'webp' })})`)
  .setFooter(`${message.author.username} Tarafından İstendi.`,message.author.avatarURL({dynamic:true}))
  .setImage(message.guild.iconURL({ dynamic : true }))
  message.channel.send(CrewCodeembed)
}

exports.conf = {
  enabled: true, 
  guildOnly: false, 
    aliases: ["sunucuresmi","sunucu-resmi","sunucuresim","sunucuresim","sunucupp","sunucu-pp","sv-pp","svpp"],
}


exports.help = {
  name: 'sunucuresmi',
  description: 'Sunucu resmini jpeg,png,gif ve webd formatında gösterir.',
    kategori: "kullanıcı",
  usage: '-sunucuresmi',
};