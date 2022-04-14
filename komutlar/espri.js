const Discord = require('discord.js');
const client = new Discord.Client();

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'espiri',
  description: 'Balık Tutarsın.',
  usage: 'balıktut',
    kategori: "eğlence",
};

exports.run = (client, message) => {
      if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  
  const embed = new Discord.MessageEmbed()
 embed.setDescription("Espri Yükleniyor..")
  return message.channel.send(embed).then(m => {
   var espriler = ['+En hızlı sayı hangisidir?\n-Ne\n+10\n-Neden?\nÇünkü onun arabası var.','+Yangın dolabını açarsan ne olur?\n-Yang kızar','Boşluktaki fil’e ne denir? Fil in the blanks!','Sınav kola ya beniyodu ama aslında fantaydı','Adamın biri yarın öleceğim demiş.',' Yarmışlar ölmüş.\nSeni görünce; \ngözlerim dolar, \nkulaklarım euro.','Gidenin arkasına bakmayın yoksa geleni göremezsiniz.','+Oğlum canlılara örnek ver. \n-Kedi, köpek. \n+Cansızlara örnek ver. \n-Ölü kedi, ölü köpek.','+Kanka ben banyoya 3 kişi giriyom. \n-Oha nasıl? \n+Hacı, Şakir ve ben. \n-Defol lan!','+Kocanızla ortak özelliğiniz ne? \n-Aynı gün evlendik.','+Evladım ödevini neden yapmadın? \n-Bilgisayarım uyku modundaydı, uyandırmaya kıyamadım.','+Bizim arkadaş ortamında paranın lafı bile olmaz. \n-Niye ki? \n+Çünkü hiç birimizin parası yok.','Annemin bahsettiği elalem diye bir örgüt var illuminatiden daha tehlikeli yemin ederim.','+Acıkan var mı ya? \n-Yok bizde tatlı kan var.','Yılanlardan korkma, yılmayanlardan kork.','+Baykuşlar vedalaşırken ne der? \n-Bay bay baykuş.','Beni Ayda bir sinemaya götürme, Marsta bir sinemaya götür.','Aaa, siz çok terlemişsiniz durun size terlik getireyim.','Aklımı kaçırdım, 100.000 TL fidye istiyorum.'];
      var espri = espriler[Math.floor(Math.random() * espriler.length)];
  const embed = new Discord.MessageEmbed()
  embed.setDescription(`${espri}`)
 return m.edit(embed)
 });
  }

