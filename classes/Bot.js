import { config } from 'dotenv';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { buildMessage, getUri } from '../utils/utils.js';
import Livestream from './livestream.js';

config();

export default class DiscordBot {
   constructor() {
      this.client = new Client({
         intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
      });

      this.livestream = new Livestream(getUri, process.env.DISCORD_BOT_TOKEN);
      this.isCurrentlyStreaming = false;
      this.channelId = process.env.CHANNEL_ID;
      this.streamer = process.env.STREAMER;
      this.mentionEveryone = process.env.MENTION_EVERYONE;
      this.updateInterval = +process.env.UPDATE_INTERVAL;
      this.liveStreamMessageId = null;
      this.data = null;
      this.client.once('ready', () => this.onReady());
   }

   async onReady() {
      console.log(
         `Logged in as ${this.client.user.tag} , Monitoring ${this.streamer} stream`
      );
      this.monitorLivestreamStatus();
   }

   async monitorLivestreamStatus() {
      this.checkLivestreamStatus(this.streamer);
      setInterval(() => this.checkLivestreamStatus(this.streamer), this.updateInterval);
   }

   async checkLivestreamStatus() {
      const liveStreamData = await this.livestream.getLiveStreamData(this.streamer);
      if (liveStreamData) {
         this.data = liveStreamData;
         if (!this.isCurrentlyStreaming) {
            this.isCurrentlyStreaming = true;
            return this.sendDiscordMessage(liveStreamData, true);
         }
         this.updateMessage(liveStreamData);
      } else {
         if (this.isCurrentlyStreaming) {
            this.isCurrentlyStreaming = false;
            this.liveStreamMessageId = null;
            this.data.isOffline = true;
            this.updateMessage(data);
         }
      }
   }

   async sendDiscordMessage(data) {
      try {
         const channel = await this.client.channels.fetch(this.channelId);
         const embed = buildMessage(data, this.mentionEveryone);
         if (channel instanceof TextChannel) {
            const newMessage = await channel.send({ embeds: [embed] });
            this.liveStreamMessageId = newMessage.id;
         }
      } catch (error) {
         console.error('Error sending Discord message:', error);
      }
   }

   async updateMessage(data) {
      try {
         const channel = await this.client.channels.fetch(this.channelId);

         if (!(channel instanceof TextChannel)) {
            console.error('Channel is not a TextChannel.');
            return;
         }

         const embed = buildMessage(data, this.mentionEveryone);

         if (this.liveStreamMessageId) {
            try {
               const existingMessage = await channel.messages.fetch(
                  this.liveStreamMessageId
               );
               await existingMessage.edit({
                  content: data.isOffline ? 'Stream Ended' : null,
                  embeds: [embed],
               });
            } catch (editError) {
               if (editError.code === 10008) {
                  await this.sendNewMessage(channel, embed);
               } else {
                  console.error('Error editing Discord message:', editError);
               }
            }
         } else {
            await this.sendNewMessage(channel, embed);
         }
      } catch (error) {
         console.error('Error sending/updating Discord message:', error);
      }
   }

   async sendNewMessage(channel, embed) {
      const newMessage = await channel.send({ embeds: [embed] });
      this.liveStreamMessageId = newMessage.id;
   }

   start() {
      this.client.login(process.env.DISCORD_BOT_TOKEN);
   }
}
