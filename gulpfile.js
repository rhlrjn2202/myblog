import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import gzip from 'gulp-gzip';

// Task to optimize images
export function optimizeImages() {
    return gulp.src('./src/assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/assets/images'));
}

// Task to create gzip files
export function createGzip() {
    return gulp.src('./public/**/*.{html,css,js}')
        .pipe(gzip())
        .pipe(gulp.dest('./public'));
}

// Define Gulp tasks
export default gulp.series(
    optimizeImages,
    createGzip
);
