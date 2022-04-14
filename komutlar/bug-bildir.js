const Discord = require("discord.js")
const db = require('quick.db');
exports.run = async (client, message, args) => {
 message.channel.bulkDelete(1).then
  
let istek = args.slice(0).join(' ')
if(!istek) return message.channel.send('**Bug Bildirmek için Bir Bug Yazınız.** :x:')
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }


const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.addField(`Kullanıcı Adı`,`<@${message.author.id}>`,true)
.addField(`Bug Bildirilen Sunucu`,`${message.guild.name}`,true)
.addField("Bug",`${istek}`)
.setFooter(`${client.user.username} Bug sistemi.`,message.guild.iconURL({dynamic:true}))
.setThumbnail(message.guild.iconURL({dynamic:true}))
client.channels.cache.get('820317548213829732').send(embed)
  
let kişi = message.mentions.members.first() || message.author;  
message.channel.send(`<a:gen:811545751385538590>${kişi} Bug bildiriminiz gönderildi.<a:gen:811545751385538590>`).then(message => message.delete({ timeout: 5000 }));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bugbildir","Bugbildir","BUGBİLDİR"],
  permLevel: 0  
};

exports.help = {
  name: 'bug-bildir',
  description: 'bug belirtmeye yarar',
   kategori: "kullanıcı",
  usage: '-bug-bildir <bug>'
}


