const gulp = require('gulp');
const sass = require('gulp-sass');
const jade = require('jade');
const gulpJade = require('gulp-jade');
const gutil = require('gutil');
const gulpsync = require('gulp-sync')(gulp);
const babel = require('gulp-babel');

/**
 *
 * 命令：gulp jade
 * 作用：编译jade文件，生成html
 *
 */
gulp.task('jade', function() {

  return gulp.src('./src/app-angular/**/*.jade')
    .pipe(gulpJade({ jade, pretty: true }))
    .pipe(gulp.dest('./public/app-angular'));

});

/**
 *
 * 命令：gulp sass
 * 作用：编译sass文件，生成css文件
 *
 */
gulp.task('sass', function() {

  return gulp.src('./src/app-angular/**/*.sass')
    .pipe(sass({ outputStyle: 'expanded' })
    .on('error', sass.logError))
    .pipe(gulp.dest('./public/app-angular'));

});

/**
 *
 * 命令：gulp babel
 * 作用：编译es6文件，生成es5文件
 *
 */
gulp.task('babel', function() {

  return gulp.src('./src/app-angular/**/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./public/app-angular'));

});

/**
 *
 * 命令：gulp compile
 * 作用：编译sass, jade, es6文件
 *
 */
gulp.task('compile', gulpsync.sync(['clean:code', 'jade', 'sass', 'babel']));
