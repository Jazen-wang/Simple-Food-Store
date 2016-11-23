/**
 *
 * gulpfile文件，执行gulp-config里面的所有配置文件
 *
 */
require('./gulpfile/clean.js');
require('./gulpfile/compile.js');
require('./gulpfile/inject.js');
// require('./gulpfile/minify.js');
// require('./gulpfile/build.js');
require('./gulpfile/watch.js');
