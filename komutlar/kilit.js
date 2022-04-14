const ms = require('ms');
const ayarlar = require('../ayarlar.json');
const Discord = require('discord.js');

var prefix = ayarlar.prefix

exports.run = (client, message, args) => {
    message.channel.bulkDelete(1).then
     if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  if (!message.guild) {
  const ozelmesajuyari = new Discord.MessageEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`kilit` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply('Doğru kullanım: ' + prefix + 'kilit <süre örneğin: 200000 ms> veya -kilit aç & kapat');
  if (args[0] == "aç") {
       message.channel.updateOverwrite(message.guild.id, {SEND_MESSAGES: false }).then(() => {
          const embed3 = new Discord.MessageEmbed()
            .setColor("BLACK")
        .setTitle("Kanal Kilit")
      .setFooter(`F-Bot| Kanal Kilit Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:onayyy:825323769752977428>`+"** Kanal kitlendi!**")
          message.channel.send(embed3);
   
    
    }).catch(error => {
      console.log(error);
    });
 
  } else if (args[0] == "kapat") {
       client.lockit[message.channel.id] = setTimeout(() => { 
             
   message.channel.updateOverwrite(message.guild.id, {SEND_MESSAGES: null }).then(() => { 
             const embed2 = new Discord.MessageEmbed()
            .setColor("BLACK")
        .setTitle("Kanal Kilit")
      .setFooter(`F-Bot| Kanal Kilit Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:alert:871046210021122059>`+"** Kanal kilidi açıldı!**")
          message.channel.send(embed2)
           delete client.lockit[message.channel.id];
        }, 1 * 1000);
    })
  };
  if (validUnlocks.includes(time)) {      
  message.channel.updateOverwrite(message.guild.id, {SEND_MESSAGES: null }).then(() => {
         const embed3 = new Discord.MessageEmbed()
            .setColor("BLACK")
        .setTitle("Kanal Kilit")
      .setFooter(`F-Bot| Kanal Kilit Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:alert:871046210021122059>`+"** Kanal kitlendi!**")
          message.channel.send(embed3);
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    })
  } else {  
      message.channel.updateOverwrite(message.guild.id, {SEND_MESSAGES: false }).then(() => {
          const embed4 = new Discord.MessageEmbed()
   .setColor("BLACK")
        .setTitle("Kanal Kilit")
      .setFooter(`F-Bot| Kanal Kilit Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:onayyy:825323769752977428>`+`Kanal kilitlendi. ${ms(ms(time), { long:true })}`)
   message.channel.send(embed4)}).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => { 
             
        message.channel.updateOverwrite(message.guild.id, {SEND_MESSAGES: null }).then(() => { 
             const embed2 = new Discord.MessageEmbed()
            .setColor("BLACK")
        .setTitle("Kanal Kilit")
      .setFooter(`F-Bot| Kanal Kilit Sistemi.`,client.user.avatarURL({dynamic:true}))  
        .setDescription(`<a:alert:871046210021122059>`+"** Kanal kilidi açıldı!**")
          message.channel.send(embed2)}).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });

  
};
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ld'],
  permLevel: 2
};

exports.help = {
  name: 'kilit',
  description: 'Kanalı istediğiniz kadar süreyle kitler.',
   kategori: "moderasyon",
  usage: 'kilit <süre>'
};