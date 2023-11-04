# KickNotify

KickNotify is a versatile livestream notification bot for Discord, designed to keep you informed about your favorite streamers' live broadcasts. With support for a variety of streaming platforms and customizable settings, KickNotify ensures you never miss a moment.

## Requirements

To get started with KickNotify, ensure you have the following prerequisites:

- **Node.js**: You'll need Node.js, and it's recommended to use version 18.18.2 or higher.

- **npm**: Node Package Manager, with a recommended version of 9.8.1 or higher.

- **Headless Browser**: Ensure your platform supports headless browsers. This is necessary for KickNotify to access streaming platforms.

- **Environment Variables**: Create an `.env` file with the following environment variables:

  ```dotenv
  DISCORD_BOT_TOKEN="YOUR_DISCORD_BOT_TOKEN"
  INVITE_URL="YOUR_INVITE_URL"
  STREAMER="STREAMER_USERNAME"
  CHANNEL_ID="YOUR_DISCORD_CHANNEL_ID"
  UPDATE_INTERVAL=60000
  MENTION_EVERYONE=1
  ```

## Installation

To set up KickNotify, follow these simple installation steps:

1. Run `npm install` in your terminal to install all the necessary dependencies.

2. Start KickNotify using one of the following commands:
   - `npm run start` for standard operation
   - `npm run dev` for development mode

## Features

KickNotify offers a range of features to enhance your livestream experience:

- **Automatic Updates**: KickNotify checks for livestream updates every minute, keeping you in the loop in real time. You can customize the update interval to match your preferences.

- **Mention Everyone**: Configure the bot to mention everyone in your Discord server when a stream goes live. This ensures that your server members are promptly informed about the stream.

- **Detailed Information**: KickNotify provides comprehensive information about the live stream, including the stream title, category, start time, and the current number of viewers. This information is updated every minute, ensuring you're always informed.

## TO-DO

I have exciting plans for the future of KickNotify. Here are some of the upcoming enhancements:

- [ ] **Ease of Customization**:make it even easier for you to customize KickNotify according to your specific preferences.

- [ ] **Control Panel**: control panel that will allow you to manage the bot's settings and features conveniently.

- [ ] **Online Time Feature**: Keep track of streamers' online time, providing even more information about their broadcasts.

- [ ] **Role Mentioning**:adding the ability to mention a specific role in your Discord server, so you can notify a designated group of members.

Stay tuned for these exciting updates as we continue to improve KickNotify.

## Contribution

Feel free to contribute, report issues, or request new features to make KickNotify even better.
