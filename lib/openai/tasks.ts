import { openai } from "./init"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createImage = async (prompt: string): Promise<any> => {
  try {
    const image = await openai.images.generate({
      prompt,
      size: "1024x1024",
    })
    return image
  } catch (error) {
    console.error(error)
  }
}
