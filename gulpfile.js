// 引入 gulp
const gulp = require('gulp')
// 引入插件
const browserSync = require('browser-sync').create() // 瀏覽器同步
const nodemon = require('gulp-nodemon')
const pug = require('gulp-pug')
const sass = require('gulp-sass') // sass
const plumber = require('gulp-plumber') // 載入 gulp-plumber
const gulpImagemin = require('gulp-imagemin') //壓縮圖片
const consolidate = require('gulp-consolidate')
const iconfont = require('gulp-iconfont')

// 路徑設定
const path = {
  source: './src/', // 原始碼
  build: './build/' // 輸出位置
}

var BROWSER_SYNC_RELOAD_DELAY = 500

gulp.task('nodemon', function(cb) {
  var called = false
  return nodemon({
    // nodemon our expressjs server
    script: 'app.js',

    // watch core server file(s) that require server restart on change
    watch: ['app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) {
        cb()
      }
      called = true
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        })
      }, BROWSER_SYNC_RELOAD_DELAY)
    })
})
gulp.task('browser-sync', ['nodemon'], function() {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({
    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    browser: ['google-chrome']
  })
})

// 編譯pug
gulp.task('pug', function() {
  return gulp
    .src([!path.source + 'Layout.pug', path.source + '**/pages/*.pug'])
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(path.build))

    .pipe(browserSync.stream({ match: path.source + '**/*.pug' }))
})
// 編譯 SASS
gulp.task('sass', function() {
  return gulp
    .src(path.source + 'assets/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(path.build + 'css/'))
    .pipe(browserSync.stream())
})

gulp.task('bs-reload', function() {
  browserSync.reload()
})

gulp.task('default', ['browser-sync'], function() {})

// 參考文檔
// 1.部落客
// https://kejyuntw.gitbooks.io/gulp-learning-notes/

// 2.scotch.io
// https://scotch.io/tutorials/how-to-use-browsersync-for-faster-development#toc-using-browsersync-and-sass

// 3.browsersync
// https://browsersync.io/docs/gulp#gulp-manual-reload

// 4.iconFont
// https://buddy.works/guides/how-create-webfont-from-svg-files
