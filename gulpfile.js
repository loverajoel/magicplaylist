var gulp = require('gulp');
var args   = require('yargs').argv;
var minifyCss = require('gulp-minify-css');
var Bundlerify = require('gulp-bundlerify').default;
var oldBabelify = require('babelify');

var isProduction = args.production === true;

var bundler = new Bundlerify(gulp, {
  mainFile: './app/js/app.js',
  dist: {
    dir: './dist/js/',
  },
  watchifyOptions: {
    fullPaths: false,
    debug: !isProduction,
  },
  browserSyncOptions: {
    server: {
      baseDir: './app/',
      directory: false,
    },
  },
  babelifyOptions: {
    presets: ['react'],
  },
  polyfillsEnabled: isProduction,
  uglify: isProduction,
  lint: {
    target: ['./app/js/**/*.js'],
  },
  tasks: {
    build: {
      deps: isProduction ? ['css', 'img', 'html'] : [],
    },
    docs: false,
  },
}).tasks();

// Remove these two lines to upgrade to Babel 6
bundler.babelify = oldBabelify;
delete bundler.config.babelifyOptions.presets;

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
