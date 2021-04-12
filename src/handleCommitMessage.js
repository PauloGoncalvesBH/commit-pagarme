const {green} = require('chalk')
const fs = require('fs')
const path = require('path')

module.exports = function handleCommitMessage(commitMessage) {
  const CWD = process.cwd()
  try {
    fs.writeFileSync(path.join(CWD, '.git', 'COMMIT_EDITMSG'), commitMessage)
    console.log(green(`Run "git commit -F .git/COMMIT_EDITMSG -e"`))
  } catch (e) {
    // Project is not using git
    console.log(commitMessage)
  }
}
