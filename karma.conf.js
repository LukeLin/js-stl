// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

var PATHS = {
    gList: [
        'dist/Generalized List/GList.js'
    ],
    binaryTree: [
        'dist/Binary tree/*.js',
        'dist/Queue/*.js',
        'dist/Stack/*.js',
        'Binary tree/BinaryTree-spec.js'
    ]
};

function preprocessors(files){
    var obj = {};

    files.forEach(function(file){
        if(file.indexOf('dist/') === 0)
            obj[file] = ['commonjs', 'coverage']
        else
            obj[file] = ['commonjs'];
    });

    return obj;
}

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: './',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine', 'commonjs'],

        // list of files / patterns to load in the browser
        files: PATHS['binaryTree'],

        preprocessors: preprocessors(PATHS['binaryTree']),

        commonjsPreprocessor: {
            modulesRoot: 'node_modules'
        },

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8888,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
