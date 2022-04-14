const Discord = require('discord.js');
  const db = require('quick.db')
  
  
  
exports.run = async (client, message, args) => {
      if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
      message.channel.bulkDelete(1).then 
  let user;
    
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
let a = ""
if(user.displayAvatarURL({ dynamic : true }))
    {
        a = `[GIF](${user.displayAvatarURL({ dynamic : true })})`
    }
    else {
        a = "__[GIF]__"
    }
 const avatar = new Discord.MessageEmbed()
        .setColor("RANDOM")
       .setAuthor('Avatar:')
 .setDescription(`[PNG](${user.displayAvatarURL({ format: 'png' })})|[JPEG](${user.displayAvatarURL({ format: 'jpeg' })})|${a}|[WEBP](${user.displayAvatarURL({ format: 'webp' })})`)
   .setFooter(`${message.author.username} Tarafından İstendi.`,message.author.avatarURL({dynamic:true}))
        .setImage(user.avatarURL({dynamic:true}))
    message.channel.send(avatar)
    
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["pp","PP","AVATAR","Avatar"],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  category: 'kullanıcı',
  description: 'Belirtilen kişinin veya komutu yazan kişinin avatarını jpeg,png,gif ve webd formatında gösterir.',
  kategori: "kullanıcı",
   usage:'-avatar <@kişi-etiket> veya -avatar'
}