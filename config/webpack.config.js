'use-strict'

const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = env => {
  const environment = env.NODE_ENV
  return {
    mode: environment,
    entry: [
      './src/js/main.js', './src/scss/style.scss'
    ],
    output: {
      path: path.resolve('./public/dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader'
        },
        {
          test: /style\.s[ac]ss$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'style.css'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: (environment === 'development' ? 'inline' : false),
                config: {
                  path: './config/',
                  ctx: {
                    env: environment
                  }
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sassOptions: {
                  outputStyle: 'compressed',
                },
              },
            },
          ]
        }
      ]
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'src/images', to: 'images'},
          { from: 'src/fonts', to: 'fonts'}
        ]
      })
    ]
  }
}
