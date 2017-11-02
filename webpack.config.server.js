var path = require('path');
var webpack = require('webpack');
module.exports = {
  // entry:'./src/main.js',         // 族谱图页面
  // entry:'./src2/main2.js',       // 司法统计页面
  // entry:'./src3/main3.js',       // 司法统计页面
  // entry:'./src/mainLanJing.js',  // 蓝鲸项目页面
  // entry:'./src0/main.js',        // 新页面主页
  // entry:'./src0/icmain.js',      // 新页面工商搜索主页
  // entry:'./src0/bpmain.js',      // 新页面商标专利搜索主页
  // entry:'./src0/lamain.js',      // 新页面司法搜索主页
  // entry:'./src0/jlmain.js',      // 新页面司法搜索列表页
  // entry:'./src0/jdmain.js',      // 新页面司法详情页
  // entry:'./src0/urmain.js',      // 新页面用户注册
  // entry:'./src0/clmain.js',      // 新页面搜索列表页
  // entry:'./src0/cdmain.js',      // 新页面企业详情页
  entry:{
    canvas:'./app/Canvas/main.js',      // H5 Canvas 函数
    build:'./app/Company/main.js',     // 族谱图页面 company_genealogy.html
    //develop2:'./app/Judicial/main2.js',    // 司法统计页面 judicial_.html
    //panorama:'./app/Judicial/panorama.js',  //新司法全景图JS文件 monitor_judicial_panorama.html
    // develop3:'./app/Judicial2/main3.js',    // 司法统计页面第二版 judicial2_.html
    // indexApi:'./app/Webapp/main.js',      // 新页面主页  webapp_indexapi.html
    // icindex:'./app/Webapp/icmain.js',      // 新页面工商搜索主页 webapp_companysearch.html
    // bpindex:'./app/Webapp/bpmain.js',      // 新页面工商搜索主页 webapp_patentsearch.html
    // laindex:'./app/Webapp/lamain.js',      // 新页面司法搜索主页 webapp_judicialsearch.html
    // jlindex:'./app/Webapp/jlmain.js',      // 新页面司法搜索列表页 webapp_judiciallist.html
    // jdindex:'./app/Webapp/jdmain.js',      // 新页面司法详情页 webapp_judicialinfo.html
    // urindex:'./app/Webapp/urmain.js',      // 新页面用户注册 webapp_register.html
    // clindex:'./app/Webapp/clmain.js',      // 新页面搜索列表页 webapp_companylist.html
    // cdindex:'./app/Webapp/cdmain.js',      // 新页面企业详情页 webapp_companyinfo.html
    // rmmain:'./app/Webapp/rmmain.js',      // 新页面企业动态监控 webapp_radarmonitor.html
    // webpackindex:'./app/WebpackTest/index.js',      // 新页面企业动态监控 webapp_radarmonitor.html
    
  },
  output: {
    path: path.resolve(__dirname, './js/app'),  //index.jsp
    // path: path.resolve(__dirname, './js'),       //develop.jsp
    //publicPath: '../css/fonts/', //棱镜终端发布版本样式地址
    publicPath: 'http://127.0.0.1:8080/ljd3/LengjingMonitor2/js/app/', //尝试修正webfont图片无法获取问题，项目服务器文件目录为js
    // filename: 'build.js'         // 族谱图页面
    // filename: 'develop.js'       // 族谱图页面
    // filename: 'develop2.js'      // 司法统计页面
    // filename: 'develop3.js'      // 司法统计页面
    // filename: 'lanjing.js'       // 蓝鲸项目页面
    // filename: 'indexApi.js'      // 新页面主页
    // filename: 'icindex.js'       // 新页面工商搜索主页
    // filename: 'bpindex.js'       // 新页面商标专利搜索主页
    // filename: 'laindex.js'       // 新页面司法搜索主页
    // filename: 'jlindex.js'       // 新页面司法搜索列表页
    // filename: 'jdindex.js'       // 新页面司法详情
    // filename: 'urregister.js'    // 新页面用户注册
    // filename: 'clindex.js'       // 新页面搜索列表页
    // filename: 'cdindex.js'       // 新页面企业详情页
    filename: '[name].js'       // 新页面企业动态监控
  },
  "scripts": {
    "dev": "webpack-dev-server --devtool eval --progress --colors",
    "deploy": "NODE_ENV=production webpack -p"
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.vue$/, loader: 'vue-loader'},
      { test: /\.js$/, loader: 'babel',exclude: /node_modules/},
      { test: /\.json$/,loader: 'json'},
      /*----start for ES6 ----------------------------------------------------------------------------------*/
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      /*---- end --------------------------------------------------------------------------------------------*/
      /*---- start for bootstrap ----------------------------------------------------------------------------*/
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      /*----end --------------------------------------------------------------------------------------------*/
    ]
  },
  resolve: {
   extensions: ['', '.js', '.es6']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
 // devtool: 'eval-source-map'
};
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = 'source-map'
  // http://vuejs.github.io/vue-loader/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
