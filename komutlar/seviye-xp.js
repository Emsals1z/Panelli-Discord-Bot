const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => { 
   message.channel.bulkDelete(1).then
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:iptal:626445972620443648> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
   let kanal = await db.fetch(`svlog_${message.guild.id}`)
  let xp = await db.fetch(`verilecekxp_${message.guild.id}`)
  let hm = await db.fetch(`seviyeacik_${message.guild.id}`)
  let seviyerol = await db.fetch(`svrol_${message.guild.id}`)
  let rollvl = await db.fetch(`rollevel_${message.guild.id}`)
  
  if(!hm) return message.reply('Bu tuhaf! aktif edilmeyen bir seviye sistemine xp değeri eklemeyi düşünmedin umarım? \n Bunu Deniyebilirsin: `$seviye-aç`')
  
  let değer = args[0]
  if(!değer) return message.reply('belirlenecek xp değerini belirlemelisin.')
  if(isNaN(args[0])) return message.channel.send('xp değerini bir sayı biçiminde girmelisin.')
  if(değer > 800) return message.reply('xp değeri `800` den fazla olması,bot sistemine zarar olarak nitelendirilir.')
  

  
  let kontrol;
  if(kanal == null) kontrol = 'Sunucuda Ayarlanmış Bir Logs Bulunamadı!'
  else kontrol = kanal

    let kontrol3;
  if(seviyerol == null) kontrol3 = 'Seviye Rol Sistemi Aktif Değil!'
  else kontrol3 = seviyerol
  
  let selin =new Discord.MessageEmbed()
  .setTitle('İşlem Başarılı!')
  .setDescription('Mesaj başına verilecek olan xp değeri (**'+değer+'**) Olarak ayarlandı!')
.addField('Seviye Log Kanalı:', kontrol, true)
  .addField('Mesaj Başı Verilecek XP:', değer, true)
  .addField('Seviye Rol:', kontrol3)
  .setFooter('F-Bot Seviye Sistemi',client.user.avatarURL({dynamic:true}))
  .setColor('RANDOM')
  message.channel.send(selin)
  
  db.set(`verilecekxp_${message.guild.id}`, değer)
  message.guild.owner.send('Seviye sistemi **'+message.member.user.username+'** ('+message.member.id+') tarafından mesaj başına verilecek xp **'+değer+'** olarak ayarlandı!\n `F-Bot Seviye Sistemi`')


  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'seviye-xp',
  description: 'Kullanıcıların yazı başına kaç xp alıcaklarını ayarlar.', 
   kategori: "seviye",
  usage: 'seviye-xp'
};