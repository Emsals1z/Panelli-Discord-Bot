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
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const ağla = new Discord.MessageEmbed()
    .setAuthor('Botu Ağlattın İyimi?')
    .setColor(3447003)
    .setTimestamp()
    .setDescription('')
        .setImage(`https://media3.giphy.com/media/2rtQMJvhzOnRe/giphy.gif?cid=790b76115d398a482f6177556b32d70a&rid=giphy.gif`)
    return message.channel.send(ağla);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ağla',
  description: 'Bot U Ağlatırsınız',
  kategori: "eğlence",
  usage: 'ağla'
};