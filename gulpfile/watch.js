const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jade = require('jade');
const gulpJade = require('gulp-jade');
const gutil = require('gutil');
const server = require('gulp-develop-server');
const gulpsync = require('gulp-sync')(gulp);
const babel = require('gulp-babel');
const colors = require('colors');

/**
 *
 * 命令：gulp fe
 * 作用：前端开发者开发时直接运行的命令
 *
 */
gulp.task('fe', gulpsync.sync(['inject:dev', 'server', 'browser']), function() {

  gulp.watch(['./src/app-angular/**/*.*'], function(event) {

    let filetype = getFileType(event.path);
    console.log(colors.green('File ' + event.type + ': ' + event.path));

    if (event.type == 'changed') {
      compileFile(filetype, event.path);
    } else {
      gulp.start(['inject:dev'], reloadBrowser);
    }

  });

});

/**
 *
 * 命令：gulp se
 * 作用：服务端开发者开发时直接运行的命令
 *
 */
// gulp.task('se', gulpsync.sync(['lint:se', 'server']), function() {
gulp.task('se', gulpsync.sync(['server']), function() {

  gulp.watch(['src/app-express/**/*.*'], function(event) {

    console.log(colors.green('File ' + event.type + ': ' + event.path));
    console.log(colors.green('Now rerun the server...'));
    gulp.start([], rerunServer);

  });

});

/**
 *
 * 命令：gulp browser
 * 作用：启动浏览器
 *
 */
gulp.task('browser', function() {

  browserSync.init({
    proxy: 'http://localhost:3002'
  });

});

/**
 *
 * 命令：gulp server
 * 作用：运行服务端nodejs服务
 *
 */
gulp.task('server', function() {

  // gulp.src(['./src/app-express/server.js'])
  //   .pipe(nodeInspector());
  server.listen({
    path: './src/app-express/server.js'
  });

});

/**
 *
 * 刷新浏览器
 *
 */
function reloadBrowser() {

  setTimeout(browserSync.reload, 0);

}

/**
 * 重新运行nodejs进程
 */
function rerunServer() {

  setTimeout(server.restart, 0);

}

/**
 * 根据路径取得文件类型(后缀名)
 *
 * @param      {String}  path    The path
 * @return     {String}  The file type.
 */
function getFileType(path) {

  return path.substr(path.lastIndexOf('.') + 1);

}

/**
 * Gets the file path.
 *
 * @param      {String}  path    The file path
 * @return     {String}  The file path.
 */
function getFilePath(path) {

  let slash = '/';
  let key = slash + 'app-angular';

  let result = './public' + path.substring(path.indexOf(key), path.lastIndexOf(slash));

  return result;

}

/**
 * 根据不同的文件类型执行不同的编译命令
 *
 * @param      {String}  type    The type
 * @param      {String}  path    The path
 * @return     {fileStream}  返回文件流
 */
function compileFile(type, path) {

  switch (type) {

    case 'js': return gulp.start([], function() {
      reloadBrowser();
      compileEs6(path);
    });
    case 'sass': reloadBrowser(); return compileSass(path);
    case 'jade': reloadBrowser(); return compileJade(path);

  }

}

/**
 * 转译ES6文件为ES5文件
 *
 * @param      {String}  path    路径
 * @return     {fileStream}  返回文件流
 */
function compileEs6(path) {

  return gulp.src(path)
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest(getFilePath(path)));

}

/**
 * 编译Sass文件为CSS文件
 *
 * @param      {String}  path    The path
 * @return     {fileStream}  返回文件流
 */
function compileSass(path) {

  return gulp.src(path)
    .pipe(sass({ outputStyle: 'expanded' })
    .on('error', sass.logError))
    .pipe(gulp.dest(getFilePath(path)));

}

/**
 * 编译Jade文件为HTML文件
 *
 * @param      {String}  path    The path
 * @return     {fileStream}  返回文件流
 */
function compileJade(path) {

  return gulp.src(path)
    .pipe(gulpJade({ jade, pretty: true }))
    .pipe(gulp.dest(getFilePath(path)));

}
