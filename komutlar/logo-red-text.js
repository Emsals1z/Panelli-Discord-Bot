const Discord = require('discord.js');
exports.run = (client, message, args) => {
if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  let isim = args.slice(0).join("+")
  if(!isim)return message.channel.send("**Lütfen Bişey Yaz**")
let link = `https://habbofont.net/font/windows_blue/${isim}.gif`
  const CrewCodeembed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setImage(link)
   .setFooter('Kırmızı Logo Oluşturuldu')
  message.channel.send(CrewCodeembed)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: 'logolar',
  permLevel: 0
};
exports.help = {
  name: 'redtext',
   description: 'Yazdığınız yazıyı kırmızı fontuyla yazar.',
   kategori: "logo",
  usage: ''
};
