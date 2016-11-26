const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);
const del = require('del');

/**
 *
 * 命令：gulp clean
 * 作用：删除日志文件、编译过的开发性代码文件、产品代码文件、所有文档
 *
 */
gulp.task('clean', gulpsync.async(['clean:log']));

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
 *
 */
gulp.task('clean:code', function() {


});
