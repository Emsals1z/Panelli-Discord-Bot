const Discord = require('discord.js');

exports.run = async (client, message, args) => {
   if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  let user = message.mentions.users.first();
  if (!user) return message.reply('Bir kişiyi etiketlemelisin!');
  
  if (user.bot === true) return message.reply('Bir bot etiketleme');
  
  let mesaj = args.slice(1).join(' ');
  if (!mesaj) return message.reply('Yazılmasını istediğin yazıyı yazmalısın!');
  if (mesaj.includes("@everyone")) return message.reply('`@everyone` Etiketi Attıramasın');
  if (mesaj.includes("@here")) return message.reply('`@here` Etiketi Attıramasın');
  
  message.delete();
  
  try { 
    
 let webhook = await message.channel.createWebhook(user.username, { avatar: user.displayAvatarURL() }) 
   const mentionHook = new Discord.WebhookClient(webhook.id, webhook.token);
 
        mentionHook.send(mesaj);
     setTimeout(function() {
       webhook.delete();
     }, 1000)
  } catch (err) {
    message.channel.send(`**Hata:** \n\`\`\`js\n${err}\n\`\`\``);
};
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fake-mesaj'],
  permLevel: 3,
 
};

exports.help = {
  name: 'sahtemesaj',
  description: 'İstediğiniz yazıyı bota webhook ile etiketlenen kullanıcının ağzından yazdırır.',
    kategori: "eğlence",
  usage: 'yazdır <@kullanıcı> <yazı>'
};