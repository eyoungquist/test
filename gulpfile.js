// Include gulp
var gulp = require('gulp');
 // Define base folders
var src = 'src/';
var dest = 'build/';
 // Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var browserSync = require('browser-sync');

 // Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(src + 'js/*.js')
      .pipe(concat('main.js'))
      //  .pipe(rename({suffix: '.min'}))
      //  .pipe(uglify())
        .pipe(gulp.dest(dest + 'js'));
});
 // Compile CSS from Sass files
gulp.task('sass', function() {
    return sass(src + 'scss/style.scss', {style: 'compressed'})
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dest + 'css'))
        /* Reload the browser CSS after every change */
        .pipe(browserSync.reload({stream:true}));

});
 gulp.task('images', function() {
  return gulp.src(src + 'images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(dest + 'img'));
});


/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
    browserSync.init(['css/*.css', 'js/*.js'], {
        /*
        I like to use a vhost, WAMP guide: https://www.kristengrote.com/blog/articles/how-to-set-up-virtual-hosts-using-wamp, XAMP guide: http://sawmac.com/xampp/virtualhosts/
        */
      //  proxy: 'your_dev_site.url'
        /* For a static server you would use this: */
        
        server: {
            baseDir: './'
        }
        
    });
});



// Watch for changes in files
gulp.task('watch', function() {
   // Watch .js files
  gulp.watch(src + 'js/*.js', ['scripts']);
   // Watch .scss files
  gulp.watch(src + 'scss/*.scss', ['sass']);
   // Watch image files
  gulp.watch(src + 'images/**/*', ['images']);
  /* Watch .html files, run the bs-reload task on change. */
  gulp.watch(['*.html'], ['bs-reload']);

 });

 // Default Task
gulp.task('default', ['scripts', 'sass', 'images','browser-sync', 'watch']);

