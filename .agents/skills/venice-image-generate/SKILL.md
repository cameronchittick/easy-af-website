---
name: venice-image-generate
description: Generate an image from a text prompt with Venice, written to disk as binary rather than base64. Use when a page needs a hero, texture, background or illustration, when a design skill calls for a generated image, or when new images must match the look of existing ones through style references.
---

# Venice Image Generation

**`POST /api/v1/image/generate`** is the endpoint: Venice-native, full control
(negative prompts, CFG, seed, style references, up to 4 variants).

- **`GET /api/v1/image/styles`** — list of style preset names for `style_preset`.
- When the calling code is already on the OpenAI SDK and wants a drop-in swap,
  the compatible `POST /api/v1/images/generations` is in
  [`openai-compat.md`](openai-compat.md). It is base64-only and drops variants,
  seed, cfg_scale and style references, so it stays the fallback.

For editing / upscaling / multi-image / background removal, see [`venice-image-edit`](../venice-image-edit/SKILL.md).

## Send `return_binary: true` and write to disk

This endpoint defaults to JSON with the image as a base64 string. That default is
wrong for every use here. A 24 KB image is ~33 000 base64 characters; a 1.5 MB PNG
hero is ~2 million. Read through an agent's context that is the whole budget spent
on one asset, and the file still is not on disk where the site needs it.

So the default call is `return_binary: true` piped straight to a path:

```bash
curl -sf https://api.venice.ai/api/v1/image/generate \
  -H "Authorization: Bearer $VENICE_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"model":"z-image-turbo","prompt":"...","width":1024,"height":1024,"return_binary":true,"format":"webp"}' \
  -o public/hero.webp
```

`-f` matters: without it curl exits 0 on a 400 and writes the JSON error body into
`hero.webp`. Confirm with `file public/hero.webp` — it should say `Web/P image`, not
`JSON data`. To *see* the result, read the image file; that costs a fraction of the
base64.

Reach for the JSON response only when you need `variants > 1`, which binary mode
cannot return. Then decode each entry to a file immediately and keep the blob out
of context.

The edit / upscale / background-remove endpoints have no such flag because they
already return binary unconditionally — see [`venice-image-edit`](../venice-image-edit/SKILL.md).

## `/image/generate` — Venice-native

### Request

```bash
curl -sf https://api.venice.ai/api/v1/image/generate \
  -H "Authorization: Bearer $VENICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "z-image-turbo",
    "prompt": "A beautiful sunset over a mountain range",
    "width": 1024,
    "height": 1024,
    "cfg_scale": 7.5,
    "steps": 8,
    "seed": 123456789,
    "format": "webp",
    "style_preset": "3D Model",
    "safe_mode": true,
    "return_binary": true
  }' \
  -o public/sunset.webp
```

### Fields

| Field | Type | Default | Notes |
|---|---|---|---|
| `model` | string | — | **Required.** Image model ID. `GET /models?type=image`. |
| `prompt` | string | — | **Required.** Max `promptCharacterLimit` from the model's `model_spec.constraints` (typically 1500–7500). |
| `negative_prompt` | string | — | Describe what *not* to show. Same character cap as prompt. |
| `width`, `height` | int | 1024, 1024 | ≤ 1280 each. Must be divisible by `constraints.widthHeightDivisor` on the model's `model_spec`. |
| `aspect_ratio` | string | — | `"1:1"`, `"16:9"`, `"9:16"`, … — used by models like Nano Banana instead of width/height. |
| `resolution` | string | — | `"1K"`, `"2K"`, `"4K"` — used by resolution-driven models. |
| `cfg_scale` | number | model default | 0 < x ≤ 20. Higher = more prompt adherence. |
| `steps` | int | 8 | Inference steps. Some models ignore it (e.g. Turbo). |
| `seed` | int | 0 | `-999999999..999999999`. Use `0`/omit for random. |
| `variants` | int | 1 | 1–4. Only if `return_binary: false`. |
| `lora_strength` | int | — | 0–100 when model uses Loras. |
| `style_preset` | string | — | Value from `GET /image/styles`. |
| `style_references` | array | — | Reference images that guide the aesthetic of the output. Each item: `{ "image": <base64 or http(s) URL, <8MB>, "strength": 0.1–1 (default 0.5) }`. Only on models with `supportsStyleReferences: true`; per-model cap in `constraints.maxStyleReferences`. `strength` is ignored when `constraints.supportsStyleReferenceStrength` is `false`. |
| `quality` | `"low"`/`"medium"`/`"high"` | — | Output quality on models that support it (e.g. GPT Image 2). Higher values can raise the request charge. |
| `enhance_prompt` | bool | `false` | Rewrite the prompt to add clarifying visual detail before generating. Costs extra credits when a rewrite happens and adds up to ~30 s. The final prompt returns URL-encoded in the `x-venice-enhanced-prompt` response header. |
| `disable_prompt_optimization_thinking` | bool | model default | Skip the model's prompt-optimization thinking step for speed. Only honored by models with `supportsOptimizePromptThinking`. |
| `format` | `"webp"`/`"png"`/`"jpeg"` | `webp` | Response image format. |
| `return_binary` | bool | `false` | `true` → binary `image/*` response; `false` → JSON with base64. **Send `true`.** The default exists for browser clients, not for anything with a context window. |
| `embed_exif_metadata` | bool | `false` | Embed prompt info in EXIF. |
| `hide_watermark` | bool | `false` | Venice may still watermark certain content. |
| `safe_mode` | bool | `true` | Blurs adult content. |
| `enable_web_search` | bool | `false` | Only some models. Charges extra. |
| `inpaint` | — | — | **Deprecated** since May 19 2025. A new inpaint API is forthcoming. |

### Response

With `return_binary: true` (the default you should send), the response is raw
`image/webp` (or `png`/`jpeg`) with a matching `Content-Type` — pipe it to a file.

With `return_binary: false`, JSON, and `images[]` holds base64 strings:

```json
{
  "id": "...",
  "images": ["<base64>", "<base64>"],
  "timing": {...},
  "request": {...}
}
```

## `/image/styles` — list presets

```bash
curl https://api.venice.ai/api/v1/image/styles \
  -H "Authorization: Bearer $VENICE_API_KEY"
```

Returns a list of `styles[]`, each with a `name` you can pass to `style_preset`. Cache this — it's small and stable.

## Choosing a model

```bash
curl "https://api.venice.ai/api/v1/models?type=image" \
  -H "Authorization: Bearer $VENICE_API_KEY"
```

Inspect per-model `model_spec`:

- `constraints.widthHeightDivisor` — `width` and `height` must both be divisible by this.
- `constraints.aspectRatios[]` + `defaultAspectRatio` — if present, the model supports aspect-ratio-driven sizing.
- `constraints.resolutions[]` + `defaultResolution` — if present, the model supports `resolution` (`1K`/`2K`/`4K`).
- `constraints.steps.{default,max}` — step bounds (some models ignore `steps` entirely).
- `constraints.promptCharacterLimit` — max prompt length (also applies to `negative_prompt`).
- `supportsStyleReferences` — whether the model accepts `style_references` on `/image/generate`.
- `constraints.maxStyleReferences` — max number of style reference images (only present on supporting models).
- `constraints.supportsStyleReferenceStrength` — whether per-reference `strength` is honored (only present on supporting models).
- `pricing.generation.usd` — flat USD per image, or `pricing.resolutions[].usd` for resolution-tiered models.

Pick a model that matches the **feature + size combo** you plan to use.

## Common patterns

### Fixed-seed A/B test

```json
{"model": "z-image-turbo", "prompt": "...", "seed": 42, "variants": 4}
```

### Aspect-ratio-driven model (Nano Banana family)

```json
{"model": "nano-banana-2", "prompt": "...", "aspect_ratio": "16:9", "resolution": "2K"}
```

(Other nano-banana variants: `nano-banana-pro`. Always verify the current ID via `GET /models?type=image`.)

### Style preset + negative

```json
{
  "model": "z-image-turbo",
  "prompt": "a red sports car in a parking lot",
  "negative_prompt": "blurry, people, clouds",
  "style_preset": "3D Model"
}
```

### Style references (match the look of existing images)

```json
{
  "model": "krea-v2-large",
  "prompt": "a lighthouse on a rocky coast at dusk",
  "style_references": [
    { "image": "https://example.com/ref-1.png", "strength": 0.8 },
    { "image": "data:image/png;base64,....", "strength": 0.4 }
  ]
}
```

Describe the **subject** in the prompt; the references carry the **style**. As of mid-2026 the supporting models are `krea-v2-large` / `krea-v2-medium` (up to 3 refs, strength honored) and `luma-uni-1` / `luma-uni-1-max` (up to 3 refs, strength ignored) — all anonymized routing. Always re-verify via `GET /models?type=image` (`supportsStyleReferences`).

### Stream binary to disk (Node)

```ts
const res = await fetch('https://api.venice.ai/api/v1/image/generate', {
  method: 'POST',
  headers: { Authorization: `Bearer ${process.env.VENICE_API_KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: 'z-image-turbo', prompt: '...', return_binary: true }),
})
if (!res.ok) throw new Error(await res.text())
const buf = Buffer.from(await res.arrayBuffer())
await fs.writeFile('out.webp', buf)
```

## Errors

| Code | Meaning |
|---|---|
| `400` | Bad params (e.g. dimensions not divisible by `widthHeightDivisor`, prompt too long, `variants>1` with `return_binary`). |
| `401` | Auth or Pro-only model. |
| `402` | Insufficient balance. Bearer: plain `{ "error": "Insufficient balance" }`; x402: `PAYMENT_REQUIRED` body + `PAYMENT-REQUIRED` header. |
| `415` | Wrong `Content-Type` (send `application/json` for this endpoint). |
| `429` | Rate limited. |
| `500` / `503` | Inference or capacity issue — retry with jitter. |

(Content-policy violations on `/image/generate` come back as `400` with an error string, not `422` — the `422` shape is specific to audio generation paths.)

## Gotchas

- Each model picks one sizing idiom: either `width`/`height`, `aspect_ratio` + `resolution`, or (OpenAI-compat) `size`. Match the model's `constraints`.
- `variants > 1` requires `return_binary: false` (JSON with base64 array).
- `steps` is ignored by fast/turbo models; they hardcode step count internally.
- `hide_watermark: true` is advisory — Venice may still watermark content flagged by safety classifiers.
- Old `inpaint` field is deprecated; don't use it.
- `style_references` is silently unsupported outside the models flagged `supportsStyleReferences: true`; check the flag rather than trying and inspecting output. Each reference image must be < 8MB.
