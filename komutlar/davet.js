

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
  embed.setTitle("Davet")
embed.setDescription(`
• Sunucuma nasıl eklerim?
[Buraya tıklayarak](https://discord.com/oauth2/authorize?client_id=848551626780573716&scope=bot&permissions=4259314903) F-Bot'u sunucunuza ekleyebilirsin.

• Destek Sunucumuz
[Destek Sunucusuna](https://discord.gg/nnpAvPz) katılarak sizde güzel sohbetlere katılabilirsiniz!

• İnternet Sitesi
[İnternet Sitesine](https://f-bot.cf) bakabilirsiniz.

© 2020 EmsalsizTR | Tüm hakları saklıdır.
`)
  embed.setFooter(`${message.author.username} Tarafından istendi.`,message.author.avatarURL({dynamic:true}))
 embed.setThumbnail("https://cdn.discordapp.com/avatars/848551626780573716/7cfc16ac8d6ce9208c9260e281637c37.png?size=512")
 embed.setTimestamp();

let button3 = new disbut.MessageButton()
    .setLabel("Bot Davet")
    .setStyle("url")
    .setURL("https://discord.com/oauth2/authorize?client_id=848551626780573716&scope=bot&permissions=4259314903")
let button2 = new disbut.MessageButton()
    .setLabel("Destek Sunucusu")
    .setStyle("url")
    .setURL("https://discord.gg/evnWJBzwsc")
let button1 = new disbut.MessageButton()
     .setLabel("İnternet Sitesi")
    .setStyle("url")
    .setURL("https://f-bot.cf")
    


 message.channel.send(
{
buttons: [button3,button2,button1],
  embed: embed
}
  
)
   }, 1 * 1000)  
  
  

  
  
  
 

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["d","invite"], 
    permLevel: 0 
};
  
  exports.help = {
    name: 'davet', 
    description: 'Botu davet etmenize yarar.',
     kategori: "kullanıcı",
    usage: '-davet'
};