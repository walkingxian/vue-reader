'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')// 一个很好看的 loading 插件
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')// 加载 webpack.prod.conf

// 使用 ora 打印出 loading + log
const spinner = ora('building for production...')
spinner.start()

// 删除这个文件夹 （递归删除）,然后重新编译
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
    // 开始 webpack 的编译
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
      //编译结果输出到控制台
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
