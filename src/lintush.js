const findUp = require('find-up')
const _ = require('lodash')
const minimist = require('minimist')
const askQuestionsAndValidate = require('./askQuestionsAndValidate')
const handleCommitMessage = require('./handleCommitMessage')
const logger = require('./logger')

const CWD = process.cwd()
const argv = minimist(process.argv.slice(2))

function getLintConfigValue(commitLintConfig, ruleName, defaultValue) {
  return _.get(commitLintConfig, ['rules', ruleName, '2'], defaultValue)
}

(async () => {
  if (argv.version) {
    const currentVersion = require('../package').version
    logger(currentVersion)
    return
  }

  const commitLintConfigPath = await findUp.sync('./commitlint.config.js')
  const lintushConfigPath =
    (await findUp.sync('lintush-config.js')) ||
    (await findUp.sync('lintush-config.json'))

  if (!commitLintConfigPath) {
    logger.error(`Could not find config file ${CWD}/commitlint.config.js`)
    process.exit(1)
  }
  if (!lintushConfigPath) {
    logger.error(`Could not find config file ${CWD}/lintush-config.js|json`)
    process.exit(1)
  }
  const commitLintConfig = require(commitLintConfigPath)
  const lintushConfig = require(lintushConfigPath)

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
