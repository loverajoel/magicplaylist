var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var args   = require('yargs').argv;
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var minifyCss = require('gulp-minify-css');

var isProduction = args.production === true;

var config = {
  entryFile: './app/js/app.js',
  outputDir: './dist/js',
  outputFile: 'build.js'
};

// clean the output directory
gulp.task('clean', function(cb) {
  rimraf(config.outputDir, cb);
});

var bundler;
function getBundler() {
  if (!bundler) {
    if (isProduction) {
      bundler = watchify(
        browserify([
          require.resolve('whatwg-fetch/fetch'),
          require.resolve('core-js/fn/symbol'),
          require.resolve('core-js/fn/promise'),
          config.entryFile], _.extend({ debug: true }, watchify.args)));
    } else {
      bundler = watchify(
        browserify(config.entryFile, _.extend({ debug: !isProduction }, watchify.args))
        );
    }
  }
  return bundler;
};

function bundle() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulpif(isProduction, streamify(uglify())))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
}

gulp.task('css', function() {
  gulp.src('./app/styles/style.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('img', function() {
  gulp.src('./app/img/*')
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('html', function() {
  gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist/'));
  gulp.src('./app/login/index.html')
    .pipe(gulp.dest('./dist/login'));
});

gulp.task('build-persistent-deploy', ['clean', 'css', 'img', 'html'], function() {
  return bundle();
});

gulp.task('build-persistent', ['clean'], function() {
  return bundle();
});

gulp.task('deploy', ['build-persistent-deploy'], function() {
  process.exit(0);
});

gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});

gulp.task('watch', ['build-persistent'], function() {

  browserSync({
    server: {
      baseDir: './'
    }
  });

  getBundler().on('update', function() {
    gulp.start('build-persistent');
  });
});

// WEB SERVER
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});
