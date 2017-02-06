var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
         server: {
            baseDir: "./"
        }
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile Sass into CSS
gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      //outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});



// Watch for changes to sass files
gulp.task('default', ['serve'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
