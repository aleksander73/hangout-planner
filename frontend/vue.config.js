const path = require('path');

module.exports = {
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Hangout Planner';
            return args;
        });
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            }
        }
    },
    outputDir: path.resolve(__dirname, '../public')
};
