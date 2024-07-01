const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const cleanCss = require('gulp-clean-css');
const critical = require('critical').stream;
const gzip = require('gulp-gzip');

// Task to optimize images
gulp.task('optimizeImages', () => {
    return gulp.src('./src/assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/assets/images'));
});

// Task to minify HTML
gulp.task('minifyHtml', () => {
    return gulp.src('./public/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./public'));
});

// Task to minify JavaScript
gulp.task('minifyJs', () => {
    return gulp.src('./public/**/*.js')
        .pipe(terser())
        .pipe(gulp.dest('./public'));
});

// Task to minify CSS
gulp.task('minifyCss', () => {
    return gulp.src('./public/**/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('./public'));
});

// Task to generate critical CSS
gulp.task('criticalCss', () => {
    return gulp.src('./public/**/*.html')
        .pipe(critical({ base: 'public/', inline: true, css: ['./public/**/*.css'] }))
        .on('error', err => console.error(err.message))
        .pipe(gulp.dest('./public'));
});

// Task to create gzip files
gulp.task('createGzip', () => {
    return gulp.src('./public/**/*.{html,css,js}')
        .pipe(gzip())
        .pipe(gulp.dest('./public'));
});

// Default task
gulp.task('build', gulp.series(
    'optimizeImages',
    'minifyHtml',
    'minifyJs',
    'minifyCss',
    'criticalCss',
    'createGzip'
));
