const path = require('path');

const webpack = require('webpack');

// Vue Loader 的插件
const {VueLoaderPlugin} = require('vue-loader/dist/index');

// 创建 html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 提取css到文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// 拷贝
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 清空文件夹
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// 压缩后的资源自动打包成zip包
const FileManagerWebpackPlugin = require('filemanager-webpack-plugin');

// js压缩
const TerserWebpackPlugin = require('terser-webpack-plugin');

// 代码校验工具
const ESLintPlugin = require('eslint-webpack-plugin');

// 样式校验
const StylelintPlugin = require('stylelint-webpack-plugin');

// 合并配置文件
const {merge} = require('webpack-merge');

// 输出日志
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// 耗时显示
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// 查看打包情况
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 当前运行环境
const CURRENT_ENV = require(`./config/${process.env.SCRIPT_ENV}.js`);

// 获取项目依赖的cdns
const Cdns = require(`./builder/cdns.js`);

// 配置文件
const CONFIG_VARIABLES = {

  // 开发环境 配置文件
  build: {
    zipName: CURRENT_ENV.ZIP_NAME,
    outputPath: `./dist/${CURRENT_ENV.ENV.PACK_ENV.slice(1, -1)}`
  },
};

const commonConfig = {

  cache: {
    type: 'filesystem'
  },

  // 入口
  entry: {
    index: './index.ts',
    // frameWork: ['vue', 'vue-router', 'vuex']
  },

  resolve: {

    // 引用时可忽略的后缀
    extensions: ['.vue', '.js', '.scss', '.css', 'json', '.ts', '.tsx', '.jsx'],

    // 别名，引用时直接可以通过别名引用
    alias: {
      '@': path.resolve(__dirname, './src'),
      'static': path.resolve(__dirname, './static'),
      CommCode: path.resolve('./src/util/CommCode'),
      CommRequest: path.resolve('./src/util/CommRequest'),
      CommUtil: path.resolve('./src/util/CommUtil'),
      CurSetting: path.resolve('./src/util/CurSetting'),
      CommSavePoint: path.resolve('./src/util/CommSavePoint'),
      CommErrorLog: path.resolve('./src/util/CommErrorLog'),
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader',
      },
      {
        test: /\.(j|t)s$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|gif|jpe?g)(\?\S*)?$/i,
        type: 'asset',
        exclude: /node_modules\/(?!element-plus).*/,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb，才转base64
          }
        },
        generator: {
          filename: 'images/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        type: 'asset',
        exclude: /node_modules\/(?!element-plus).*/,
        generator: {
          filename: 'fonts/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './mdConfig/index.js')
          }
        ]
      }
    ]
  },

  plugins: [

    // 定义全局变量，一般是定义字符串变量
    new webpack.DefinePlugin({
      'process.env': {Env: CURRENT_ENV.ENV},
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    }),

    new CopyWebpackPlugin({
      patterns: [
        {from: './static', to: './static'}
      ]
    }),

    new CopyWebpackPlugin({
      patterns: [
        {from: './favicon.ico', to: './favicon.ico'}
      ]
    }),

    new ESLintPlugin({
      extensions: ['js', 'json', 'ts', 'vue'],
      exclude: './node_modules',
      fix: true
    }),

    new StylelintPlugin({
      files: ['src/**/*.{css,scss}'],
      fix: true,
      cache: true,
      failOnError: true
    }),

    // Vue Loader 的插件
    new VueLoaderPlugin(),

    // 1、将模块的引用暴露到全局中
    // 2、先找 .resolve.alias 中的属性，若没找到会找 node_modules 下的文件，直到找到为止
    new webpack.ProvidePlugin({
      CommCode: ['CommCode', 'default'],
      CommRequest: ['CommRequest', 'default'],
      CommUtil: ['CommUtil', 'default'],
      CurSetting: ['CurSetting', 'default'],
      CommSavePoint: ['CommSavePoint', 'default'],
      CommErrorLog: ['CommErrorLog', 'default'],
    }),

    // 创建html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: __dirname + '/index.html',
      inject: true,
      minify: true,
      title: 'webpack5 + vue3 + ts',
      templateParameters: {
        cdnJs: Cdns.getCdnJs(CURRENT_ENV)
      }
    }),
  ]
};

const developmentConfig = {

  // 模式，使用webpack4的优化功能
  mode: 'development',

  devtool: 'eval-source-map',

  optimization: {
    runtimeChunk: 'single'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点
          'css-loader', // 将 CSS 转化成 CommonJS 模块
          'postcss-loader', // 添加前缀
          'sass-loader' // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      }
    ]
  },

  plugins: [

    // 定义全局变量，一般是定义字符串变量
    new webpack.DefinePlugin({}),
  ],

  output: {

    // 发布后，资源的引用目录
    publicPath: '/',

    // 文件名称
    filename: 'js/[name].js',

    // 按需加载模块时输出的文件名称
    chunkFilename: 'js/[name].js'
  },

  devServer: {

    hot: true,

    // 端口
    port: CURRENT_ENV.VISIT_PORT,

    open: true,

    // // 设置代理后，会将1的地址转为2的地址
    // // http://localhost:7066/stock/f9/GetStockBaseInfo?securityCode=600000.SH
    // // http://localhost:15147/stock/f9/GetStockBaseInfo?securityCode=600000.SH
    proxy: {
      '/api': {
        target: CURRENT_ENV.APP_ORIGIN,
        pathRewrite: {'^/api': ""}, // 去掉api
        timeout: CURRENT_ENV.PROXY_TIMEOUT
      },
      // 可以进行多个代理
      // '/api2': {
      //   target: CURRENT_ENV.APP_ORIGIN,
      //   pathRewrite: {'^/api': ""}, // 去掉api
      //   timeout: CURRENT_ENV.PROXY_TIMEOUT
      // },
    }
  },
};

const buildConfig = {

  // 模式，使用webpack4的优化功能
  mode: 'production',

  devtool: 'source-map',

  optimization: {

    runtimeChunk: 'single',

    minimize: true,

    minimizer: [
      new TerserWebpackPlugin({
        test: /\.js$/i,
        exclude: /node_modules/
      }),
      new CssMinimizerPlugin({
        test: /\.css$/i,
        exclude: /node_modules/
      })
    ],
    // js代码提取
    splitChunks: {
      minSize: 10 * 1024,
      cacheGroups: {
        'element': {
          test: /element-plus/,
          chunks: 'all',
          name: 'element',
          priority: 80,
        },
        // 'frameWork': {
        //   test: /frameWork/,
        //   chunks: 'all',
        //   name: 'frameWork',
        //   priority: 70,
        // },
        modules: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'modules',
          priority: 60,
        }
      },
    }
  },

  module: {
    rules: [
      // vue-loader @15.?之后，css要单独处理
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader', // 将 CSS 转化成 CommonJS 模块
          'postcss-loader',
          'sass-loader' // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      },
    ]
  },

  plugins: [

    // 全局变量
    new webpack.DefinePlugin({}),

    // 清空文件夹
    new CleanWebpackPlugin(),

    // 提取css到文件
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: 'css/[name]-[chunkhash:8].css',
      chunkFilename: 'css/[name]-[chunkhash:8].css'
    }),

    new FileManagerWebpackPlugin({
      events: {
        onEnd: {
          archive: [
            {
              source: CONFIG_VARIABLES.build.outputPath,
              destination: CONFIG_VARIABLES.build.outputPath + '/' + CONFIG_VARIABLES.build.zipName + '.zip'
            }
          ]
        }
      }
    }),

    new ProgressBarPlugin({
      format: '[:bar] ' + ' |. ' + 'percent::percent' + ' | ' + 'elapsed::elapsed seconds',
      clear: false
    }),
    new SpeedMeasurePlugin(),
    new BundleAnalyzerPlugin()
  ],

  output: {

    // 输出目录
    path: path.join(__dirname, CONFIG_VARIABLES.build.outputPath),

    // 文件名称
    filename: 'js/[name]-[chunkhash:8].js',

    // 按需加载模块时输出的文件名称
    chunkFilename: 'js/[name]-[chunkhash:8].js',

    // html中注入的入口资源前缀
    publicPath: './'
  }
};

module.exports = _ => {

  let selfConfig = null, scriptEnv = process.env.SCRIPT_ENV;

  if (scriptEnv === 'dev') {

    selfConfig = developmentConfig;
  } else {

    selfConfig = buildConfig;
  }

  return merge(commonConfig, selfConfig);
};
