const backup = require('discord-backup');
   const discord = require("discord.js")
const Discord = require("discord.js")
exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send('<a:alert:871046210021122059> Sunucu yedek komutlarına erişmek için üyeleri yönetme yetkinizin olması lazım.');
    }

    const backupID = args.join(' ');

    backup.fetch(backupID).then(() => {
     
const embed = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`<a:alert:871046210021122059> Bütün roller,kanallar ve ayarlar silinip yedek aldığınız bilgiler eşliğinde sunucu ayrlanıcaktır.\`devam\` yazarak devam edebilir ve \`iptal\` yazarak iptal edebilrsiniz!`)
        message.channel.send(embed);

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['devam', 'iptal'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === 'devam';
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {
                    const embed1 = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTimestamp()
    .setDescription('<a:onayyy:825323769752977428> Yedek başarıyla yüklendi!')

                    return message.author.send(embed1);
            
                }).catch((err) => {
            
                    if (err === 'No backup found')
                        {
                           const embed2 = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('<a:alert:871046210021122059> '+backupID+' bu idyle bir yedek bulamadım')
                        return message.channel.send(embed2);
                            }
                    else
                        return message.author.send('<a:alert:871046210021122059> An error occurred: '+(typeof err === 'string') ? err : JSON.stringify(err));
            
                });

            } else {
                    const embed3 = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('<a:alert:871046210021122059> İptal Edildi.')
                return message.channel.send(embed3);
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time'){
                const embed4 = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('<a:alert:871046210021122059> Komut zaman aşımına uğradı lütfen daha sonra deneyin.')
                return message.channel.send(embed4);
                }
        })

    }).catch(() => {
            const embed5 = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('<a:alert:871046210021122059> '+backupID+' bu idyle bir yedek bulamadım')
        return message.channel.send(embed5);
    });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Yedek-Yükle","YedekYükle","YEDEK-YÜKLE"],
  permLevel: 0
};

exports.help = {
  name: 'yedek-yükle',
  description: 'Sunucuyu yedeğini yükler',
    kategori: "moderasyon",
  usage: '-yedek-yükle <yedek-id>'
};