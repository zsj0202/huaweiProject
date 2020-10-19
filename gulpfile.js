var { src , dest , series , parallel , watch } = require('gulp');
var clean = require('gulp-clean');
var fileInclude = require('gulp-file-include');
var webserver = require('gulp-webserver');

function cleanTask(){
    return src('./dist' , {allowEmpty : true})
            .pipe( clean() );
}

function fileIncludeTask(){
    return src('./src/view/*.html')
            .pipe(fileInclude({
                prefix : '@',
                basepath : './src/view/templates'
            }))
            .pipe(dest('./dist/view'));
}

function webserverTask(){
    return src('./dist')
            .pipe( webserver({
                host : 'localhost',
                port : 4000,
                open : './view/index.html',
                livereload : true
            }));
}

function watchTask(){   //监听文件变化，同步到dist文件下
    watch('./src/view/**' , fileIncludeTask);
    // watch('./src/css/**' , sassTask);
    // watch('./src/static/**' , staticTask);
    // watch('./src/lib/**' , libTask);
    // watch('./src/api/**' , apiTask);
    // watch('./src/js/**' , jsTask);
}
module.exports = {
    dev : series( cleanTask , fileIncludeTask , parallel(webserverTask , watchTask)),
    build : series( cleanTask )
};