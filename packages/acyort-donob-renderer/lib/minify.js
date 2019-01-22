// const minify = require('html-minifier').minify
const gulp = require('gulp')
const minifier = require('gulp-htmlmin')
const uglify = require('gulp-terser')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

module.exports = (publicDir) => {
  gulp.task('html', () => gulp
    .src(`${publicDir}/**/*.html`)
    .pipe(minifier({ collapseWhitespace: true, removeComments: true, minifyJS: true }))
    .pipe(gulp.dest(publicDir)))
  gulp.task('js', () => gulp
    .src(`${publicDir}/**/*.js`)
    .pipe(uglify())
    .pipe(gulp.dest(publicDir)))
  gulp.task('css', () => gulp
    .src(`${publicDir}/**/*.css`)
    .pipe(postcss([autoprefixer(), cssnano({ preset: 'default' })]))
    .pipe(gulp.dest(publicDir)))
  return new Promise((res) => {
    gulp.task('default', gulp.series('html', 'js', 'css', () => {
      res()
    }))
    const ins = gulp.task('default')
    ins.apply(gulp)
  })
}
