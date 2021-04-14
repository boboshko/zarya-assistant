![Version](https://img.shields.io/badge/version-0.1.0-brightgreen.svg?style=flat-square)
[![Community Chat](https://img.shields.io/badge/Community-Chat-blueChat?style=flat-square&logo=telegram)](https://t.me/codeque)

# Zarya Assistant

Zarya Assistant — [Telegram](https://telegram.org) is the bot, based on the well known library [Telegraf](https://telegraf.js.org). It's designed to work with [Zarya API](https://github.com/boboshko/zarya-api) and is the final user interface of the [ecosystem](#Zarya-ecosystem).

💫 Chasing [a dream](https://www.facebook.com/onlysemeon/posts/582696555261097).

## Contents

- [Functions](#Functions)
  - [User](#User)
  - [Technical](#Technical)
- [Demo](#Demo)
- [Fast launch](#Fast-launch)
  - [Installation](#Installation)
  - [Set up](#Set-up)
  - [Launch](#Launch)
- [Commands](#Commands)
- [Values](#Values)
- [Zarya ecosystem](#Zarya-ecosystem)
- [Acknowledgements](#Acknowledgements)
- [Support](#Support)

## Functions

### User

- Air temperature display (Fahrenheit or Celsius).
- Athmosphere pressure display (inches of mercury or milimmetres of mercury).
- Time zone auto detection using location.
- Local time support.
- Time formats support (12 hour or 24 hour).
- Two languages support (English and Russian).

### Technical

- Display document ID in DB.
- Display the data delivering speed from the meteostation to the DB.
- Authorized access to the functionality (see 'Set up')

## Demo

https://vimeo.com/527007856

## Fast launch

### Installation

Copy repository to your server:

```bash
git clone https://github.com/boboshko/zarya-assistant.git
```

Go to the folder with repository:

```bash
cd zarya-assistant
```

Install necessary packages:

```bash
npm install
```

### Set up

Add necessary constants as environment variables. For instance:

```bash
export zaryaToken="2023094023:KLJF34djfkl3j498SDKDJSLK2asdk2945"
export zaryaWebhook="https://example.com/your/secret/paths/"
export zaryaWebhookPath="/your/secret/paths/"
export zaryaWebhookUse=true
export zaryaApiRequest="https://api.example.com/zarya/read/"
export zaryaApiAuthorization="Basic TG9naW46UGFzc3dvcmQ="
export zaryaAllowedUsers="[213949, 343909320]"
```

You also may set constants in the file `app/config.js`. For instance:

```JS
module.exports = {
  zaryaToken: process.env.zaryaToken || '2023094023:KLJF34djfkl3j498SDKDJSLK2asdk2945',
  zaryaWebhook: process.env.zaryaWebhook || 'https://example.com/your/secret/paths/',
  zaryaWebhookPath: process.env.zaryaWebhookPath || '/your/secret/paths/',
  zaryaWebhookUse: process.env.zaryaWebhookUse || true,
  zaryaApiRequest: process.env.zaryaApiRequest || 'https://api.example.com/zarya/read/',
  zaryaApiAuthorization: process.env.zaryaApiAuthorization || 'Basic TG9naW46UGFzc3dvcmQ=',
  zaryaAllowedUsers: process.env.zaryaAllowedUsers || '[213949, 343909320]',
};
```

This table defines the functions:

| Function                | Description                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `zaryaToken`            | Secret token of your Telegram bot gives [BotFather](https://t.me/BotFather).                                                             |
| `zaryaWebhook`          | Launch in production mode                                                                                                                |
| `zaryaWebhookPath`      | Launch in developer mode                                                                                                                 |
| `zaryaWebhookUse`       | Bot launch mode. `true` — Webhook (preffered). `fasle` — Long Poling (no setting needed `zaryaWebhook` и `zaryaWebhookPath`).            |
| `zaryaApiRequest`       | Secret URL to request Zarya API. See [documentation](https://github.com/boboshko/zarya-api).                                             |
| `zaryaApiAuthorization` | Authorisation login and password for Zarya API in base64 encoding.                                                                       |
| `zaryaAllowedUsers`     | ID array of Telegram users, who need access to Zarya Assistant. One may get their ID with the bot [Get My ID](https://t.me/getmyid_bot). |

### Launch

When in folder repository, run:

```bash
npm run start
```

## Commands

| Command                         | Description                                                     |
| ------------------------------- | ----------------------------------------------------------------|
| `pm2 start ecosystem.config.js` | Launch in production mode with [pm2](https://pm2.keymetrics.io) |     
| `npm run start`                 | Launch in production mode                                       |
| `npm run start:dev`             | Launch in production mode                                       |
| `npm run lint`                  | Check code style                                                |
| `npm run lint:fix`              | Check code style and fix automatically                          |

## Values

Bot supports the following values.

|              | Format                                                       | Data source                |
| ------------ | ------------------------------------------------------------ | -------------------------- |
| **Time**     | 12–hour                                                      | `Timestamp`                |
|              | 24-hour                                                      | `Timestamp`                |
| **Degrees**  | [Fahrenheit](https://en.wikipedia.org/wiki/Fahrenheit)       | Celsius (with the formula) |
|              | [Celsius](https://en.wikipedia.org/wiki/Celsius)             | Celsius                    |
| **Pressure** | [in Hg](https://en.wikipedia.org/wiki/Inch_of_mercury)       | mm Hg (with the formula)   |
|              | [mm Hg](https://en.wikipedia.org/wiki/Millimetre_of_mercury) | mm Hg                      |

## Zarya ecosystem

Zarya is the open source ecosystem to collect, store, aggregate and display environment data at home. Besides Zarya Assistant, project includes:

- **[Zarya Meteostation](https://github.com/boboshko/zarya-meteostation)** — mateostation based on [Iskra JS](http://wiki.amperka.ru/js:iskra_js) (Russian only). Represents the data originator. Collects and sends data to Zarya API.

- **[Zarya API](https://github.com/boboshko/zarya-api)** — the API, allows to collect and send aggregated data, received from Zarya Meteostation.

  Instead of Zarya Meteostation, any other meteostation mwith the same sensors may be used. For instance, based on [Arduino](https://www.arduino.cc). In that case, it's needed to create the firmware for your platform yourself.

## Acknowledgements

I want to express my thanks to the people who helped Zarya Assistant come into life:

- **[Daniil Yastremskiy](https://github.com/TheBeastOfCaerbannog)** — helped with the bot main code.
- **[Ksenia Mayorova](https://ksshchk.com)** — helped to localise the bot and translate documentation to English.

## Support

You may support Zarya in two ways.

First is donation – any amount will speed new releases.

- **Bitcoin**: bc1qp2ltjtr2rcd9u5n95umfu2ykltv2x0rta94ywd
- **Ethereum**: 0xde75e4596e71855C3552Ec2a307d137FC0A7A99d
- **Dogecoin**: DQZK88tpFQG8g7yGt9KMDcyKXtRSVbkGih

Second way is to participate in the development. Simply join the chat [Telegram-chat](https://t.me/codeque) and say you wanna help. The answer will come shortly.
