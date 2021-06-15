const os = require('os');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

// css 自动加前缀
const autoprefixer = require('autoprefixer');

// px 转 rem
// const pxtorem = require('postcss-pxtorem');

// gzip 压缩本地打包文件
// const CompressionWebpackPlugin = require('compression-webpack-plugin');

// 获取本地ip
const getIp = () => {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

module.exports = {
  /*
    * 相对路径 ('./')，所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径
    * 当使用基于 HTML5 history.pushState 的路由时，需要避免使用相对 publicPath
    * 当使用 pages 选项构建多页面应用时，应当避免使用相对 publicPath
  */
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'dist', // 目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)
  assetsDir: 'static', // 放置生成的静态资源目录
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  css: {
    extract: IS_PROD, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中
    sourceMap: !IS_PROD, // 是否为 CSS 开启 source map
    requireModuleExtension: true, // *.module.[ext] 结尾的文件会被视作 CSS Modules 模块
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          // pxtorem({
          //   rootValue: 10,
          //   unitPrecision: 5, // 精度
          //   propList: ['*'],
          //   selectorBlackList: [], // (数组)忽略选择器并保留为 px
          //   replace: true, // 替换包含REM的规则，而不是添加回退
          //   mediaQuery: false, // 允许媒体查询中转换
          //   minPixelValue: 2, // 设置要替换的最小像素值
          //   exclude: /node_modules/i // 排除（字符串、Regexp、函数）要忽略的文件路径并保留为px
          //   // 在配置 postcss-loader 时，应避免 ignore node_modules 目录，否则将导致 Vant 样式无法被编译
          // })
        ]
      }
    }
  },
  devServer: {
    clientLogLevel: 'warning', // 热更新时阻止控制台显示消息，太多了，没加 eslint none
    overlay: { warnings: false, errors: true }, // webpack 的 eslint 等错误、警告提示显示在页面中，全为 true 会停止页面运行
    noInfo: true, // 每次启动和保存，只显示 webpack 编译的错误和警告信息
    watchContentBase: true, // 修改没有被入口文件托管的文件，比如 index.html 文件，也会自动更新
    compress: true, // 一切服务都启用 gzip 压缩
    hot: true, // 启动 webpack 热模块替换特性
    inline: true, // 自动刷新
    open: true, // 自动打开浏览器
    port: process.env.VUE_APP_PORT,
    // before(app) { // 加载本地 json 数据
    //   // 访问地址：http://localhost:8081/api/goods
    //   app.get('/api/goods', function (req, res) {
    //     res.json(goods);
    //   });
    // },
    proxy: {
      '/wc': { // 纵信
        target: 'https://test-hfb.umfintech.com',
        ws: true, // 是否启用websockets
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        secure: false, // 如果是 https 接口，需要配置这个参数
        cookieDomainRewrite: {
          "*": getIp()
        }
      },
    },
    https: false, // 是否启用 https
    disableHostCheck: true,
  },

  configureWebpack: config => {
    if (IS_PROD) { // 为生产环境修改配置
      // 打包生产 .gz 压缩包
      // config.plugins.push(new CompressionWebpackPlugin({
      //   algorithm: 'gzip',
      //   test: /\.(js|css|svg|woff|ttf|json|html)$/, // 正在匹配需要压缩的文件后缀
      //   threshold: 10240, // 大于 10kb 的会压缩
      //   minRatio: 0.8,
      //   deleteOriginalAssets: false // 是否删除原文件
      // }))
    } else { // 为开发环境修改配置
      config.devtool = 'eval-cheap-module-source-map';
    }
  },

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // 移除 preload 插件
    // config.plugins.delete('preload');

    // 修复 HMR 热更新
    // config.resolve.symlinks(true);

    // 打包分析
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin,
        [
          {
            analyzerMode: 'static'
          }
        ]
      );
    }

    // 别名
    config.resolve.alias
      .set('@assets', '@/assets')
      .set('@utils', '@/assets/utils')
      .set('@components', '@/components')
      .set('@pages', '@/pages')
      .set('@server', '@/server')
  },
  lintOnSave: !IS_PROD, // 生产构建时禁用 eslint
  productionSourceMap: false, // 不需要生产环境的 source map
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  parallel: os.cpus().length > 1, // build 时为 Babel 或 TypeScript 使用 thread-loader。在系统多内核 CPU 时自动启用
  pwa: {
    name: process.env.VUE_APP_TITLE,
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    // 也可以定义为 InjectManifest 模式。但是需自己写SW.js文件进行配置
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // swSrc: './src/service-work.js',
      importWorkboxFrom: 'disabled',
      importScripts: 'https://cdn.bootcdn.net/ajax/libs/workbox-sw/5.0.0/workbox-sw.min.js'
      // ...other Workbox options...
    }
  }
}
