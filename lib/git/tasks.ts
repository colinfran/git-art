import { User } from "next-auth"
import { GitHubCommit, GitHubRepo } from "./types"

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })
  if (!response.ok) {
    throw new Error("Failed to fetch repositories")
  }
  const repos = await response.json()
  return repos
}

// Fetch commits for a specific repository
export async function fetchCommitsForRepo(
  username: string,
  repo: string,
  gitId: string,
  email: string,
): Promise<GitHubCommit[]> {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch commits for repository ${repo}`)
    }
    const commits = await response.json()
    return commits.filter(
      (commit: GitHubCommit) =>
        String(commit.author?.id) === String(gitId) || commit.commit.author.email === email,
    )
  } catch (error) {
    console.error(error)
    return []
  }
}

// Fetch commits for a user from all repositories
export async function fetchCommitsForUser(user: User): Promise<GitHubCommit[]> {
  const { username, email, gitId } = user
  const repos = await fetchUserRepos(username)
  const allCommits: GitHubCommit[] = []

  // Fetch commits for each repo (limiting to a certain number for performance)
  for await (const repo of repos) {
    const commits = await fetchCommitsForRepo(username, repo.name, gitId, email)
    allCommits.push(...commits)
  }
  return allCommits
}
