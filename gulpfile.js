'use strict';

var gulp = require('gulp');

var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var browserify = require('gulp-browserify');

var paths = {
  browserify: {
    in: 'public/js/human.so.js',
    out: 'public/dist/js/human.so.js',
    watch: 'public/js/**/*.js',
    options: {},
  },
  sass: {
    in: 'public/sass/main.scss',
    out: 'public/css',
    watch: 'public/sass/**/*.scss',
    options: {},
  },
};

gulp.task('browserify', function(){
  return gulp.src(paths.browserify.in)
    .pipe(browserify(paths.browserify.options))
    .pipe(gulp.dest(paths.browserify.out));
});

gulp.task('sass', function(){
  return gulp.src(paths.sass.in)
    .pipe(sass(paths.sass.options))
    .pipe(gulp.dest(paths.sass.out));
});

gulp.task('watch', function() {
  gulp.watch(paths.browserify.watch, ['browserify']);
  gulp.watch(paths.sass.watch, ['sass']);
});

gulp.task('server', function(){
  require('./app.js');
});

gulp.task('default', ['watch', 'server']);
