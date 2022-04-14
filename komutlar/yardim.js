const Discord = require ("discord.js");
const discord = require('discord.js'); //Define the discord.js module
const client = new discord.Client(); //Creating discord.js client (constructor)
const disbut = require('discord-buttons');
const { MessageEmbed } = require('discord.js'); //Define the discord.js module

const { MessageButton } = require('discord-buttons');
exports.run = (client, message) => {
  
  
 

       message.react('<a:onayy:848517607803715594>')
   
  setTimeout(function() {
    
   
var embed = new Discord.MessageEmbed()

  embed.setColor("BLACK")
  embed.setTitle("Yardım Menüsü")
  embed.setDescription(`<@${message.author.id}> Yardım menüsüne hoş geldiniz . Umarım F-Bot'tan memnun kalmışsınızdır. 

• Botu Ekle
[Buraya tıklayarak](https://discord.com/oauth2/authorize?client_id=848551626780573716&scope=bot&permissions=4259314903) F-Bot'u sunucunuza ekleyebilirsin.

• Destek Sunucumuz
[Destek Sunucusuna](https://discord.gg/nnpAvPz) katılarak sizde güzel sohbetlere katılabilirsiniz!

• İnternet Sitesi
[İnternet Sitesine](https://f-bot.cf) bakabilirsiniz. 

**Botun prefixini değiştirmek için -prefix**\n\n 🏠 > Ana Menü\n 🔧 > Moderasyon\n 🎈 > Kullanıcı\n 💠 > Logo\n ⚙️ > Ayarlar`)
  embed.setFooter(`${message.author.username} Tarafından istendi.`,message.author.avatarURL({dynamic:true}))
 embed.setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/871411604015677450/3t8ik7.gif")
 embed.setTimestamp();
    let button6 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('💠') 
  .setID('logo') 
      let button5 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('📑') 
  .setID('log') 
  let button4 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🎈') 
  .setID('eğlence') 
let button3 = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('🔧') 
  .setID('moderasyon') 
let button2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('⚙️') 
  .setID('ayarlar') 
let button1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('🏠') 
  .setID('ev') 
    


 message.channel.send(
{
buttons: [button1,button3,button4,button6,button2],
  embed: embed
}
  
)
   }, 1 * 1000)  
  
  

  
  
  
 

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["y","help","HELP","YARDIM","Help","Y"], 
    permLevel: 0 
};

  exports.help = {
    name: 'yardım', 
    description: 'Botun Komut Listesini Gösterir!',
    kategori: "YARDIM",
    usage: '-yardım'
};
//Sadece ilk sayfa burda geri kalan sayfaları bot.js den düzenleyebilirsiniz