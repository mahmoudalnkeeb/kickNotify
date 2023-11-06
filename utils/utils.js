import { EmbedBuilder } from 'discord.js';

export function getUri(user) {
   return `https://kick.com/api/v2/channels/${user}`;
}

export function getStreamLink(user) {
   return `https://kick.com/${user}`;
}

export function buildMessage(data, mentionEveryone = 0) {
   const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(data.title)
      .setDescription(data.streamLink)
      .addFields(
         { name: 'Category', value: data.category, inline: true },
         { name: 'Viewers', value: `${data.viewers}`, inline: true },
         { name: 'Started At', value: data.started_at, inline: true },
         {
            name: 'Mention',
            value: +mentionEveryone
               ? `@everyone , <@&${process.env.MENTION_ROLE}>`
               : `<@&${process.env.MENTION_ROLE}>`,
            inline: true,
         }
      );
   embed.setImage(data.thumbnail);
   return embed;
}
