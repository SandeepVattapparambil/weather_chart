/*
 **Sandeep Vattapparambil
 **sandeepv68@gmail.com
 */
'use strict';
//add gulp package
var gulp = require('gulp');
//add browser-sync package
var browserSync = require('browser-sync');
//add nodemon
var nodemon = require('gulp-nodemon');
//default task
gulp.task('default', ['browser-sync'], function() {});
//bowser-sync task
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["public/**/*.*"],
    browser: "",
    port: 7000,
  });
});
//nodemon task
gulp.task('nodemon', function(cb) {
  var started = false;
  return nodemon({
    script: './bin/www'
  }).on('start', function() {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});
