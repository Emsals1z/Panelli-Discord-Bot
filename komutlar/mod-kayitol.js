const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args, member) => {
message.channel.bulkDelete(1).then
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  let sistem = db.fetch(`kayitsistem_${message.guild.id}`)
let kanal = db.fetch(`kanalkayit_${message.guild.id}`)
let verr = db.fetch(`verkayit_${message.guild.id}`)
let user = message.mentions.users.first()
  let isim = args[0]
  let yas = args[1]
  if(kanal) {
  let kaid = kanal.id
 
    
if(!sistem || sistem == null || sistem == undefined || sistem == 'kapat') return;
  if(message.channel.id !== kaid) return message.channel.send('<a:alert:871046210021122059> Sadece Kayıt Kanalından Kayıt Olabilirsiniz.').then(msg => msg.delete({ timeout: 5000}));

  let verrt = message.guild.roles.cache.get(verr)

  if(!isim) return message.channel.send('<a:alert:871046210021122059> Seni Kayıt Etmem İçin Bir İsim Girmelisin : `!kayıtol Emre 17`')
if(!yas) return message.channel.send('<a:alert:871046210021122059> Yaş İçin En Az 1 Basamak Belirtebilirsin. Örnek: `!kayıtol Emre 17`')
  if(yas.length >= 3) return message.channel.send('<a:alert:871046210021122059> Yaş İçin En Fazla 2 Basamak Belirtebilirsin. Örnek: `!kayıtol Emre 17`')
  if(isNaN(yas)) return message.channel.send('<a:alert:871046210021122059> Yaş İçin Sayı Girmelisin. Örnek: `!kayıtol Emre 17`').then(msg => msg.delete({ timeout: 5000}));
  
  
  message.member.setNickname(`${isim} | ${yas}`)
  message.channel.send(`<a:onayyy:825323769752977428> <@${message.author.id}> Kaydınız Oluşturuldu.`).then(msg => msg.delete({ timeout: 5000}));
  setTimeout(() => {
   message.member.roles.add(verr)
}, 3000); 
message.member.roles.cache.forEach(CrewCode => {
message.member.roles.remove(CrewCode)

  })
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayıt-ol'],
  permLevel: 0
};

exports.help = {
  name: 'kayıtol',
  usage: 'kayıt',
  description: 'Kayıt olan yazan kişiyi kaydeder.',
   kategori: "moderasyon",
};