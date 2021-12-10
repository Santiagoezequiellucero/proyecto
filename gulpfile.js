const { src, dest, watch, series} = require('gulp');

//compilar css
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

//Imagemin
const imagemin = require('gulp-imagemin');

function css ( done ){
    
    src('src/scss/app.scss')//identificar el archivo de origen
        .pipe(sass())// Compilar SASS
        .pipe(dest('build/css'))//Exportarlo o guardarlo en una ubicación

     done();
}
function cssbuild (done){
    src('build/css/app.css')
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe(purgecss({
            content: ['index.html']
        }))
        .pipe( dest('build/css'))
            
    done();
}

function dev (){
    watch('src/scss/**/*.scss', css);
}

function imagenes ( done ){
    
    src('src/img/**/*')//identificar el archivo de origen
        .pipe(imagemin({optimizationLevel: 3}))// Compilar SASS
        .pipe(dest('build/img'))//Exportarlo o guardarlo en una ubicación

     done();
}
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);
exports.build = series(cssbuild);