  
const Discord = require('discord.js');

exports.run = (client, message, args) => {
     if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!");
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Yazacağım metni yazarsan sevinirim');
  message.delete();
  message.channel.send(mesaj).then(async message => {


  
  
})
}



  
  



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: 'yazı',
  description: 'Bota mesaj yazdırırsınız.',
   kategori: "moderasyon",
  usage: ''
};