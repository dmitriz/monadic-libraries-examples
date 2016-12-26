// karma.conf.js

module.exports = function (config) {
  config.set({

    // Jasmine not required, use whichever framework you want
    // other frameworks available: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // files / glob patterns to load
    // Tip. Keep your tests next to testees for better cohesion
    files: [

      // load files not exported as modules
      // 'demo/add.js',
      // // load all test files inside `demo`
      // 'demo/**/*_test.js'
      'examples/**/*_test.js'
    ],

    // Use Webpack to pre-process files requiring external modules:
    // https://github.com/webpack/karma-webpack
    // https://karma-runner.github.io/0.13/config/preprocessors.html
    preprocessors: {

      // list files as entry points for webpack
      'demo/**/*-module_test.js': ['webpack'],
      '**/*_test.js': ['webpack']
    },

    // Browsers available include:
    // - Chrome and ChromeCanary (install `karma-chrome-launcher`)
    // - Firefox (install `karma-firefox-launcher` first)
    // - Opera  (install `karma-opera-launcher` first)
    // - Safari (install `karma-safari-launcher` first)
    // - IE (install `karma-ie-launcher` first)
    // - PhantomJS  (install `karma-phantomjs-launcher`)
    browsers: ['Chrome']
  })
}
