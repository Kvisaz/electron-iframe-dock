const path = require('path');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

const CopyPlugin = require("copy-webpack-plugin");

const copyAssetPlugin = new CopyPlugin([{
    from: path.resolve(__dirname, 'dock'),
    to: path.resolve(__dirname, '.webpack/renderer/dock')
}]);

rules.push({
    test: /\.css$/,
    use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
});

module.exports = {
    module: {
        rules,
    },
    plugins: [
        ...plugins,
        copyAssetPlugin
    ],
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
    },
};
