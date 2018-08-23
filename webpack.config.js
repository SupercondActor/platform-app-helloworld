var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ZipPlugin = require('zip-webpack-plugin');

module.exports = env => {
    return {
        node: {
            fs: 'empty'
        },
        entry: './index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'Scripts/bundle.js'
        },
        target: 'node',
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/, loaders: ['ts-loader']
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: 'src/appConfig' }
            ]),
            new ZipPlugin({ filename: 'BusinessScriptBundle.zip' })
        ]
    }
};

