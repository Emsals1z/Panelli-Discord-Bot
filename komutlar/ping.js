const Discord = require('discord.js')
 
exports.run = async (client ,message, args) =>{

 if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  
  const Crewembed = new Discord.MessageEmbed()
  .setTitle(`<a:ping:871726476574216242> Pingim!`)
  .setColor("BLACK")
  .setDescription(`${client.ws.ping} ms`)
  message.channel.send(Crewembed)
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['ping'],
 permLevel: 0
};
 
exports.help = {
 name: 'ping',
 description: 'Botun Pingine Bakarsın',
  kategori: "kullanıcı",
 usage: '!ping'
};
 