const path = require('path')

let alias = {
  'path-platform': require.resolve('./tmp/path_patched'),
  'uglify-es': require.resolve('./tmp/uglifyEsTools'),
  './register': require.resolve('./tmp/register_patched')
}

let externals = {}
let optional = 'electron hipchat-notifier loggly mailgun-js nodemailer should sinon-restore slack-node yamlparser' // these modules seem to be missing, yet they are not required. Let's assume they are optional and don't bundle them

optional.split(' ').map(thing => {
  externals[thing] = 'commonjs ' + thing
})

module.exports = {
  resolve: {
    alias
  },
  entry: './cli_patched.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'aegir'
  },
  externals
}
