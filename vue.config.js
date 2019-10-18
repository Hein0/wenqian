module.exports = {
    devServer: {
        port: 80,
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
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
                target: 'https://www.gomyorder.cn',   // 需要请求的地址
                ws: false,
                changeOrigin: false,  // 是否跨域
                pathRewrite: {
                    '^/tao': ''
                }
            }

        },
    },
};
