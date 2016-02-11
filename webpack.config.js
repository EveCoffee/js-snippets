var path = require('path');

module.exports = {
    entry: {
        'apply-order': './es2015/apply-order.js',
        'personal-center': "./es2015/personal-center.js",
        'works-detail': "./es2015/works-detail.js",
        'works-list': "./es2015/works-list.js"
    },
    output: {
        path: path.join(__dirname, '/js'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }
        ]
    },
    watch: true,
    devtool: 'source-map'
};