export const CATEGORIES = {
  feat: '機能改善',
  fix: 'バグ修正',
  docs: 'その他',
  style: 'その他',
  refactor: 'その他',
  perf: 'その他',
  test: 'その他',
  build: 'その他',
  ci: 'その他',
  chore: 'その他',
  revert: 'その他'
} as const

export const OTHER_CATEGORY_LABEL = 'その他' as const
export const DEPENDENCIES_CATEGORY_LABEL = '依存関係の更新' as const

export type CategoryPrefix = keyof typeof CATEGORIES

export type CategoryLabel =
  | (typeof CATEGORIES)[CategoryPrefix]
  | typeof DEPENDENCIES_CATEGORY_LABEL
  | typeof OTHER_CATEGORY_LABEL

export const CATEGORY_ORDER: CategoryLabel[] = [
  '機能改善',
  'バグ修正',
  DEPENDENCIES_CATEGORY_LABEL,
  OTHER_CATEGORY_LABEL
] as const

export const CONVENTIONAL_COMMIT_MESSAGE_PATTERN = new RegExp(
  `^(${Object.keys(CATEGORIES).join('|')})(\\([a-zA-Z0-9_-]+\\))?(!)?: [^\\r\\n]+$`,
  'i'
)
