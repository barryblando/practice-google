/**
 * Created on 5/30/2017.
 */
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync').create(),
      autoPrefixer = require('gulp-autoprefixer'),
      csscomb = require('gulp-csscomb');

function handleError(error) {
  console.log(error.toString());
  this.emit('end')
}

gulp.task('styles', function () {
  gulp.src('./src/scss/application.scss')
      .pipe(sass())
      .pipe(autoPrefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(csscomb('./src/json/.csscomb.json'))
      .on('error', handleError)
      .pipe(gulp.dest('./build/css'))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./src/scss/**/*.scss', ['styles']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'serve']);
