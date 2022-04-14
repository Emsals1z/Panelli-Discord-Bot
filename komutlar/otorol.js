const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:onaylanmad:660744451760586762> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let rol = message.mentions.roles.first()
  let rolk = message.mentions.channels.first()
  
  
  if (!rol) {
    return message.channel.send(`<a:alert:871046210021122059> Otorol olarak ayarlamak istediğin rolü etiketlemelisin.`)
    }
  
  if (!rolk) {
    message.channel.send(`<a:alert:871046210021122059> Otorol kanalını etiketlemelisin.`)
  }
  
  if (!rolk) return;
  
  
  db.set(`otorol_${message.guild.id}`, rol.id)
  db.set(`rolK_${message.guild.id}` ,rolk.id)
  
    message.channel.send(`<a:onayyy:825323769752977428> Otorol \`${rol.name}\`, otorol kanalı #${rolk.name} olarak ayarlandı.`)
  
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['otorol-ayarla', 'oto-rol','otorol','otorolayarla'],
  kategori: 'ayarlar',
    permLevel: 3
}

exports.help = {
    name: 'otorol-ayarla',
    description: 'Otorol kanalını ve verilecek rolü ayarlar.',
   kategori: "moderasyon",
    usage: 'otorol-ayarla <@rol> <#kanal>'
}