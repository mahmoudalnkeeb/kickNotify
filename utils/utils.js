import { EmbedBuilder } from 'discord.js';

export function getUri(user) {
   return `https://kick.com/api/v2/channels/${user}`;
}

export function getStreamLink(user) {
   return `https://kick.com/${user}`;
}

export function buildMessage(data, mentionEveryone = false) {
   const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(data.title)
      .setDescription(data.streamLink)
      .addFields(
         { name: 'Category', value: data.category, inline: true },
         { name: 'Viewers', value: `${data.viewers}`, inline: true },
         { name: 'Started At', value: data.started_at, inline: true }
      );

   if (mentionEveryone) {
      embed.addFields({ name: 'Mention', value: '@everyone', inline: true });
   }

   embed.setImage(data.thumbnail);
   return embed;
}
