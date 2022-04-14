const Discord = require("discord.js");
const superagent = require("superagent");
const { stripIndents } = require("common-tags");

exports.run = async (client,message,args,msg) => {
  
  let x;
  let x2;
  let x3;
  let x4;
  let x5;
  let x6;
  let x7;
  let x8;
  let x9;
  let x10;
  let x11;
  
 message.channel.bulkDelete(1).then
  var rol = message.content.split(" ").slice(1).join(" ");
  let role = message.guild.roles.cache.find(role => role.name === rol);
  
  var hata = new Discord.MessageEmbed()
  .setColor("#36393F")
  .setDescription("❌ Lütfen Bir Rol İsmi Yazın `Örnek: *rolbilgi <rol ismi>` **Not: Kendinizden Yüksek Rollere Bakamassınız** ");
  if(!role) return message.channel.send(hata);
   //yönetici
  if (role.permissions.has("ADMINISTRATOR")) x = "✔";
  if (!role.permissions.has("ADMINISTRATOR")) x = "❌";

  //Denetim kaydı
  if (role.permissions.has("VIEW_AUDIT_LOG")) x2 = "✔";
  if (!role.permissions.has("VIEW_AUDIT_LOG")) x2 = "❌";

  //Sunucuyu yönet
  if (role.permissions.has("MANAGE_GUILD")) x3 = "✔";
  if (!role.permissions.has("MANAGE_GUILD")) x3 = "❌";

  //Rolleri yönet
  if (role.permissions.has("MANAGE_ROLES")) x4 = "✔";
  if (!role.permissions.has("MANAGE_ROLES")) x4 = "❌";

  //Kanalları yönet
  if (role.permissions.has("MANAGE_CHANNELS")) x5 = "✔";
  if (!role.permissions.has("MANAGE_CHANNELS")) x5 = "❌";

  //üyeleri at
  if (role.permissions.has("KICK_MEMBERS")) x6 = "✔";
  if (!role.permissions.has("KICK_MEMBERS")) x6 = "❌";

  //üyeleri yasakla
  if (role.permissions.has("BAN_MEMBERS")) x7 = "✔";
  if (!role.permissions.has("BAN_MEMBERS")) x7 = "❌";

  //mesajları yönet
  if (role.permissions.has("MANAGE_MESSAGES")) x8 = "✔";
  if (!role.permissions.has("MANAGE_MESSAGES")) x8 = "❌";

  //kullanıcı adlarını yönet
  if (role.permissions.has("MANAGE_NICKNAMES")) x9 = "✔";
  if (!role.permissions.has("MANAGE_NICKNAMES")) x9 = "❌";

  //emojileri yönet
  if (role.permissions.has("MANAGE_EMOJIS")) x10 = "✔";
  if (!role.permissions.has("MANAGE_EMOJIS")) x10 = "❌";

  //webhookları yönet
  if (role.permissions.has("MANAGE_WEBHOOKS")) x11 = "✔";
  if (!role.permissions.has("MANAGE_WEBHOOKS")) x11 = "❌";
  var moment = require("moment");
  var temps = moment(message.createdTimestamp).format("LLLL");
  var Crewembed = new Discord.MessageEmbed()
 

  
 
 
  .setColor('RANDOM')
  .addField('✏ Rol İsmi', role.name, true)
  .addField('🆔 ID', role.id, true)
  .addField('👥 Role Sahip Kullanıcı Sayısı', role.members.size, true)
 .addField('💙 Renk', role.hexColor, true)
  .addField('📣 Etiketleme?', role.mentionable ? '\nEvet' : 'Hayır', true)
  .addField('📅 Oluşturulduğu Zaman', moment(role.createdAt).format("LL"), true)
   .addField('İzinleri;', `   \`\`\`diff
${x} Yönetici
${x2} Denetim Kaydını Görüntüle
${x3} Sunucuyu Yönet
${x4} Rolleri Yönet
${x5} Kanalları Yönet
${x6} Üyeleri At
${x7} Üyeleri Yasakla
${x8} Mesajları Yönet
${x9} Kullanıcı Adlarını Yönet
${x10} Emojileri Yönet
${x11} Webhook'ları Yönet
\`\`\``, true)
  message.channel.send(Crewembed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rolinfo', 'rolhakkında', 'rolbilgi'],
  permLevel: 0
};

exports.help = {
  name: 'rolinfo',
  description: 'rolinfo | Rol hakkında bilgi verir.',
  kategori: "kullanıcı",
  usage: 'rolinfo <rolismi>'
};