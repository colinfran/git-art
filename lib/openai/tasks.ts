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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPrompt = (commits: any): string => {
  const numberOfCommits = commits.length
  // Get the date range
  const firstCommitDate = new Date(commits[commits.length - 1].author.date)
  const lastCommitDate = new Date(commits[0].author.date)
  // Build an abstract, art-inspired description
  return `An abstract digital art piece inspired by ${numberOfCommits} GitHub commits, 
  contributed by ${commits[0].commit.author.name} from ${firstCommitDate.toDateString()} to ${lastCommitDate.toDateString()}.
  Each commit is visualized as a glowing node on a vast timeline, connected by flowing lines of code, 
  representing the evolution of a software project. 
  Different colors represent different authors: vibrant hues for new features, cooler tones for bug fixes and updates.
  The scene blends futuristic digital aesthetics with geometric shapes and fluid movement, symbolizing the collaboration, 
  creativity, and structure of coding. The art piece captures the progress and teamwork behind the development process, 
  turning the code into an evolving visual masterpiece.`
}
