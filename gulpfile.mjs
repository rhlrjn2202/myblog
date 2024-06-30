import gulp from 'gulp';
import gulpGzip from 'gulp-gzip';
import imagemin from 'gulp-imagemin';
import { deleteAsync } from 'del';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

// Clean the output directory
async function clean() {
  await deleteAsync(['public']);
}

// Copy static files to the output directory
function copyStaticFiles() {
  return gulp.src('./src/**/*.{html,css,js,png,jpg,jpeg,gif,svg}')
    .pipe(gulp.dest('public'));
}

// Minify images
function minifyImages() {
  return gulp.src('./src/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('public'));
}

// Compress files using gzip
function gzipFiles() {
  return gulp.src('public/**/*.{html,css,js}')
    .pipe(gulpGzip())
    .pipe(gulp.dest('public'));
}

// Build the Eleventy site
async function buildEleventy() {
  await execPromise('npx eleventy');
}

// Define the build task
const build = gulp.series(
  clean,
  copyStaticFiles,
  minifyImages,
  buildEleventy,
  gzipFiles
);

export {
  clean,
  copyStaticFiles,
  minifyImages,
  gzipFiles,
  buildEleventy,
  build
};

export default build;
