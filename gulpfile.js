var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var del = require('del');
var livereload = require('gulp-livereload');

gulp.task('scripts', function () {
    return gulp.src('*/**/*.es6')
        .pipe(sourcemaps.init())
        .pipe(babel({ optional: ["runtime"] }))
        .pipe(gulp.dest('dist'))
        // 客户端使用
        //.pipe(concat('all.js'))
        //.pipe(browserify({
        //    insertGlobals : false,
        //    debug : !gulp.env.production
        //}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb){
    del(['dist/*/**/*.js'], cb);
});

gulp.task('watch', function(){
    gulp.watch(['*/**/*.es6'], ['scripts']);
    livereload.listen();
    gulp.watch(['*/**/*.es6']).on('change', livereload.changed);
});

gulp.task('default', ['clean', 'scripts', 'watch']);