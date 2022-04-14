exports.run = async (client, message, args) => {
 
  try {
      let invite = await message.channel.createInvite({
        maxAge: args.age * 60,
        maxUses: args.uses
    }); //CrewCode    
   
  
      message.channel.send('**Bu Sunucunun Davet Linkini Kurdum.**\n'
        + '**Link Aşağıda**'
        + ' **Bu Sunucun Davet Linki **\n' +
        `https://discord.gg/${invite.code}`).catch(e => {
        client.log.error(e);
      });
    }
    catch (e) {
      client.log.error(e);
    }
  };

  //CrewCode
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['create-link', 'createlink', 'sunucudavet', 'davetkur', 'davetlink', 'davetoluştur', 'davet-link' , 'davet-oluştur'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'davet-kur',
    description: 'Bulunduğunuz sunucunun davet linkini atar.',
    kategori: "moderasyon",
    usage: 'davet-kur'
  };