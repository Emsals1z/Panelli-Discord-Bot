const Discord = require('discord.js');
const backup = require('discord-backup');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send('<a:alert:871046210021122059> Sunucu yedek komutlarına erişmek için üyeleri yönetme yetkinizin olması lazım.');
    }

    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send('<a:alert:871046210021122059> Lütfen geçerli bir ID girin!');

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.MessageEmbed()
            .setAuthor('ℹ️ Yedek', backup.data.iconURL)
            .addField('Sunucu İsmi', backup.data.name)
            .addField('Boyut', backup.size + ' kb')
            .addField('Oluşturma', formattedDate)
            .setFooter('Yedek ID: '+backup.id);

        return message.channel.send(embed);

    }).catch((err) => {

        if (err === 'No backup found')
            return message.channel.send('<a:alert:871046210021122059> '+backupID+'Id bulunamadı');
        else
            return message.channel.send('<a:alert:871046210021122059> error : '+(typeof err === 'string') ? err : JSON.stringify(err));

    });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Yedek-Bilgi","YedekBilgi","YEDEK-BİLGİ"],
  permLevel: 0
};

exports.help = {
  name: 'yedek-bilgi',
  description: 'Sunucuyu yedeğinin bilgisini gösterir',
   kategori: "moderasyon",
  usage: '-yedek-bilgi <yedek-id>'
};