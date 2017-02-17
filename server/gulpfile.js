/**
 * @createdDate:    17 Feb 2017
 * @description     gulpfile provides various tasks to build and run.
 *                  lint: Task to precompile javascript code with eslint.
 *                  babelify: Task to convert ES6 code to ES5 spec.
 *                  serveDev: To run the server in development after a complete build.
 *                  serve: To run the server in production envt using forever.
 */
/* eslint-disable */
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const exec = require('child_process').exec;
const airBnbRules = require('./.eslintrc');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('lint', () => {
  return gulp.src('./lib/**/*.js')
    .pipe(eslint(airBnbRules))
    .pipe(gulp.dest('./lib'))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('copyConfig', () => {
  var stream = gulp.src('./config/**/*')
    .pipe(gulp.dest('./build/config'));
  return stream;
});

gulp.task('babelifyLib', () => {
  var stream = gulp.src('./lib/**/*.js')
    //.pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./build/lib'));
  return stream;
});

gulp.task('babelifyMain', () => {
  var stream = gulp.src('main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./build'));
  return stream;
});

gulp.task('babelify', ['babelifyMain', 'babelifyLib']);

gulp.task('buildDev', ['lint', 'copyConfig', 'babelify']);

gulp.task('build', ['copyConfig', 'babelify']);

gulp.task('serveDev', ['buildDev'], (event) => {
  nodemon({
    script: './build/main.js',
    env: {
      'NODE_ENV': 'development'
    },
    watch: ['./main.js', './lib/**/*.js']
  });
});

gulp.task('serve', ['build'], (event) => {
  exec('npm start', (error) => {
    if (error) {
      console.log(`Error: ${ error }`);
    }
    event(error);
  });
});

gulp.task('default', ['serveDev']);
