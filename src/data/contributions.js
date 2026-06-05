// Open-source contributions = my merged pull requests to repositories I do NOT
// own. These are fetched LIVE from the GitHub Search API at runtime (see
// OpenSource.jsx), so this section stays current without editing this file every
// time a PR is merged.
//
// What you CAN edit here:
//   • overrides — optionally annotate a specific PR (by its URL) with a curated
//     type/description/project, replacing the bare PR title. Anything not listed
//     falls back to the PR's own title. This is the "curate when you want to,
//     ignore otherwise" layer.
//   • EXCLUDE_OWNERS — accounts whose repos count as "mine" and are filtered out.

export const GITHUB_USER = 'MattKay02'

// Repos under these owners are mine, not contributions to others' projects.
// Compared case-insensitively.
export const EXCLUDE_OWNERS = ['mattkay02', 'mgkcodes']

// Most recent N contributions to show.
export const MAX_ITEMS = 12

// Live query: my merged PRs across all of GitHub, newest first.
export const SEARCH_URL =
  'https://api.github.com/search/issues?q=' +
  encodeURIComponent(`author:${GITHUB_USER} type:pr is:merged`) +
  '&sort=created&order=desc&per_page=100'

// Optional curation, keyed by PR URL. Each value may set { type, description,
// project }. Example:
//
// export const overrides = {
//   'https://github.com/owner/repo/pull/123': {
//     type: 'Bug fix',
//     description: 'One line on what changed and why it mattered.',
//   },
// }
export const overrides = {}

// Rendered only if the live fetch fails (offline / rate-limited / API down).
// Each entry: { type, project, description, repo, url }.
const fallbackContributions = []

export default fallbackContributions
