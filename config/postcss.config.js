module.exports = ({file, options}) => {
  if(options.env === 'production') {
    return {
      plugins: [
          //require('autoprefixer'),
          require('cssnano'),
          // More postCSS modules here if needed
      ]
    }
  } else {
    return {
      plugins: [
        //require('autoprefixer')
      ]
    }
  }
}
