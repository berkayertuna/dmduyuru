const Discord = require('discord.js');
const db = require('quick.db');
const embed = new Discord.RichEmbed()

exports.run = (client, message, args) => {

embed.setColor("#8A2BE2") 
  
   
    if ((db.fetch(`dmduyuru`)) == 1) {
      db.set(`dmduyuru`, 0);
      message.channel.send(embed.setDescription(`<a:847221779260637184:946134867790430288>${message.author} DmDuyuru Devredışı!`));
 //     message.guild.channels.cache.get(config.channel.log).send(embed.setDescription(`<a:847221779260637184:946134867790430288> ${author} Kişisi Rol Komutlarını Devredışı Bıraktı!`))
    }
      else {
      db.set(`dmduyuru`, 1);
      message.channel.send(embed.setDescription(`<a:847221779260637184:946134867790430288> ${message.author} DmDuyuru Aktifleştirildi!`));
 //    message.guild.channels.cache.get(config.channel.log).send(embed.setDescription(`<a:847221779260637184:946134867790430288> ${author} Kişisi Rol Komutlarını Aktifleştirdi!`))
      }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['duyuru'],
  permLevel: 0
};
exports.help = {
  description: 'Mesajınızı botun bulunduğu sunucudaki insanlara duyurur.',
  name: 'duyur-aç-kapat',
  usage: 'dmduyuru [mesaj]'
};
