const _ = require('lodash')
const ANY_SEPARATOR = new RegExp(/\;|\,|\ /)

const parseScope = (scope) => {
  const isScopeEmpty = !scope || scope === 'NONE'
  return isScopeEmpty ? '' : `(${scope})`
}

const parseBody = (body, bodyMaxLineLength) => {
  if (!body) {
    return ''
  }
  const words = body.trim().split(' ')
  let result = ''
  let lineCharCount = 0
  _.forEach(words, (word) => {
    if (lineCharCount === 0) {
      lineCharCount += word.length
      result += word
    } else if (lineCharCount + word.length + 1 < bodyMaxLineLength) {
      lineCharCount += word.length + 1
      result += ` ${word}`
    } else {
      result += `\n${word}`
      lineCharCount = word.length
    }
  })
  return result.trim()
}

const parseSingleBugNumber = (bugNumber) => {
  if (bugNumber.indexOf('b/') !== -1) {
    return `Fixes: ${bugNumber}`
  }
  return `Fixes: b/${bugNumber}`
}

const parseBugNumber = (bugNumberString) => {
  if (!bugNumberString) {
    return ''
  }

  return `\n${bugNumberString
      .split(ANY_SEPARATOR)
      .filter((bug) => !!bug) // ignore spaces
      .map((bug) => parseSingleBugNumber(bug))
      .join('\n')}`
}

const parseScreenshot = (screenshot) => {
  if (screenshot) {
    return `Screenshot: ${screenshot}`
  }
  return ''
}

module.exports = {
  parseScope,
  parseBody,
  parseBugNumber,
  parseScreenshot,
}
