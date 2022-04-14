const Discord = require('discord.js')
const db = require('quick.db')

exports.run = (client, message, args) => {
if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`Bu komutu kullanabilmek için "\`Kanalları Yönet\`" yetkisine sahip olmalısın.`);
  let a = args[0]
  if(!args[0]) return message.reply('<a:alert:871046210021122059> Yanlış kullanım! `-kayıtayarla aç Veya kapat <kanal> <@verilecekrol>`')
  if(args[0] == 'aç'){
  let kanal = message.mentions.channels.first() || message.guild.channels.get(args[1])
  let ver = message.mentions.roles.first() || message.guild.roles.get(args[2])
  
  if(!kanal) return message.channel.send('<a:alert:871046210021122059> Bir Kayıt Kanalını Etiketlemeli Veya İdsini Girmelisin')
    if(!ver) return message.channel.send('<a:alert:871046210021122059> Kayıt Olunca Verilecek Rolün İdsini Girmelisin')
 
  
  
  db.set(`kayitsistem_${message.guild.id}`, 'açık')
  db.set(`kanalkayit_${message.guild.id}`, kanal)
  db.set(`verkayit_${message.guild.id}`, ver.id)
  message.channel.send('Kayıt Başarıyla Ayarlandı!')
}
  if(args[0] == 'kapat'){
    db.set(`kayitsistem_${message.guild.id}`, 'kapat')
  db.delete(`kanalkayit_${message.guild.id}`)
  db.delete(`verkayit_${message.guild.id}`)
    message.channel.send('Kayıt başarıyla kapatıldı!')
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kayıt-ayarla"],
  permLevel: 0
};

exports.help = {
  name: 'kayıtayarla',
  usage: 'ka',
  description: 'Katı odasını ve verilecek rolü ayarlamanızı sağlar.',
   kategori: "moderasyon",
};