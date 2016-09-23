const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');

gulp.task('browserify-first', () => {
    gulp.src('client/app.js')
    .pipe(browserify({ sourceType: "module" }))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('dist/'));

    gulp.src('client/index.html').pipe(gulp.dest('dist/ready'));
});

gulp.task('babel-first', () => {
    gulp.src('client/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('dist/tmp'))
    .on('end', () => {
        gulp.src('dist/tmp/app.js')
        .pipe(browserify())
        .pipe(gulp.dest('dist/ready'));
    });

    gulp.src('client/index.html').pipe(gulp.dest('dist/ready'));
});