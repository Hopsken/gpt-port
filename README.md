
# GPTPort

Safely manage and share your OpenAI API keys.


## Authors

- [@hopsken](https://www.github.com/hopsken)


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `NEXTAUTH_SECRET` - a random secret for nextauth, you can generate one by running `openssl rand -base64 48`.
- `ADMIN_EMAIL` - admin email.
- `NEXTAUTH_URL` - you can omit this if deployed on Vercel.

GPTPort uses `@upstash/redis` for storage, because it can run on the edge runtime and also offers a pretty generous free quota which should be more that enough for personal uses.

Visit https://upstash.com/ to get one, or deploy one with https://fly.io/docs/reference/redis/

- `UPSTASH_REDIS_REST_TOKEN`
- `UPSTASH_REDIS_REST_URL`

