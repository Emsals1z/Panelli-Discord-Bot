const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {

  const db = require('quick.db');
  

    
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!");
  //if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`);
  
  const user = await message.mentions.members.first()
  let reason = args.slice(1).join(' ');
  //let modLog = JSON.parse(fs.readFileSync("./jsonlar/mLog.json", "utf8"));
  if (db.has(`blog_${message.guild.id}`) === false) return message.reply('Mod log kanalı ayarlanmamış');
  let modlog = message.guild.channels.cache.get(db.fetch(`blog_${message.guild.id}`));
  if (message.mentions.users.size < 1) return message.reply('Lütfen banlamak istediğiniz üyeyi etiketleyin');
  if (reason.length < 1) return message.reply('Lütfen sebep giriniz');
  if (user.id === message.author.id) return message.reply('Kendinimi banlayacaksın?');
  /*if (user.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
			return message.reply(`Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}*/
  //if (!message.guild.member(user).bannable) return message.channel.send(`Bu kişiyi sunucudan yasaklayamıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);
  

  user.send(`\`${message.guild.name}\` Adlı Sunucuda yaptığınız olumsuz davranışlardan dolayı yasaklandınız\nYetkilinin girdiği sebep: \`${reason}\``)
  
   //if (!message.guild.member(user).bannable) return message.reply('Yetkilileri yasaklayamam!');
  user.ban({ days: 7 , reason: reason })
  
  const embed2 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`Başarıyla banlandı`)
  message.channel.send(embed2)

  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban','yasakla','banla'],
  permLevel: 3,
  kategori: "moderasyon",
};

exports.help = {
  name: 'yasakla',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  kategori: "moderasyon",
  usage: 'yasakla <@kullanıcı> <sebep>',
 
};