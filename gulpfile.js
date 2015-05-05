'use strict';
var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    files = ['src/**', 'test/**'];
    
gulp.task('test', function() {
    return gulp.src(['test/*.js'], {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec',
        }))
        .on('error', gutil.log);
});
gulp.task('jscs', function() {
    gulp.src(files)
        .pipe(jscs('.jscsrc'))
        .on('error', gutil.log);
});
gulp.task('lint', function() {
    return gulp.src(files)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', gutil.log);
});
gulp.task('default', function() {
    gulp.watch(['src/**', 'test/**'], ['test']);
});
gulp.task('testjs', ['jscs', 'lint']);
/**
 * lint watch on command line
 */
gulp.task('lintw', function() {
    gulp.watch(files, ['lint']);
});
/**
 * jscs watch on command line
 */
gulp.task('jscsw', function() {
    gulp.watch(files, ['jscs']);
});