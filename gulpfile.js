"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
cleanCSS = require('gulp-clean-css'),
 htmlmin = require('gulp-htmlmin'),
  rename = require('gulp-rename'),
    maps = require('gulp-sourcemaps'),
     del = require('del');

gulp.task('minifyHtml', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task("concatCss", function() {
    return gulp.src([
        'css/normalize.css',
        'css/foundation.css',
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

gulp.task("minifyScripts", ["concatScripts","minifyCss"], function() {
  return gulp.src("js/main.js")
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('watchCss', function() {
  gulp.watch('css/*.css', ['concatCss']);
})

gulp.task('watchJS', function() {
  gulp.watch('js/*.js', ['concatScripts', "minifyScripts"]);
})

gulp.task('clean', function() {
  del(['js/main*.js*', 'css/main*.css*']);
});

gulp.task("build", ['minifyScripts', 'minifyCss', 'minifyHtml', 'watchCss', 'watchJS',], function() {
  return gulp.src(["css/main.min.css", "js/main.min.js",
                   "img/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task("default", ["build"]);




