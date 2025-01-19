import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { commits } from "./table"
import { GitHubCommit } from "@/lib/git/types"

export const insertAllUserCommits = async (
  username: string,
  commitArr: GitHubCommit[],
): Promise<void> => {
  try {
    await db.delete(commits).where(eq(commits.authorUsername, username))
    const commitInsertArray = commitArr.map((commit: GitHubCommit) => {
      const authorDate = commit.commit.author.date
      const createdAt = authorDate ? new Date(authorDate) : null
      return {
        sha: commit.sha,
        nodeId: commit.node_id,
        message: commit.commit.message,
        authorUsername: username,
        commentCount: commit.commit.comment_count,
        createdAt:
          createdAt instanceof Date && !isNaN(createdAt.getTime()) ? createdAt.toISOString() : null, // Ensure valid date or set to null
      }
    })
    if (commitInsertArray.length > 0) {
      // await db.insert(commits).values(commitInsertArray)
    }
  } catch (error) {
    console.error("Error inserting commits", error)
  }
}
