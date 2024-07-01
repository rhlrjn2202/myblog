const gulp = require('gulp');
const gzip = require('gulp-gzip');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const critical = require('critical').stream;

async function loadImagemin() {
    const imagemin = await import('gulp-imagemin');
    return imagemin.default;
}

// Task to optimize images
async function optimizeImages() {
    const imagemin = await loadImagemin();
    return gulp.src('./src/assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/assets/images'));
}

// Task to create gzip files
function createGzip() {
    return gulp.src('./public/**/*.{html,css,js}')
        .pipe(gzip())
        .pipe(gulp.dest('./public'));
}

// Task to inline critical CSS
function inlineCriticalCss() {
    return gulp.src('public/*.html')
        .pipe(critical({ base: 'public/', inline: true, minify: true }))
        .pipe(gulp.dest('public'));
}

// Task to minify HTML
function minifyHtml() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./public'));
}

// Task to minify JS
function minifyJs() {
    return gulp.src('./public/**/*.js')
        .pipe(terser())
        .pipe(gulp.dest('./public'));
}

// Task to minify CSS
function minifyCss() {
    return gulp.src('./public/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public'));
}

// Task to build the site
const build = gulp.series(
    optimizeImages,
    inlineCriticalCss,
    minifyHtml,
    minifyJs,
    minifyCss,
    createGzip
);

exports.default = build;
exports.build = build;
exports.optimizeImages = optimizeImages;
exports.createGzip = createGzip;
exports.inlineCriticalCss = inlineCriticalCss;
exports.minifyHtml = minifyHtml;
exports.minifyJs = minifyJs;
exports.minifyCss = minifyCss;
