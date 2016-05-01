
let webpack = require('webpack');
let fs = require('fs');
let ProgressBarPlugin = require('progress-bar-webpack-plugin');

let DEBUG = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development' || 'production';

let plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ProgressBarPlugin({
        format: '  build [:bar] :percent (:elapsed seconds)',
        clear: false
    })
];
if (DEBUG) {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
} else {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        function () {
            this.plugin("done", function (stats) {
                let jsonStats = stats.toJson({
                    chunkModules: true
                });
                fs.writeFileSync(
                    __dirname + "/webpack-assets.json",
                    JSON.stringify(jsonStats.assetsByChunkName)
                );
            });
        },
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.NoErrorsPlugin()
    );
}

let appEntry = [
    //'babel-polyfill',
    './index.js'
];
if(DEBUG) {
    appEntry.push(
        //'webpack-dev-server/client?http://0.0.0.0:8000',
        'webpack/hot/dev-server'
    );
}

module.exports = {
    target: 'web',
    entry: {
        'data-structure': appEntry
    },
    output: {
        path: './dist/',
        filename: DEBUG ? "./[name]-debug.js" : "./[name]-min.js",
        chunkFilename: DEBUG ? "./[name]-debug.js" : "./[name]-min.js",
        publicPath: '',
        pathinfo: false
    },

    cache: DEBUG,
    debug: DEBUG,

    devtool: DEBUG && "#inline-source-map",

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-runtime'],
                    cacheDirectory: true
                }
            },

            {
                test: /\.json$/,
                exclude: /node_modules/,
                loaders: ['json-loader']
            }
        ],
        noParse: []
    },

    plugins: plugins,

    externals: {
    },

    resolve: {
        modulesDirectories: [
            "node_modules",
            "web_modules"
        ],

        extensions: ["", ".js", ".jsx", ".es6", '.json'],

        alias: {
        }
    },

    devServer: DEBUG && {
        contentBase: './dist/',
        hot: true,
        noInfo: false,
        inline: true,
        stats: {colors: true}
    }
};
