var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');
   
var config = {
    sass_path: './scss',
    css_dest: './assets/css/',
    js_dest: './assets/js/'
    //font_dest: './assets/fonts/',
    //lib_path: './lib/'
};

//Task to combine all javascript in www/js/ folder into one main.js (located in www/assets/js/)
gulp.task('jscombine', function () {
    return gulp.src(['js/app.js', 'js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(config.js_dest));
});

//Gulp task to compile all .scss file, them conbine into one main.css file
//Including creation of min.css file
gulp.task('sass', function (done) {
    gulp.src(config.sass_path + '/main.scss')
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed',
            includePaths: [
              config.sass_path
           ]
        }))
        .pipe(gulp.dest(config.css_dest))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(config.css_dest))
        .on('end', done);
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(config.sass_path + '/**/*.scss', ['sass']);
});

//Combine all tasks to default task
gulp.task('default', ['jscombine', 'sass', 'watch']);