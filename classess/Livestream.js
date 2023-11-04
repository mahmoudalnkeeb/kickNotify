import fetch from 'node-fetch';
import puppeteer from 'puppeteer';
import { getStreamLink } from '../utils/utils.js';

export default class Livestream {
   constructor(uri) {
      this.uri = uri;
      this.browser = null;
      this.page = null;
   }

   async initialize() {
      if (!this.page) {
         this.browser = await puppeteer.launch({ headless: 'new' });
         this.page = await this.browser.newPage();
         await this.page.setUserAgent(
            'Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0'
         );
      }
   }

   async getLiveStreamData(user) {
      try {
         await this.initialize();
         await this.page.goto(this.uri(user));

         const data = await this.page.evaluate(async (uri) => {
            const response = await fetch(uri);
            return response.json();
         }, this.uri(user));

         if (!data || !data.livestream) return false;
         const livestreamData = data.livestream;
         return {
            title: livestreamData?.session_title,
            viewers: livestreamData?.viewer_count,
            thumbnail: livestreamData?.thumbnail.url,
            started_at: livestreamData?.created_at,
            category: livestreamData?.categories[0]?.name,
            streamLink: getStreamLink(user),
         };
      } catch (error) {
         console.error(error);
      }
   }

   async close() {
      if (this.browser) {
         await this.browser.close();
         this.page = null;
         this.browser = null;
      }
   }
}
