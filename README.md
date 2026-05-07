<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logos/logo-dark.png">
    <img alt="Scool Bot Logo" src="src/logos/logo.png" width="128">
  </picture>
</p>

<p align="center">
  <strong>Your first-rate Discord bot for monitoring school life.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/License-AGPL3-yellow.svg?style=for-the-badge" alt="License">
</p>

---

## 📖 Overview

Scool Bot is a Discord bot developed in TypeScript, made to manage your school from with Discord. It is the companion bot for [scool.qzz.io](https://scool.qzz.io), helping students stay organized and learn their lessons more efficiently.

## 🚀 Features

- 🔗 **Integration**: Seamlessly connects with Discord via Discord.js.
- 🗄️ **Persistent storage**: Powered by MongoDB Atlas for reliable data management.
- ⚙️ **Fully modular**: Easily extendable command and event handling system.
- 🌐 **Multi-language**: Support for English and French.
- 🛡️ **Admin tools**: Configuration options.

## 📌 Getting Started

### Add to your server

Ready to use Scool Bot? Click the link below to invite it to your Discord server:

[**👤 Invite Scool Bot**](https://discord.com/oauth2/authorize?client_id=1500944923560509450&permissions=8&integration_type=0&scope=bot+applications.commands)

---

## 🛠️ Self-Hosting & Development

If you wish to deploy your own instance or contribute to development, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.11.0 or higher) or [Bun](https://bun.com/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- A Discord Developer Application

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Scool-app/Scool-bot.git
   cd Scool-bot
   ```

2. **Install dependencies:**

   With npm:

   ```bash
   npm install
   ```

   With Bun:

   ```bash
   bun install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   DISCORD_TOKEN=your_bot_token
   CLIENT_ID=your_client_id
   MONGODB_URI=your_mongodb_uri
   ```

### Deployment

1. **Register Slash Commands:**

   With npm:

   ```bash
   npm run deploy
   ```

   With Bun:

   ```bash
   bun run deploy
   ```

2. **Build and Start:**

   With npm:

   ```bash
   npm run build
   npm start
   ```

   With Bun:

   ```bash
   bun run build
   bun start
   ```

**For development with hot-reload:**

With npm:

```bash
npm run dev
```

With Bun:

```bash
bun run dev
```

---

## ⌨️ Commands

<details>
<summary><b>General Commands</b></summary>

| Command   | Description                                   |
| :-------- | :-------------------------------------------- |
| `/help`   | List all available commands.                  |
| `/info`   | Get information about Scool and its status.   |
| `/invite` | Get the official invite link for the bot.     |
| `/ping`   | Check the bot's WebSocket and API latency.    |
| `/site`   | Access the official Scool website.            |
| `/social` | Discover our social media links and founders. |
| `/soon`   | View the roadmap for upcoming features.       |

</details>

<details>
<summary><b>Administration Commands</b></summary>

| Command           | Description                               |
| :---------------- | :---------------------------------------- |
| `/setup view`     | Display the current server configuration. |
| `/setup language` | Set the bot's language (English/French).  |
| `/setup channel`  | Configure the announcement channel.       |
| `/setup role`     | Define the administrator role for Scool.  |
| `/setup logs`     | Set the channel where logs will be sent.  |

</details>

---

## ⭐ Roadmap

Scool is constantly evolving. Here are the features currently in development:

- 📅 **EcoleDirecte linking**: Get data and make actions to EcoleDirecte.
- 👥 **Class Spaces**: Dedicated areas for collaboration.
- 🔔 **Smart Reminders**: Automated alerts for your tasks.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git switch feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the AGPL 3.0 License. See `LICENSE.md` for more information.

<p align="center">Made with ❤️ by <b>the Scool team</b></p>
