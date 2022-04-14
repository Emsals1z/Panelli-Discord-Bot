const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
     if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  var roles = db
    .all()
    .filter(data => data.ID.startsWith(`rolereactions_${message.guild.id}`))
    .sort((a, b) => b.data - a.data);
  
  if (!roles.length) {
    let noEmbed = new Discord.MessageEmbed()
      .setAuthor(message.member.displayName, message.author.displayAvatarURL())
      .setColor("#FF5349")
      .setFooter("<a:alert:871046210021122059> Sisteme emoji rol sistemi eklenmemiş!");
    return message.channel.send(noEmbed);
  }

  const embed = new Discord.MessageEmbed()
    .setTitle(
      `Rol reaksiyonları \`POZİSYON\` | \`ID\` | \`ROL\` | \`EMOJI\` | \`MESAJ ID\``
    )
    .setColor("#FF5349");

  let page = Math.ceil(roles.length / 10);
  let pg = parseInt(args[0]);
  if (pg != Math.floor(pg)) pg = 1;
  if (!pg) pg = 1;

  let end = pg * 10;
  let start = pg * 10 - 10;
  let array = [];
  let i;
  if (roles.length === 0) {
    embed.addField("Hata", " Sayfa bulunamadı!");
  } else if (roles.length <= start) {
    embed.addField("Hata", "Sayfa bulunamadı!");
  } else if (roles.length <= end) {
    embed.setFooter(`Sayfa ${pg} / ${page}`);

    for (i = start; i < roles.length; i++) {
      let data = roles[i].data;
      let data31 = JSON.parse(data);
      let role = message.guild.roles.cache.get(data31.role);
      let msgurl;
    
      array.push(
        `\`#${roles.indexOf(roles[i]) + 1}\` \`${data31.id}\` | ${role} | \`${
          data31.emoji
        }\` | [${data31.msg}](${data31.url})`
      );
      embed.setDescription(array.join("\n"));
    }
  } else {
    embed.setFooter(`Sayfa ${pg} / ${page}`);

    for (i = start; i < end; i++) {
      let data = roles[i].data;
      let data31 = JSON.parse(data);
      let role = message.guild.roles.cache.get(data31.role);
      let msgurl;
   
      array.push(
        `\`#${roles.indexOf(roles[i]) + 1}\` \`${data31.id}\` | ${role} | \`${
          data31.emoji
        }\` | [${data31.msg}](${data31.url})`
      );
      embed.setDescription(array.join("\n"));
    }
  }

  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rollist', 'rr-list', 'RRLİST'],
  permLevel: 0
};

exports.help = {
  name: "rrlist",
  description: "Tepki rolleri sıralar !bakımda!",
  kategori: "moderasyon",
  usage: "-rrlist"
};
