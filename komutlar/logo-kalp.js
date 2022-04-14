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
  if(!isim)return message.channel.send("Lütfen Bişey Yaz")
let link = "https://bcassetcdn.com/asset/logo/4362501d-64af-4538-8b4e-051670b7dc5f/logo?v=4&text="+isim
  const CrewCodeembed = new Discord.MessageEmbed()
  .setImage(link)
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
  name: 'kalp',
    description: 'Yazdığınız yazıyı kalp fontuyla yazar.',
   kategori: "logo",
  usage: 'kalp <yazı>'
};