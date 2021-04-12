const { red, green } = require('chalk')

const logger = (msg = '') => console.log(msg)

logger.error = (msg) => console.error(red(msg))

logger.success = (msg) => console.error(green(msg))

logger.logIndent = (msg) => console.log(`    ${msg}`)

logger.configFileWritten = (configPath) => {
  logger()
  logger.logIndent('Successfully written config file.')
  logger.logIndent(`Edit file ${green(configPath)} with your configuration`)
}

module.exports = logger
