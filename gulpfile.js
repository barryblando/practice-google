/**
 * Created on 5/30/2017.
 */
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync').create();

function handleError(error) {
  console.log(error.toString());
  this.emit('end')
}

gulp.task('styles', function () {
  gulp.src('./src/scss/application.scss')
      .pipe(sass())
      .on('error', handleError)
      .pipe(gulp.dest('./src/css'))
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
