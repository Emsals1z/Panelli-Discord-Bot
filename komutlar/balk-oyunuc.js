const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const fetch1 = require('node-fetch')
const discord = require('discord.js'); //Define the discord.js module
const client = new discord.Client(); //Creating discord.js client (constructor)
const disbut = require('discord-buttons');
const { MessageEmbed } = require('discord.js'); //Define the discord.js module
exports.run =(client, message, params) => {
  message.channel.bulkDelete(1).then 
       
        const { channel } = message.member.voice 
        if(!channel) return message.reply("Sesli bir kanala girmen gerekli")
  
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("**Hata, 'Davet Oluştur' yetkisi bulunamadı.**");
    var embed = new Discord.MessageEmbed()

  embed.setColor("BLACK")
  
embed.setDescription(`**Balık oyunu \`${channel.name}\` adlı kanalda başlatılıyor. Oynamak için ▶️ emojisine tıklayınız** `)
  embed.setFooter(`${message.author.username} Tarafından Başlatıldı.`,message.author.avatarURL({dynamic:true}))
 embed.setThumbnail("https://cdn.discordapp.com/attachments/836533918760042508/856527249900961802/ezgif-2-90ad2ce86265.gif")
 embed.setTimestamp();
        fetch1(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "814288819477020702",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${ayarlar.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (invite.error || !invite.code) return message.channel.send("**Hata, Oyun başlatılamadı.**");
            let button1 = new disbut.MessageButton()
    .setLabel("▶️")
    .setStyle("url")
    .setURL(`https://discord.gg/${invite.code}`)
             let button2 = new disbut.MessageButton()
    .setLabel("Destek Sunucusu")
    .setStyle("url")
    .setURL("https://discord.gg/evnWJBzwsc")
           message.channel.send(
{
buttons: [button1,button2],
  embed: embed
}
          )      
            })
            .catch(e => {
                message.channel.send("**Hata, Oyun başlatılamadı.**");
            })
    

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["balık-oyun","balık-oyunu"],
  permLevel: 0
};

exports.help = {
  name: 'balıkoyunu',
  description: 'Youtubeden video izleyebilirsiniz.',
  kategori: "eğlence",
  usage: 'balıkoyunu'
};
