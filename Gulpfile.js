var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var rename = require('gulp-rename');

var libs_base = 'bower_components';

var client_deploy = 'deploy/public';
var paths = {
    src: {
        html: 'src/main/HTML/**/*.html',
        scss: 'src/main/scss/*',
        javascript: 'src/main/javascript/*'
    },
    dst: {
        html: client_deploy,
        css: client_deploy + '/css',
        css_libs: client_deploy + '/css/libs',
        javascript: client_deploy + '/js',
        javascript_libs: client_deploy + '/js/libs'
        
    }
};

gulp.task('javascript', function () {
    gulp.src(paths.src.javascript)
        .pipe(gulp.dest(paths.dst.javascript))
        .pipe(livereload());
});

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

gulp.task('libs', function () {
    gulp.src(libs_base + '/angular/angular.js')
        .pipe(rename('angular.js'))
        .pipe(gulp.dest(paths.dst.javascript_libs));

    gulp.src(libs_base + '/jquery/dist/jquery.js')
        .pipe(rename('jquery.js'))
        .pipe(gulp.dest(paths.dst.javascript_libs));
    
    gulp.src(libs_base + '/angular-ui-router/release/angular-ui-router.js')
        .pipe(gulp.dest(paths.dst.javascript_libs));
    
    gulp.src(libs_base + '/angular-animate/angular-animate.js')
        .pipe(gulp.dest(paths.dst.javascript_libs));
    
    gulp.src(libs_base + '/angularjs-toaster/toaster.js')
        .pipe(gulp.dest(paths.dst.javascript_libs));
    
    gulp.src(libs_base + '/angularjs-toaster/toaster.css')
        .pipe(gulp.dest(paths.dst.css_libs));
    
});
gulp.task('static', ['html','scss', 'javascript', 'libs']);



gulp.task('dev', ['static','watch']);

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(paths.src.html, ['html']);
    gulp.watch(paths.src.scss, ['scss']);
    gulp.watch(paths.src.javascript, ['javascript']);

});