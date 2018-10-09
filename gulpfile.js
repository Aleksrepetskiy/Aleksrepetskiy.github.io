const gulp            = require('gulp');
const pug             = require('gulp-pug');
const del             = require('del');
const browserSync     = require('browser-sync').create();

//styles
const sass            = require('gulp-sass');
const rename          = require('gulp-rename');
const autoprefixer    = require('gulp-autoprefixer');
const sourcemaps      = require('gulp-sourcemaps');

//scripts
const gulpWebpack     = require('gulp-webpack');
const webpack         = require('webpack');
const webpackConfig   = require('./webpack.config.js');

//svg
const svgSprite       = require('gulp-svg-sprite');
const svgmin          = require('gulp-svgmin');
const cheerio         = require('gulp-cheerio');
const replace         = require('gulp-cheerio');

const paths = {
    root: './build',
    templates: {
        pages: 'app/templates/pages/*.pug',
        src: 'app/templates/**/*.pug',
        dest: 'build/'
    },
    styles: {
        src: 'app/styles/**/*.scss',
        dest: 'build/styles/'
    },
    images: {
        src: 'app/images/**/*.*',
        dest: 'build/images/'
    },
    scripts: {
        src: 'app/js/**/*.js',
        dest: 'build/js/'
    },
    fonts: {
        src: 'app/fonts/**/*.*',
        dest: 'build/fonts/'
    },
    svg: {
        src: 'app/images/icons/*.svg',
        dest: 'build/images/icons/'
    },
}

const config = {
  mode: {
    symbol: {
      sprite: "../sprite.svg",
      example: {
        dest: '../tmp/spriteSvgDemo.html' // демо html
      }
    }
  }
};

//pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty:true}))
        .pipe(gulp.dest(paths.root));
}
//scss
function styles() {
    return gulp.src('./app/styles/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(rename({suffix: '-min'}))
        .pipe(gulp.dest(paths.styles.dest));
}
//img
function images(){
    return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}
//fonts
function fonts(){
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}
//clear
function clean() {
    return del(paths.root)
}
//webpack
function scripts() {
    return gulp.src('./app/js/script.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}
//svg
function svg() {
    return gulp.src(paths.svg.src)
     // минифицируем svg
     .pipe(svgmin({ js2svg: { pretty: true}}))
     // удалить все атрибуты fill, style and stroke в фигурах
     .pipe(cheerio({ run: function($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
      },
          parserOptions: {
            xmlMode: true
          }
    }))
    // cheerio плагин заменит, если появилась, скобка '&gt;', на нормальную.
   .pipe(replace('&gt;', '>'))
   // build svg sprite
   .pipe(svgSprite(config))
   .pipe(gulp.dest(paths.svg.dest));
}
//watcher src
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.fonts.src, fonts);
}
//browserSync
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload );
}

exports.templates = templates;
exports.styles    = styles;
exports.clean     = clean;
exports.svg       = svg;

gulp.task('default', gulp.series(
    gulp.parallel(styles, templates, scripts, images, fonts, svg),
    gulp.parallel(watch, server)
));

gulp.task('build', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, fonts)
));
