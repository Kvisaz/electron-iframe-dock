const path = require('path');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

const CopyPlugin = require("copy-webpack-plugin");

const ASSETS = {
    dir: 'src/renderer',
    to: '.webpack/renderer',
    assets: [
        'dock'
    ]
}
const copyData = ASSETS.assets.map(asset => {
    return {
        from: path.resolve(__dirname, ASSETS.dir, asset),
        to: path.resolve(__dirname, ASSETS.to, asset)
    }
})
const copyAssetPlugin = new CopyPlugin(copyData);

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
