const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);
const del = require('del');

/**
 *
 * 命令：gulp clean
 * 作用：删除日志文件、编译过的开发性代码文件、产品代码文件、所有文档
 *
 */
gulp.task('clean', gulpsync.async(['clean:log', 'clean:code', 'clean:docs']));

/**
 *
 * 命令：gulp clean:log
 * 作用：删除当前目录下.log后缀的文件
 *
 */
gulp.task('clean:log', function() {

  return del(['./*.log']);

});

/**
 *
 * 命令：gulp clean:code
 * 作用：删除compile过后的./app-angular和./app-express文件夹下面的所有文件
 *
 */
gulp.task('clean:code', function() {

  return del(['./public/app-angular/', './public/dist/']);

});

/**
 *
 * 命令：gulp clean:docs
 * 作用：删除所有文档（api，前端，服务端，gulpfile配置文档）
 *
 */
gulp.task('clean:docs', gulpsync.sync(['clean:docs:api',
  'clean:docs:fe', 'clean:docs:se', 'clean:docs:gulp']));

/**
 *
 * 命令：gulp clean:docs:api
 * 作用：删除api文档
 *
 */
gulp.task('clean:docs:api', function() {

  return del(['./docs/api']);

});

/**
 *
 * 命令：gulp clean:docs:fe
 * 作用：删除前端文档
 *
 */
gulp.task('clean:docs:fe', function() {

  return del(['./docs/fe']);

});

/**
 *
 * 命令：gulp clean:docs:se
 * 作用：删除服务端文档
 *
 */
gulp.task('clean:docs:se', function() {

  return del(['./docs/se']);

});

/**
 *
 * 命令：gulp clean:docs:gulp
 * 作用：删除gulpfile配置说明文档
 *
 */
gulp.task('clean:docs:gulp', function() {

  return del(['./docs/gulp']);

});

/**
 * 命令：gulp clean:uploads
 * 作用：删除本地调试时候保存的上传文件
 */
gulp.task('clean:uploads', function() {
  return del(['!./uploads/.gitkeep', './uploads/*']);
});
