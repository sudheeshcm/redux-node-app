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
const webpack = require('gulp-webpack');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const exec = require('child_process').exec;
const airBnbRules = require('./.eslintrc');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('webpack', () => {
return gulp.src('client/js/index.js')
  .pipe(webpack( require('./webpack.config.js') ))
  .pipe(gulp.dest('client/static/js'));
});

gulp.task('lint', () => {
  return gulp.src('./server/**/*.js')
    .pipe(eslint(airBnbRules))
    .pipe(gulp.dest('./server'))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('copyConfig', ['webpack'], () => {
  var stream = gulp.src('./config/**/*')
    .pipe(gulp.dest('./build/config'));
  return stream;
});

gulp.task('babelifyLib', ['babelifyMain'], () => {
  var stream = gulp.src('./server/**/*.js')
    //.pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./build/server'));
  return stream;
});

gulp.task('babelifyMain', ['copyConfig'], () => {
  var stream = gulp.src('main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./build'));
  return stream;
});

gulp.task('babelify', ['babelifyLib']);

gulp.task('buildDev', ['lint', 'babelify']);

gulp.task('build', ['babelify']);

gulp.task('serveDev', ['buildDev'], (event) => {
  nodemon({
    script: './build/main.js',
    env: {
      'NODE_ENV': 'development'
    },
    watch: ['./main.js', './server/**/*.js']
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
