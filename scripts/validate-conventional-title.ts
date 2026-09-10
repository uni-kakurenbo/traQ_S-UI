/* eslint-disable no-console */
import { readFileSync } from 'node:fs'

import { CONVENTIONAL_COMMIT_MESSAGE_PATTERN } from './conventional-commits'

const args = process.argv.slice(2)

let title = ''
let allowFixup = false

if (args.length === 2) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  title = args[1]!
} else if (args.length === 1) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const commitMessagePath = args[0]!
  title = readFileSync(commitMessagePath, 'utf8').split(/\r?\n/)[0] ?? ''
  allowFixup = true
}

title = (title ?? '').trim()

const mergeCommitMessagePattern = /^Merge /
const fixupCommitMessagePattern = /^fixup! /

if (!title) {
  console.error('Cannot validate empty commit/PR title.')
  process.exit(1)
}

if (mergeCommitMessagePattern.test(title)) {
  process.exit(0)
}

if (allowFixup && fixupCommitMessagePattern.test(title)) {
  process.exit(0)
}

if (!CONVENTIONAL_COMMIT_MESSAGE_PATTERN.test(title)) {
  console.error(`Invalid title: "${title}"`)
  console.error(
    'Title must follow Conventional Commits format, for example: "feat(auth): add login flow". \n' +
      'See https://www.conventionalcommits.org/.'
  )

  process.exit(1)
}
