const { src, dest, series } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");

const buildHtml = () => {
  return src("./*.html").pipe(dest("./dist/"));
};

const buildJs = () => {
  return src("./js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("../js"))
    .pipe(dest("dist/js/"));
};

const buildCss = () => {
  return src("./sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("dist/css/"));
};

exports.buildCss = buildCss;
exports.buildJs = buildJs;

exports.buildAll = series(buildHtml, buildCss, buildJs);
