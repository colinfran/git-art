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

import { ArtOptions } from "@/components/art-options-form"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPrompt = (commits: any, options: ArtOptions): string => {
  const numberOfCommits = commits.length
  const firstCommitDate = new Date(commits[commits.length - 1].author.date)
  const lastCommitDate = new Date(commits[0].author.date)

  const styleDescription = `A ${options.style} digital art piece`
  const colorDescription = `with a ${options.colorScheme} color palette`
  const complexityDescription =
    options.complexity < 33
      ? "simple and elegant"
      : options.complexity < 66
        ? "moderately detailed"
        : "intricately complex"
  const themeDescription = `inspired by ${options.theme}`
  const moodDescription = `conveying a ${options.mood} mood`
  const timeRepresentation = `represented as a ${options.timeRepresentation} structure`
  const customElements =
    options.customElements.length > 0
      ? `incorporating elements of ${options.customElements.join(", ")}`
      : ""
  const textureDescription = `featuring a ${options.textureStyle} texture`
  const animationDescription =
    options.animationStyle !== "static" ? `with a ${options.animationStyle} animation style` : ""
  const backgroundDescription = `set against a ${options.backgroundType} background`
  const perspectiveDescription = `rendered in ${options.perspective} perspective`
  const authorInfo = `contributed by ${commits[0].commit.author.name} and team`
  return `${styleDescription} ${colorDescription}, ${themeDescription} and ${moodDescription}, 
  visualizing ${numberOfCommits} GitHub commits ${authorInfo} from ${firstCommitDate.toDateString()} to ${lastCommitDate.toDateString()}.
  The piece is ${complexityDescription}, with each commit ${timeRepresentation}, 
  ${customElements} .
  The artwork is ${textureDescription} ${animationDescription}, ${backgroundDescription}, and ${perspectiveDescription}.
  This visual representation captures the progress and teamwork behind the development process, 
  turning the code into an evolving digital masterpiece.`
}
