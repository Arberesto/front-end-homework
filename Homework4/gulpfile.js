'use strict';
 
// Подключение плагинов
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    copy = require('gulp-contrib-copy'),
    concat = require('gulp-concat'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

 
// Пути для сборки
var path = {
    css: './src/**/*.css',
    html: {
     pages: "./src/pages/**/*.hbs",
     components: "./src/components/**/*.hbs",
     componentsPath: "./src/components/"
    },
    images: "./src/**/images/*",
    build: {
        root: './build/**',
    	html: 'build/',
    	css: 'build/styles/',
    	images: './build/images/'
    },
    src: {
    	copy_html: 'src/templates/index.html',
    	css: 'src/**/*.css'
    },
    watch: {
    	watch_html: "*.html",
    	watch_css: "styles.css"
    },
    clean: ['build']
};
 
// Очистка папок и файлов
gulp.task('clean', function() {
    return gulp.src(path.clean, {read: false})
        .pipe(clean());
});

gulp.task('html', function() {
    return gulp.src(path.html.pages)
    .pipe(handlebars({}, {
    	ignorePartials: true,
    	batch: path.html.componentsPath
    }))
    .pipe(rename({
        dirname: ".",
        extname: ".html"
    }))
    .pipe(gulp.dest(path.build.html));
});

gulp.task('css', function() {
    return gulp.src(path.css)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('images', function() {
    return gulp.src(path.images)
    .pipe(rename({
     dirname: "."
     }))
     .pipe(gulp.dest(path.build.images));
});

gulp.task('prod', ['html', 'css', 'images']);

gulp.task('watch', function() {
   gulp.watch(path.html.pages,['html']);
   gulp.watch(path.html.components,['html']);
   gulp.watch(path.css,['css']);
   gulp.watch(path.images,['images']);
});

gulp.task('hotReload', function () {
    browserSync.init({
     server: {
      baseDir: path.build.html
     }
    });
    gulp.watch(path.build.root, browserSync.reload);  
});

gulp.task('default', ['html', 'css', 'images','watch', 'hotReload']);
