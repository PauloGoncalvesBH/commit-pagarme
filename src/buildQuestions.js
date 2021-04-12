const {cyan, yellow, green, gray} = require('chalk')
const _ = require('lodash')

const OPTIONAL = yellow(' [press enter to skip]')
const AUTO_COMPLETE_CHIOCES_TITLE_PADDING = 5

const getSpaces = (spacing) => _.times(spacing, _.constant(' ')).join('')

const buildQuestionMessage = (question, mandatory, optionsToPrint) => {
  let suffix = '\n'
  if (_.isArray(optionsToPrint)) {
    suffix += gray(optionsToPrint.join(' | '))
    suffix += `\n`
  }
  if (!mandatory) {
    return cyan(question) + OPTIONAL + suffix
  }
  return green(question) + suffix
}

const buildAutoCompleteChoices = (name, choices, mandatory) => {
  if (_.isArray(choices)) {
    const result = []

    if (!mandatory) {
      result.push({
        title: `None ${gray(
            `if you choose this, the ${name} will be omitted`
        )}`,
        value: 'NONE',
      })
    }

    return result.concat(
        choices.map((choice) => ({title: choice, value: choice}))
    )
  }
  let minValueLength = 1
  _.forEach(choices, (value, title) => {
    minValueLength = Math.max(
        minValueLength,
        title.length + AUTO_COMPLETE_CHIOCES_TITLE_PADDING
    )
  })

  return _.map(choices, (title, value) => ({
    title: `${value}${getSpaces(minValueLength - value.length)}${gray(title)}`,
    value,
  }))
}

const buildAutoCompleteQuestion = (
    name,
    {question, choices, mandatory},
    initialValue
) => ({
  type: 'autocomplete',
  initial: initialValue,
  name,
  message: buildQuestionMessage(question, mandatory, choices),
  choices: buildAutoCompleteChoices(name, choices, mandatory),
})

const buildTextQuestion = (name, {question, mandatory}, initialValue) => ({
  type: 'text',
  initial: initialValue,
  name,
  message: buildQuestionMessage(question, mandatory),
})

function buildQuestions(config, prevValues = {}) {
  return [
    buildAutoCompleteQuestion('type', config.type, prevValues.type),
    buildAutoCompleteQuestion('scope', config.scope, prevValues.scope),
    buildTextQuestion('subject', config.subject, prevValues.subject),
    buildTextQuestion('body', config.body, prevValues.body),
    buildTextQuestion('breakingChange', config.breakingChange, prevValues.breakingChange),
    buildTextQuestion('issueNumber', config.issueNumber, prevValues.issueNumber),
    buildTextQuestion('coAuthoredBy', config.coAuthoredBy, prevValues.coAuthoredBy),
  ]
}

module.exports = buildQuestions
