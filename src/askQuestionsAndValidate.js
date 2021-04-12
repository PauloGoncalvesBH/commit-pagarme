const prompts = require('prompts')
const lint = require('@commitlint/lint').default
const { format } = require('@commitlint/format')
const load = require('@commitlint/load').default

const buildQuestions = require('./buildQuestions')
const parsers = require('./parsers')
const logger = require('./logger')

const {parseScope, parseBody, parseIssueNumber, parseCoAuthoredBy, parseBreakingChange} = parsers;

module.exports = async function askQuestionsAndValidate(
    lintushConfig,
    commitLintConfig,
    bodyMaxLineLength
) {
  let valid = false;
  let type = '';
  let scope = '';
  let subject = '';
  let body = '';
  let breakingChange = '';
  let issueNumber = '';
  let coAuthoredBy = '';
  let commitMessage = '';

  while (!valid) {
    const previousValues = {
      type,
      scope,
      subject,
      body,
      breakingChange,
      issueNumber,
      coAuthoredBy,
    };
    const results = await prompts(
        buildQuestions(lintushConfig, previousValues)
    );

    // apply current values to previous values:
    ({type, scope, subject, body, breakingChange, issueNumber, coAuthoredBy} = results);

    const commitParts = [
      `${type}${parseScope(scope)}: ${subject}\n`,
      parseBody(body, bodyMaxLineLength),
      parseBreakingChange(breakingChange),
      parseIssueNumber(issueNumber),
      parseCoAuthoredBy(coAuthoredBy),
    ];

    commitMessage = commitParts.join('\n').trim();

    await load(commitLintConfig)
        .then((opts) => {
          return lint(
            commitMessage,
            opts.rules,
            opts.parserPreset ? {parserOpts: opts.parserPreset.parserOpts} : {}
          )
        })
        .then((report) => {
          if (!valid) {
            logger.error(
                format({
                  results: [report],
                })
            );
          }
          valid = report.valid;
        });
  }
  return commitMessage;
};
