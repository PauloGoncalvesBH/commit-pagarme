const commitScopes = require("./commitlint.config").rules["scope-enum"][2]

module.exports = {
  type: {
    choices: {
      feat: "A new feature",
      fix: "A bug fix",
      test: "Adding or refactoring tests; no production code change",
      docs: "Documentation only changes",
      ci: "CI related changes",
      refactor: "A code change that neither fixes a bug nor adds a feature",
      revert: "Reverts a previous commit",
      style: "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
      perf: "A code change that improves performance",
      chore: "Other changes that don't modify src or test files"
    },
    mandatory: true,
    question: "Select the type of change that you're committing:"
  },
  scope: {
    choices: commitScopes,
    mandatory: false,
    question: "What is the scope of this change?"
  },
  subject: {
    mandatory: true,
    question: "Commit title - Write a short, imperative mood description of the change"
  },
  body: {
    mandatory: false,
    question: "Explain the problem that this commit is solving. Focus on why you are making this change as opposed to how (the code explains that). Are there any side effects or other unintuitive consequences of this change?"
  },
  breakingChange: {
    mandatory: false,
    question: "List any breaking changes"
  },
  issueNumber: {
    mandatory: false,
    question: "Add issue reference. Use ; as separator (e.g. '#123', 'https://mundipagg.atlassian.net/browse/QA-555')"
  },
  coAuthoredBy: {
    mandatory: false,
    question: "Did pair programming? Add co-author. Use ; as separator (e.g. 'Paulo Gonçalves <paulo@example.me>;Marina Viana <marina@example.me>')"
  }
}
