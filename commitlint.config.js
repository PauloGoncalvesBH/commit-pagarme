
// https://commitlint.js.org/#/reference-rules
// configuração genérica desse arquivo: https://commitlint.js.org/#/reference-configuration?id=javascript#/reference-configuration?id=javascript#/reference-configuration?id=javascript
module.exports = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   * https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js
   */
  extends: ['@commitlint/config-conventional'],
  parserPreset: '@commitlint/parse',
  formatter: '@commitlint/format',
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    "body-max-line-length": [2, "always", 72],
    "scope-enum": [
      0,
      "always",
      [
        "gateway",
        "notifier",
        "database",
        "api",
        "eldorado"
      ]
    ],
    "type-enum": [
      2,
      "always",
      [
        "chore",
        "docs",
        "feat",
        "fix",
        "refactor",
        "revert",
        "style",
        "test",
        "ci",
        "perf"]
    ]
  },
  /*
   * Functions that return true if commitlint should ignore the given message.
   */
  ignores: [(commit) => commit === ''],
  /*
   * Whether commitlint uses the default ignore rules.
   */
  defaultIgnores: true,
  /*
   * Custom URL to show upon failure
   */
  helpUrl: 'http://serverest.dev/',
}
