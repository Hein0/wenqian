module.exports = {
    devServer: {
        port: 8009,
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://v2.api.haodanku.com/',   // 需要请求的地址
                ws: false,
                changeOrigin: true,  // 是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/tao': {
                target: 'http://www.qiqiandu.com',   // 需要请求的地址
                ws: false,
                changeOrigin: false,  // 是否跨域
                pathRewrite: {
                    '^/tao': ''
                }
            }

        },
    },
};
