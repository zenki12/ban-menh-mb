# KB Worker - Ban Menh

Cloudflare Worker generate Numerology report from private KV data. It does not expose raw KB.

## Run Dev

```bash
cd workers/kb
npm install
npm run dev
```

`npm run dev` runs `wrangler dev --env dev --remote`, so Wrangler loads the env-scoped `BANMENH_KB_DEV` binding and connects to the remote Cloudflare KV namespace.

You need to be logged in with Wrangler using the Cloudflare account that owns the dev KV namespace.

Copy Firebase values from `workers/payment/.dev.vars` into `workers/kb/.dev.vars` before testing authenticated endpoints.

## KV Data

Root script uploads private local files into the dev KV namespace:

```bash
npm run kb:upload-kv
```

Keys:

- `kb-numerology`
- `kb-narrative`

## Troubleshooting

- If `c.env.BANMENH_KB_DEV` is undefined, check that dev is running with `--env dev`.
- If a KV key is not found, upload the private KB first with `npm run kb:upload-kv`.
