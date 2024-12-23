const { DEFAULT_THEME } = require('@cucumber/pretty-formatter')

module.exports = {
  // Default configuration for the Cucumber framework
  // Ex. your feature file, runner and some test configurations
  default: {
    paths: ['features/**/*.feature'],
    formatOptions: {
      snippetInterface: 'async-await',
      theme: {
        ...DEFAULT_THEME
        // 'step text': 'cyan'
      },
      colorsEnabled: true
    },
    format: [
      'html:reports/cucumber-report.html',
      'summary',
      // "progress-bar",
      // '@cucumber/pretty-formatter'
    ],
    dryRun: false,
    // Required JS files before runnin steps
    // Includes step definitions and any setup files needed for your test
    require: ['step-definitions/**/*.js', 'setup/*.js']
  }
}