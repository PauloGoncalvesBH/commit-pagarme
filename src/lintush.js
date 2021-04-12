const _ = require('lodash')
const minimist = require('minimist')
const askQuestionsAndValidate = require('./askQuestionsAndValidate')
const handleCommitMessage = require('./handleCommitMessage')
const logger = require('./logger')

const argv = minimist(process.argv.slice(1))

function getLintConfigValue(commitLintConfig, ruleName, defaultValue) {
  return _.get(commitLintConfig, ['rules', ruleName, '2'], defaultValue)
}

(async () => {
  if (argv.version) {
    const currentVersion = require('../package').version
    logger(currentVersion)
    return
  }

  const commitLintConfig = require('../commitlint.config.js')
  const lintushConfig = require('../lintush-config.js')

  const bodyMaxLineLength = getLintConfigValue(
      commitLintConfig,
      'body-max-line-length',
      72,
  )

  const commitMessage = await askQuestionsAndValidate(
      lintushConfig,
      commitLintConfig,
      bodyMaxLineLength,
  )

  handleCommitMessage(commitMessage)
})()
