var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var rename = require('gulp-rename');

var libs_base = 'bower_components';

var client_deploy = 'deploy/public';
var paths = {
    src: {
        html: 'src/main/HTML/*',
        scss: 'src/main/scss/*'
    },
    dst: {
        html: client_deploy,
        css: client_deploy + '/css',
        js_libs: client_deploy + '/js/libs'
    }
};

gulp.task('html', function () {
    gulp.src(paths.src.html)
        .pipe(gulp.dest(paths.dst.html))
        .pipe(livereload());
});

gulp.task('scss', function () {
    gulp.src(paths.src.scss)
        .pipe(sass())
        .pipe(gulp.dest(paths.dst.css))
        .pipe(livereload());
});

gulp.task('static', ['html','scss', 'libs']);



gulp.task('libs', function () {
    gulp.src(libs_base + '/angular/angular.js')
        .pipe(rename('angular.js'))
        .pipe(gulp.dest(paths.dst.js_libs));

    gulp.src(libs_base + '/jquery/dist/jquery.js')
        .pipe(rename('jquery.js'))
        .pipe(gulp.dest(paths.dst.js_libs));
});

gulp.task('dev', function () {
    livereload.listen();
    gulp.watch(paths.src.html, ['html']);
    gulp.watch(paths.src.html, ['scss']);


});