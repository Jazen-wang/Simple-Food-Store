const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const gutil = require('gutil');
const server = require('gulp-develop-server');
const gulpsync = require('gulp-sync')(gulp);
const colors = require('colors');

/**
 *
 * 命令：gulp fe
 * 作用：前端开发者开发时直接运行的命令
 *
 */
gulp.task('fe', gulpsync.sync(['server', 'browser']), function() {

  gulp.watch(['./views/**/*.*', './public/**/*.*'], reloadBrowser);

});

/**
 *
 * 命令：gulp se
 * 作用：服务端开发者开发时直接运行的命令
 *
 */
// gulp.task('se', gulpsync.sync(['lint:se', 'server']), function() {
gulp.task('se', gulpsync.sync(['server']), function() {

  // gulp.watch(['src/app-express/**/*.*'], function(event) {
  //
  //   console.log(colors.green('File ' + event.type + ': ' + event.path));
  //   console.log(colors.green('Now rerun the server...'));
  //   gulp.start([], rerunServer);

  // });

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

gulp.task('server', function() {

  server.listen({
    path: './bin/www'
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
