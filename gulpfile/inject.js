const gulp = require('gulp');
const inject = require('gulp-inject');

/**
 *
 * 命令：gulp inject:dev
 * 作用：开发环境css, js代码文件路径注入
 *
 */
gulp.task('inject:dev', ['compile'], function() {

  let cssFiles = getCssFiles(['./public/app-angular/**/*.css']);
  let jsFiles = getJsFiles(['./public/app-angular/**/*.js']);
  return getPipeStream(cssFiles, jsFiles);

});

/**
 *
 * 命令：gulp inject:pro
 * 作用：产品环境css, js代码文件路径注入
 *
 */
gulp.task('inject:pro', function() {

  let cssFiles = getCssFiles(['./public/dist/**/*.css']);
  let jsFiles = getJsFiles(['./public/dist/**/*.js']);
  return getPipeStream(cssFiles, jsFiles);

});

/**
 * Gets the pipe stream.
 *
 * @param      {Array}  cssFiles  The css files
 * @param      {Array}  jsFiles   The js files
 * @return     {fileStream}  The pipe stream.
 */
function getPipeStream(cssFiles, jsFiles) {

  let target = gulp.src('./public/app-angular/self/views/app.client.view.html');

  let sources = gulp.src(cssFiles.concat(jsFiles), { read: false });
  let options = {
    transform: function (filepath) {
      if (filepath.substr(0, 7) === '/public') {
        filepath = filepath.substr(7);
      }
      // Use the default transform as fallback:
      return inject.transform.apply(inject.transform, arguments);
    }
  };

  return target.pipe(inject(sources, options))
    .pipe(gulp.dest('./public/app-angular/self/views/'));

}

/**
 * Gets the css files.
 *
 * @param      {Array}  customCssFiles  The custom css files
 * @return     {Array}   The css files.
 */
function getCssFiles(customCssFiles) {

  let cssFiles = [

  ];

  cssFiles = cssFiles.concat(customCssFiles);

  return cssFiles;

}

/**
 * Gets the js files.
 *
 * @param      {Array}  customJsFiles  The custom js files
 * @return     {Array}   The js files.
 */
function getJsFiles(customJsFiles) {

  let jsFiles = [
    './public/bower_components/angular/angular.min.js',
    './public/bower_components/angular-resource/angular-resource.min.js',
    './public/bower_components/angular-ui-router/release/angular-ui-router.min.js'

  ];

  jsFiles = jsFiles.concat(customJsFiles);

  return jsFiles;

}
