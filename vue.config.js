module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 4000,
    },
    chainWebpack: config => {
        config.module.rule('pug')
            .test(/\.pug$/)
            .use('pug-html-loader')
            .loader('pug-html-loader')
            .end()
    }
}