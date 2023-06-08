
# GPTPort

Safely manage and share your OpenAI / Azure API keys.


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



## Features

- **OpenAI compatiable API** - serve as a OpenAI proxy, thus protect your API keys from being leaked when using third-party Apps.
- **Running fully on Edge** - Supa FAST!
- **Support Azure API** - support import Azure API as LLM service provider.
- **Auto expire** - generate API keys that automatic expire after specific time.
- **Multi user support** - you can control who can sign up your service, both emails control and domain control are supported.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Auth

GPTPort uses `nextauth` as authentication solution.

- `NEXTAUTH_SECRET` - a random secret for nextauth, you can generate one by running `openssl rand -base64 48`.
- `NEXTAUTH_URL` - you can omit this if deployed on Vercel.
- `ADMIN_EMAIL` - admin email.
- `ALLOWLIST` - only emails among this list can login, use `*` for public user, or domain name to allow all emails under specific domains.

**Auth providers**

You need at least one auth provider to get start, visit https://next-auth.js.org/providers/ for more information.

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Storage
GPTPort uses `@upstash/redis` for storage, because it can run on the edge runtime and also offers a pretty generous free quota which should be more that enough for personal uses.

Visit https://upstash.com/ to get one, or deploy one with https://fly.io/docs/reference/redis/

- `UPSTASH_REDIS_REST_TOKEN`
- `UPSTASH_REDIS_REST_URL`


## Authors

- [@hopsken](https://www.github.com/hopsken)

