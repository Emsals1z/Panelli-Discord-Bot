const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = "!"

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:alert:871046210021122059> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let rol = message.mentions.roles.first()
let sıfırla = db.fetch(`antispamr_${message.guild.id}`)

  if (!rol) {
    return message.channel.send(`<a:alert:871046210021122059>  Antispam Rol olarak ayarlamak istediğin rolü etiketlemelisin.`)
    }

    if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`<a:alert:871046210021122059> Antispam rol zaten ayarlı değil.`)
      .setColor("RED"))                     
      return
    }
    
    db.delete(`antispamr_${message.guild.id}`)
    db.delete(`antispamrn_${message.guild.id}`)
    message.channel.send(new Discord.MessageEmbed()
     .setDescription(`<a:onayyy:825323769752977428> Antispam rol başarıyla sıfırlandı.`)
      .setColor("GREEN"))                   
    return
  }
  
  db.set(`antispamr_${message.guild.id}`, rol.id)
db.set(`antispamrn_${message.guild.id}`, rol.name)
    message.channel.send(new Discord.MessageEmbed()
     .setDescription(`<a:onayyy:825323769752977428>Otorol \`${rol.name}\` olarak ayarlandı.`)
      .setColor("GREEN"))    

  
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['antispam-rol', 'ANTİSPAMROL','ANTİSPAM-ROL'],
    permLevel: 3
}

exports.help = {
    name: 'antispamrol',
    description: 'Sunucuya Girenlere Otomatik Rol Verir.',
  kategori: "güvenlik",
    usage: `antispam-rol <@rol>`
}