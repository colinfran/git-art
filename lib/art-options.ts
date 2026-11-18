import type { ArtOptions } from "@/components/art-options-form"

/**
 * The values the art options form offers. The prompt sent to OpenAI is built from these,
 * so the API only accepts these exact values: free text would let anyone put arbitrary
 * content into prompts sent with our OpenAI key. Keep in sync with
 * components/art-options-form.tsx.
 */
const ART_OPTION_VALUES: Record<Exclude<keyof ArtOptions, "complexity">, string[]> = {
  style: ["abstract", "futuristic", "minimalist", "cyberpunk", "retro", "organic"],
  colorScheme: ["vibrant", "pastel", "monochrome", "neon", "earthy", "cool", "warm"],
  theme: ["technology", "nature", "space", "urban", "fantasy"],
  mood: ["energetic", "calm", "mysterious", "playful", "serious"],
  timeRepresentation: ["linear", "circular", "spiral", "abstract"],
  textureStyle: ["smooth", "rough", "pixelated"],
  animationStyle: ["static", "flowing", "pulsating"],
  backgroundType: ["solid", "gradient", "pattern", "textured"],
  perspective: ["2D", "isometric", "3D"],
}

/**
 * Validates art options from a request body.
 * @param {unknown} input - The `options` value from the request.
 * @returns {ArtOptions | null} The options if every field is an allowed value, otherwise null.
 */
export const parseArtOptions = (input: unknown): ArtOptions | null => {
  if (!input || typeof input !== "object") return null
  const raw = input as Record<string, unknown>

  const { complexity } = raw
  if (typeof complexity !== "number" || !(complexity >= 0 && complexity <= 100)) return null

  const options: Record<string, string | number> = { complexity }
  for (const [key, allowed] of Object.entries(ART_OPTION_VALUES)) {
    const value = raw[key]
    if (typeof value !== "string" || !allowed.includes(value)) return null
    options[key] = value
  }
  return options as unknown as ArtOptions
}
