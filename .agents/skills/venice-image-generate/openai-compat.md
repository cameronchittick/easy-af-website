# `/images/generations` — the OpenAI-compatible endpoint

Disclosed reference for [`venice-image-generate`](SKILL.md). Reach for this only
when the calling code is already on the OpenAI SDK and you want a drop-in swap.
Everything else belongs on `/image/generate`.

Field names match `openai.images.generate()`.

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.VENICE_API_KEY,
  baseURL: 'https://api.venice.ai/api/v1',
})

const res = await client.images.generate({
  model: 'z-image-turbo',
  prompt: 'A beautiful sunset over mountain ranges',
  size: '1024x1024',
  response_format: 'b64_json',
})

const b64 = res.data[0].b64_json
```

## Mapped fields

| Field | Values | Notes |
|---|---|---|
| `model` | string, default `"default"` | Unknown model IDs fall back to Venice's default. |
| `prompt` | string, ≤ 1500 chars | Required. |
| `size` | `auto`, `256x256`, `512x512`, `1024x1024`, `1536x1024`, `1024x1536`, `1792x1024`, `1024x1792` | — |
| `output_format` | `jpeg` / `png` / `webp` | Defaults to `png`. |
| `response_format` | `b64_json` / `url` | `url` returns a `data:` URL (not a hosted URL). |
| `moderation` | `auto` (safe mode on) / `low` (safe mode off) | — |
| `n` | `1` | Venice only supports a single image per call here. |
| `quality`, `style` (`vivid`/`natural`), `background`, `output_compression`, `user` | — | Accepted for OpenAI compat, not used by Venice. |

## Why this is the fallback

There is no `return_binary` here: this endpoint always hands back base64, either
raw or wrapped in a `data:` URL. Decode to a file the moment it lands and keep the
string out of context. That constraint alone is why `/image/generate` is the
default path.

It also has no `variants`, `seed`, `negative_prompt`, `cfg_scale`, `style_preset`
or `style_references`. Wanting any of those means switching back to
`/image/generate`.
