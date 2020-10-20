var { src , dest , series , parallel , watch } = require('gulp');
var clean = require('gulp-clean');
var fileInclude = require('gulp-file-include');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

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
                port : 5000,
                open : './view/index.html',
                livereload : true
            }));
}

function sassTask(){
    return src('./src/css/*.scss')
            .pipe(sass())
            .pipe(dest('./dist/css'));
}

function staticTask(){
    return src('./src/static/**')
            .pipe(dest('./dist/static'));
}

function libTask(){
    return src('./src/lib/**')
            .pipe(dest('./dist/lib'));
}

function apiTask(){
    return src('./src/api/**')
            .pipe(dest('./dist/api'));
}

function jsTask(){
    return src('./src/js/**')
            .pipe(dest('./dist/js'));
}

function watchTask(){   //监听文件变化，同步到dist文件下
    watch('./src/view/**' , fileIncludeTask);
    watch('./src/css/**' , sassTask);
    watch('./src/static/**' , staticTask);
    watch('./src/lib/**' , libTask);
    watch('./src/api/**' , apiTask);
    watch('./src/js/**' , jsTask);
}
module.exports = {
    dev : series( cleanTask , parallel(fileIncludeTask , sassTask , staticTask , libTask , apiTask , jsTask) , parallel(webserverTask , watchTask)),
    build : series( cleanTask )
};