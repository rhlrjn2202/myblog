const gulp = require('gulp');
const gzip = require('gulp-gzip');
const imagemin = require('gulp-imagemin');

// Task to compress text-based files
gulp.task('compress', () => {
    return gulp.src('public/**/*.{html,xml,json,css,js}')  // Updated to match 'public'
        .pipe(gzip())
        .pipe(gulp.dest('public'));
});

// Task to optimize images
gulp.task('images', () => {
    return gulp.src('public/assets/images/**/*')  // Updated to match 'public'
        .pipe(imagemin())
        .pipe(gulp.dest('public/assets/images'));
});

// Default task to run both compression and image optimization
gulp.task('default', gulp.series('compress', 'images'));
