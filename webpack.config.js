
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
    entry: path.resolve('./ts-src/index.ts'),
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
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: plugins,

    externals: {
    },

    resolve: {
        modules: [
            "node_modules"
        ],

        extensions: [".js", ".es6", '.json', '.ts', '.tsx'],

        alias: {
        }
    }
};
