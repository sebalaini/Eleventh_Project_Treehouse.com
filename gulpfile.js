"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
cleanCSS = require('gulp-clean-css'),
    maps = require('gulp-sourcemaps'),
     del = require('del');

gulp.task("concatCss", function() {
    return gulp.src([
        'css/normalize.css',
        'css/foundation.css',
        'css/arvo.css',
        'css/ubuntu.css',
        'css/basics.css',
        'css/menu.css',
        'css/hero.css',
        'css/photo-grid.css',
        'css/modals.css',
        'css/footer.css',
        ])
    .pipe(maps.init())
    .pipe(concat('main.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task("minifyCss", ["concatCss"], function() {
  return gulp.src("css/main.css")
    .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('css'));
}); 

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/fastclick.js',
        'js/foundation.js',
        'js/foundation.equalizer.js',
        'js/foundation.reveal.js',
        ])
    .pipe(maps.init())
    .pipe(concat('main.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/main.js")
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('clean', function() {
  del(['js/main*.js*', 'css/main*.css*']);
});

gulp.task("build", ['minifyScripts', 'minifyCss'], function() {
  return gulp.src(["css/main.min.css", "js/main.min.js", 'index.html',
                   "img/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task("default", ["build"]);




