var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlImport = require('gulp-html-import');
//var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass({
            //outputStyle: 'compressed',
            includePaths: [
                'node_modules/susy/sass',
                'node_modules/breakpoint-sass/stylesheets'
            ]
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

// gulp.task('clean-css', function () {
//     return gulp.src(['./css','./dist/css'], {read: false}).pipe(clean());
// });

gulp.task('html-import', function () {
    return gulp.src('./src/*.html')
        .pipe(htmlImport('./src/components/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('./sass/**/*.scss', [/*'clean-css',*/'sass']);
    gulp.watch('./src/**/*.html', ['html-import']);
    gulp.watch('./dist/**/*.html', browserSync.reload);
});

