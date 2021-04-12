const _ = require('lodash')
const SEPARATOR = new RegExp(/\;/)

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

const parseIssueNumber = (issueNumberString) => {
  if (!issueNumberString) {
    return ''
  }

  return `\n${issueNumberString
      .split(SEPARATOR)
      .filter((issue) => !!issue) // ignore spaces
      .map((issue) => `Closes: ${issue}`)
      .join('\n')}`
}

const parseBreakingChange = (breakingChangeString) => {
  if (!breakingChangeString) {
    return ''
  }

  return `\nBREAKING CHANGE: ${breakingChangeString}`
}

const parseCoAuthoredBy = (coAuthoredByString) => {
  if (!coAuthoredByString) {
    return ''
  }
  console.log(coAuthoredByString);

  return `\n${coAuthoredByString
      .split(SEPARATOR)
      .filter((coAuthoredBy) => !!coAuthoredBy) // ignore spaces
      .map((coAuthoredBy) => `Co-authored-by: ${coAuthoredBy}`)
      .join('\n')}`
}

module.exports = {
  parseScope,
  parseBody,
  parseIssueNumber,
  parseBreakingChange,
  parseCoAuthoredBy,
}
