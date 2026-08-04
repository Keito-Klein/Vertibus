<h1 align="center">Vertibus</h1>

<div align="center">
  <img width="192" title="Vertibus" src="https://github.com/Keito-Klein.png"/>
</div>

<p align="center">
  <a href="https://github.com/Keito-Klein">
    <img title="Keito-Klein" src="https://img.shields.io/badge/AUTHOR-MiKako-orange.svg?style=for-the-badge&logo=github"></a>
  <a href="https://github.com/Keito-Klein/Vertibus/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-2E8B57?style=for-the-badge" alt="License: MIT" />
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/node.js-20%2B-339933?logo=node.js&style=for-the-badge" alt="Node.js 20+" />
  </a>
</p>

Vertibus automates Toram Online WhatsApp communities with fast in-chat game helpers, group moderation and bilingual utility commands.

## Disclaimer

**IMPORTANT**: Vertibus is provided for educational and personal use purposes only.
Please ensure you:

- **Use responsibly**: Do not spam, harass or send unwanted messages
- **Respect privacy**: Handle user data with care and respect user privacy
- **Use legally**: Follow local laws and WhatsApp terms of service

The repository maintainers are not responsible for any misuse of Vertibus. Users are responsible for their own actions and must ensure they have proper consent before adding the bot to groups.

> [!CAUTION]
> WhatsApp may suspend or ban accounts that violate its terms. Use Vertibus at your own risk.

## Why Vertibus?

This repo provides a WhatsApp bot that:

- Supports Toram Online helper calculations and guides
- Includes group management features for admins
- Uses local JSON or optional MongoDB storage
- Supports Indonesian and English language packs

## Features

### Technical Features

- **Baileys-powered WhatsApp bot**
- **Local session persistence** using `./session`
- **Owner/admin checks** for protected features
- **Language support** via `language/eng` and `language/ind`
- **JSON-based local storage** or optional MongoDB

### Core capabilities

- **Toram helper commands**: `lvling`, `watk`, `cdmg`, `food`, `maze`, `bag`, `mq`, `ailment`, `mqmats`
- **Group commands**: `metadata`, `hidetag`, `tagall`, `bot`, `add`, `kick`, `promote`, `demote`, `welcome`, `antilink`, `antilinkgc`
- **Utility commands**: `sticker`, `smeme`, `pixiv`, `loli`, `milf`, `anime`, `pinterest`, `brat`
- **Owner contact**: `owner`, `info`, `donate`

## Prerequisites

Install the following before running Vertibus:

### Windows

- [Node.js & npm](https://nodejs.org/)
- [Git](https://git-scm.com/download/win)
- Terminal app (built-in)

### macOS

- [Node.js & npm](https://nodejs.org/)
- [Git](https://git-scm.com/download/mac or `brew install git`)
- Terminal app (built-in)

### Linux

- [Node.js & npm](https://nodejs.org/en/download)
- [Git](https://git-scm.com/install/linux)
- Terminal app (built-in)

**Verify installation:**

```bash
node --version
npm --version
git --version
```

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Keito-Klein/Vertibus.git
cd Vertibus
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the bot

Open `setting.js` and update the following values:

- `global.sessionName`: session file name
- `global.owner`: owner phone number(s)
- `global.botName`: bot display name
- `global.mongoDB`: enable MongoDB support
- `global.mongoString`: MongoDB connection string
- `global.facebook` / `global.instagram`: owner contact links

### 4. Run Vertibus

```bash
npm start
```

### 5. Connect WhatsApp

- Vertibus will save auth data in `./session`
- Follow the pairing prompts shown in the terminal
- Once connected, the bot is ready for commands

## Configuration

The bot is configured via `setting.js`.

| Setting              | Description                     | Default                          |
| -------------------- | ------------------------------- | -------------------------------- |
| `global.sessionName` | WhatsApp auth session file name | `client`                         |
| `global.owner`       | Owner phone numbers             | `['628xxxx', '628cccc']`         |
| `global.botName`     | Bot display name                | `Vertibus🔹`                     |
| `global.mongoDB`     | Enable MongoDB storage          | `false`                          |
| `global.mongoString` | MongoDB connection URL          | `Enter Your Connection String!!` |
| `global.facebook`    | Owner Facebook URL              | `url profile Facebook`           |
| `global.instagram`   | Owner Instagram URL             | `Url profile Instagram`          |

## Project structure

| Path         | Purpose                                    |
| ------------ | ------------------------------------------ |
| `index.js`   | Startup and WhatsApp socket initialization |
| `core.js`    | Message handling and command logic         |
| `setting.js` | Bot configuration and owner settings       |
| `language/`  | Multi-language and Toram DB content        |
| `lib/`       | Utility functions and helpers              |
| `db/`        | Local JSON storage management              |
| `mongoDB/`   | Optional MongoDB data adapters             |
| `models/`    | Mongoose schema definitions                |

## Command overview

Vertibus uses prefix-based commands with `/`, `!`, `#` or `.`.

Examples:

- `/menu`, `/info`, `/owner`
- `/watk`, `/cdmg`, `/maze`, `/bag`, `/mq`, `/ailment`
- `/add`, `/kick`, `/promote`, `/demote`, `/welcome`, `/antilink`
- `/sticker`, `/pixiv`, `/pinterest`, `/donate`

## Development

### Updating or adding commands

1. Edit command handling in `core.js`.
2. Add or update language text in `language/eng` and `language/ind`.
3. Restart the bot to apply your changes.

### Helpful code references

- `lang.menu(prefix)`: localized menu output
- `client.sendText(...)` / `client.sendMessage(...)`: message sending
- `global.db`: runtime storage for users and groups
- `Read`, `Create_Update`, `Delete`: data access wrappers for local or MongoDB storage

## Security & Privacy

- **No long-term message storage**: Messages are processed at runtime only
- **Owner-only actions**: Sensitive features limited to configured owners
- **Permission checks**: Group-related actions verify admin/bot status

> [!IMPORTANT]
>
> 1. **Phone number**: Use a personal WhatsApp number for setup
> 2. **Internet connection**: Stable connection is required
> 3. **Session persistence**: Auth state stored in `./session`
> 4. **Rate limiting**: WhatsApp may block spammy behavior
> 5. **Privacy**: Respect group members and avoid unsolicited messages

## Deployment Options

### Termux (Android)

1. Install Termux from F-Droid or the Play Store
2. Update and install dependencies:

```bash
pkg update && pkg upgrade
pkg install nodejs git ffmpeg -y
```

3. Clone and install:

```bash
git clone https://github.com/Keito-Klein/Vertibus.git
cd Vertibus
npm install
```

4. Run the bot:

```bash
npm start
```

5. Pair WhatsApp as usual.

### Cloud hosting

To deploy on a Node.js host:

1. Upload repository files
2. Install dependencies with `npm install`
3. Configure `setting.js`
4. Start the bot with `npm start`

## Troubleshooting

### Common issues

**Bot does not connect**

- Verify the WhatsApp pairing process
- Check that the `./session` folder is writable
- Confirm dependencies installed correctly

**Authentication fails**

- Delete `./session` and retry pairing
- Ensure your phone is online and can receive notifications

**Commands do not work**

- Verify the bot is in the group
- Check bot admin permissions for group commands
- Confirm the command prefix and syntax

**Performance issues**

- Restart the bot if it has been running for a long time
- Check system resources and network stability

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add or improve commands or configuration
4. Test thoroughly
5. Submit a pull request

## Support

If you need help, open an issue in the repository or review source code.

## License

This project is licensed under the [MIT License](./LICENSE)

---

**Based on the Vertibus repository**

**Authentication fails**

- Delete the session file and retry
- Make sure your phone can receive WhatsApp notifications
- Use the correct phone number format when required

**Commands do not respond**

- Ensure the bot is in the group
- Check that the bot has admin permissions for group actions
- Confirm the command prefix and syntax

## Contributing

1. Fork the repository
2. Create a new feature branch
3. Add your command or improvement
4. Test thoroughly
5. Open a pull request

## Support

For issues, questions or contributions:

- Create an issue in the repository
- Review the code and existing documentation

## License

This project is licensed under the [MIT License](./LICENSE)
