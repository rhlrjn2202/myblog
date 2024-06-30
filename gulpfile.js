import gulp from 'gulp';
import gulpGzip from 'gulp-gzip';

// Define the task for image optimization
const optimizeImages = async () => {
  // Dynamically import `gulp-imagemin` as an ES module
  const { default: imagemin } = await import('gulp-imagemin');
  return gulp.src('src/assets/**/*.{jpg,png,svg,webp}')
    .pipe(imagemin())
    .pipe(gulp.dest('public/assets'));
};

// Define the task for gzipping files
const gzip = () => {
  return gulp.src('public/**/*.{html,css,js,json,xml}')
    .pipe(gulpGzip())
    .pipe(gulp.dest('public'));
};

// Export the tasks to the Gulp CLI
export { optimizeImages, gzip };

// Define the default task
export default gulp.series(optimizeImages, gzip);
