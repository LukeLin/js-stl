var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var del = require('del');
var livereload = require('gulp-livereload');

gulp.task('scripts', function () {
    return gulp.src('2/scripts/*.es6')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(gulp.dest('2/scripts'))
        .pipe(concat('all.js'))
        .pipe(browserify({
            insertGlobals : false,
            debug : !gulp.env.production
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('2/dist'));
});

gulp.task('clean', function(cb){
    del(['2/dist/*.js'], cb);
});

gulp.task('watch', function(){
    gulp.watch(['2/scripts/*.es6'], ['scripts']);
    livereload.listen();
    gulp.watch(['2/**']).on('change', livereload.changed);
});

gulp.task('default', ['clean', 'scripts', 'watch']);