module.exports = {
    configureWebpack: {
        resolve: {
            //可以不写文件后缀
            // extensions: [],
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network' : '@/network',
                'views' : '@/views'

            }
        }
    }
}
