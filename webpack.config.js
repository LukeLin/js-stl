
let webpack = require('webpack');
let fs = require('fs');
let path = require('path');

let DEBUG = (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development') || false;

let plugins = [];
if (!DEBUG) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    );
} else {
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    );
}

module.exports = {
    target: 'web',
    entry: path.resolve('./src/index.js'),
    output: {
        path: path.resolve('./dist/'),
        filename: DEBUG ? "./DS-debug.js" : "./DS-min.js",
        chunkFilename: DEBUG ? "./DS-debug.js" : "./DS-min.js",
        publicPath: '',
        pathinfo: false,
        libraryTarget: 'umd',
        library: 'DS'
    },

    cache: true,

    devtool: DEBUG && "#inline-source-map",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [
                            [
                                "es2015",
                                {
                                    loose: true,
                                    modules: false
                                }
                            ]
                        ],
                        plugins: [
                            ["transform-runtime", {
                                "polyfill": false,
                                "regenerator": true
                            }],
                            "transform-class-properties"
                        ]
                    }
                }]
            }
        ]
    },

    plugins: plugins,

    externals: {
    },

    resolve: {
        modules: [
            "node_modules"
        ],

        extensions: [".js", ".es6", '.json'],

        alias: {
        }
    }
};
