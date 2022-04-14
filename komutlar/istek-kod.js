const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  message.channel.bulkDelete(1).then
let istek = args.slice(0).join(' ')

if(!istek) return message.channel.send(`<a:alert:871046210021122059>`+'**İstek kod Bildirmek için Bir İstek Yazınız.** :x:')

const embedCrewCode = new Discord.MessageEmbed()
.setTitle("F-Bot İstek Sistemi")
.setColor('BLUE')
.setDescription(`**istek Kanalı** ${message.channel.name} \n **istek Bildirilen Sunucu** \`${message.guild.name}\` \n **İstek Bildiren Kullanıcı** <@${message.author.id}> \n **İstenen komut :** \`${istek}\``)
 .setThumbnail(message.author.avatarURL({dynamic:true}))
.setFooter(`F-Bot `,client.user.avatarURL({dynamic:true}))
client.channels.cache.get('848527865582452736').send(embedCrewCode)
  
message.channel.send(`<a:bot:848517607245742100>`+"İstek kod  bildiriminiz gönderildi."+`<a:bot:823952968159068211>`).then(message => message.delete({ timeout: 5000 }));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["İSTEKKOD","istekkod","İSTEK-KOD","İstekkod"],
  permLevel: 0  
};

exports.help = {
  name: 'istek-kod',
  description: 'İstek kodları belirtmeye yarar',
   kategori: "kullanıcı",
  usage: 'istek-kod <istek>'
}