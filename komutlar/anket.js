const Discord = require('discord.js');
exports.run = async (client, message, args) => {

let anket = args.slice(0).join(" ")
if(!anket) return message.channel.send("Ne Anketi Yapıcaz?")

    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  message.delete();
let Kexpert = new Discord.MessageEmbed()
.setFooter(`${message.author.username} Tarafından anket yapıldı.`,message.author.avatarURL({dynamic:true}))
.setColor("RANDOM")
.setTimestamp()
.setTitle(message.guild.name +" Anket")
.setDescription(`
${anket}



<a:onayyy:757018736845783101> → Evet
<a:reddetme:757018761126608946> → Hayır
`)
.setThumbnail(message.guild.iconURL({dynamic:true}))
message.channel.send(Kexpert).then(async message => {
	message.react(`<a:onayyy:757018736845783101>`)
	message.react(`<a:reddetme:757018761126608946>`)

  
  
})
}

// CrewCode
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oylama","OYLAMA","ANKET"],
  permLevel: 0
}

exports.help = {
  name: 'anket',
  description: "Anket yapmanızı sağlar.",
  kategori: "moderasyon",
  usage: '!anket <ahnketyapılcakmesaj>'
}