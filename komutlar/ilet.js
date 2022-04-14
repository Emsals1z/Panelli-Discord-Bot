const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  message.react('<a:onayy:823559589345230869>')
   setTimeout(function() {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  
let ilet = args.slice(0).join(' ')
if(!ilet) return message.channel.send(`<a:alert:871046210021122059>`+'Yapımcıyı başarılı birşekilde iletmek için **Sunucunun davet linki** ile birlikte atınız!. :x:')

const embedCrewCode = new Discord.MessageEmbed()
.setTitle("Yapımcıyı cağırma sistemi")
.setColor('BLUE')
 .setThumbnail(message.author.avatarURL({dynamic:true}))
.setFooter(`E-Bot `,client.user.avatarURL({dynamic:true}))
.setDescription(`**İlettiği kanal** ${message.channel.name} \n **Çağrılınan sunucu** \`${message.guild.name}\` \n **çağıran Kullanıcı** <@${message.author.id}> \n **Mesajı :** \`${ilet}\``)
client.channels.cache.get('848527865582452736').send(embedCrewCode)

message.channel.bulkDelete(1).then 
     
}, 1 * 2500); 
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0  
};

exports.help = {
  name: 'ilet',
  description: 'Yapımcıyı cagırmaya yarar',
   kategori: "kullanıcı",
  usage: 'ilet'
}