const gulp = require('gulp');
const gulpJade = require('gulp-jade');
const sass = require('gulp-sass');
const jade = require('jade');
const gutil = require('gutil');
const gulpsync = require('gulp-sync')(gulp);


/**
 *
 * 命令：gulp jade
 * 作用：编译jade文件，生成html
 *
 */
gulp.task('jade', function() {

  return gulp.src('./views/**/*.jade')
    .pipe(gulpJade({ jade, pretty: true }))
    .pipe(gulp.dest('./public/views'));

});

/**
 *
 * 命令：gulp sass
 * 作用：编译sass文件，生成css文件
 *
 */
gulp.task('sass', function() {

  return gulp.src('./stylesheets/**/*.sass')
    .pipe(sass({ outputStyle: 'expanded' })
    .on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));

});


/**
 *
 * 命令：gulp compile
 * 作用：编译sass, jade, es6文件
 *
 */
gulp.task('compile', gulpsync.sync(['clean:code', 'jade', 'sass']));
