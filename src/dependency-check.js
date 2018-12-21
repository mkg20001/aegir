'use strict'

const execa = require('execa')

const runCommand = async (options) => {
  return execa('dependency-check', ['./package.json', ...options], {
    stdio: 'inherit'
  })
}

module.exports = async (_argv) => { /* eslint-disable no-console */
  console.log('Checking for missing dependencies of the main library:')
  await runCommand(['--missing', '--no-dev'])

  console.log('Checking for unused dependencies of the main library:')
  await runCommand(['--unused', '--no-dev'])

  console.log('Checking for missing dev-dependencies in tests:')
  await runCommand(['--missing', './test/**/*'])

  console.log('Checking for unused dev-dependencies in tests:')
  await runCommand(['--unused', './test/**/*'])
}
