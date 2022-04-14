const Discord = require("discord.js")
const db = require('quick.db');
exports.run = async (client, message, args) => {
 message.channel.bulkDelete(1).then
 var üye = message.mentions.users.first();  
let istek = args.slice(0).join(' ')
if(!istek) return message.channel.send('**Tip Bildirmek için Bir Tip Yazınız.** :x:')
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
     const kayitk = await db.fetch(`ilog_${message.guild.id}`);
  const kayitk2 = message.guild.channels.cache.find(channel => channel.name === kayitk );
  if (!kayitk2) return;
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.addField(`Kullanıcı Adı`,`<@${message.author.id}>`,true)
.addField(`Tip Bildirilen Sunucu`,`${message.guild.name}`,true)
.addField("İstek",`${istek}`)
.setFooter(`${client.user.username} Tip sistemi.`,message.guild.iconURL({dynamic:true}))
.setThumbnail(message.guild.iconURL({dynamic:true}))
kayitk2.send(embed)
  
let kişi = message.mentions.members.first() || message.author;    
message.channel.send(`<a:gen:811545751385538590>${kişi} Tip bildiriminiz gönderildi.<a:gen:811545751385538590>`).then(message => message.delete({ timeout: 5000 }));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0  
};

exports.help = {
  name: 'tip',
  description: 'tip belirtmeye yarar',
  kategori: "kullanıcı",
  usage: '-tip <tip>'
}


