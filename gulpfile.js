//Gulpfile for Lab 3.2

//Variables
const gulp      = require("gulp");
const concat    = require("gulp-concat");
const uglify    = require("gulp-uglify");
//const cleanCss  = require("gulp-clean-css");
const imagemin  = require("gulp-imagemin");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");


/* Move to pub HTML */
gulp.task("copyhtml", function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("pub/"));
});

/* Move to pub Fonts */
gulp.task("copyFonts", function() {
    return gulp.src("src/font/*.ttf")
        .pipe(gulp.dest("pub/font/"));
});

/* Sass conversion till CSS */
gulp.task("scss", function(){
    return gulp.src("src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(concat("main.min.css"))
        .pipe(gulp.dest("pub/css"));
});

/* Concat and minify Javascriptfiles */
gulp.task("concatminifyjs", function() {
    return gulp.src("src/js/*.js")
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("pub/js"));
});

/* Minify och move images */

gulp.task("imagemin", function () {
    gulp.src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest('pub/images'));
});

/* Check for updates among the files */
gulp.task("watcher", function(){
    gulp.watch("src/*html", ['copyhtml']);
    gulp.watch("src/font/*.tff", ['copyFonts']);
    gulp.watch("src/scss/*.scss", ['scss']);
    //gulp.watch("src/css/*.css", ['cleanCss']);
    gulp.watch("src/js/*.js", ['concatminifyjs']);
    gulp.watch("src/images/*", ['imagemin']);
});

//Call tasks in the default task with array
gulp.task("default", ["copyhtml", "copyFonts", "scss", "concatminifyjs", "imagemin", "watcher"]);