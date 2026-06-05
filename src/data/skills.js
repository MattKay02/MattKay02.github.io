// The Skills section reads its content live from my skills repo at runtime:
//   https://github.com/MattKay02/skills  →  skills.json (showcase manifest)
//
// To add a skill to the portfolio, I only touch the skills repo: author the
// SKILL.md and add an entry to skills.json there. This page picks it up
// automatically — no change needed here.
//
// The array below is just a baked fallback, rendered if the live manifest
// can't be fetched (offline, GitHub down, etc.). Keep it roughly in sync.
export const REPO = 'https://github.com/MattKay02/skills'
export const MANIFEST = 'https://raw.githubusercontent.com/MattKay02/skills/main/skills.json'

const fallbackSkills = [
  {
    name: 'page-audit',
    label: 'UI Review',
    description:
      'Audits a UI surface across seven axes and returns a prioritized P1/P2/P3 punch list — verifying every finding against the actual code (file:line citations) before reporting it. A review, not a redesign.',
    why: 'I kept doing the same manual UI pass by eye — this makes it systematic and evidence-backed.',
    stack: ['Claude Code', 'Playwright'],
  },
  {
    name: 'emulator-verify',
    label: 'Mobile QA',
    description:
      "Lets an agent confirm a Flutter app's UI on the Android emulator by capturing screenshots over adb and reading them back with vision — so it checks its own work between turns instead of asking me to look.",
    why: 'Closing the loop on mobile UI changes without a human in the middle every time.',
    stack: ['Claude Code', 'adb', 'Flutter'],
  },
]

export default fallbackSkills
