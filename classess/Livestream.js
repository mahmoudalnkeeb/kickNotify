import { getStreamLink } from '../utils/utils.js';
import tougCookie from 'tough-cookie';
import initCycleTLS from 'cycletls';

export default class Livestream {
   constructor(uri) {
      this.uri = uri;
      this.cookieJar = new tougCookie.CookieJar();
   }

   async getLiveStreamData(user) {
      try {
         const cycleTLS = await initCycleTLS();
         const requestUrl = this.uri(user);
         const data = await cycleTLS(requestUrl, {
            userAgent:
               'KICK/1.0.13 Dalvik/2.1.0(Linux; U; Android 13; Pixel 6 Pro Build / TQ1A.221205.011)',
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json',
               Cookie: await this.cookieJar.getCookieString(requestUrl),
               Authorization: `Bearer ${this.bearerToken}`,
            },
         });

         cycleTLS.exit();

         const body = data.body;
         if (!body || !body.livestream) return false;
         const livestreamData = body.livestream;
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
}
