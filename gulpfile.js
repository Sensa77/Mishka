const { src, dest, parallel, series, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const del = require("del");
const csso = require("gulp-csso");
const uglify = require("gulp-uglify-es").default;

function browsersync() {
  browserSync.init({
    server: { baseDir: "app/" },
    notify: false,
    online: true,
  });
}

exports.browsersync = browsersync;

function scripts() {
  return src(["node_modules/jquery/dist/jquery.min.js", "app/js/app.js"])
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js/"))
    .pipe(browserSync.stream());
}

exports.scripts = scripts;

function styles() {
  return src("app/scss/style.scss")
    .pipe(sass())
    .pipe(concat("app.min.css"))
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    )
    .pipe(csso())
    .pipe(dest("app/css/"))
    .pipe(browserSync.stream());
}

exports.styles = styles;

function images() {
  return src("app/images/src/**/*")
    .pipe(newer("app/images/dest/"))
    .pipe(imagemin())
    .pipe(dest("app/images/dest/"));
}

exports.images = images;

function cleanimg() {
  return del("app/images/dest/**/*", { force: true });
}

exports.cleanimg = cleanimg;

function buildcopy() {
  return src(
    [
      "app/css/**/*.min.css",
      "app/js/**/*.min.js",
      "app/images/dest/**/*",
      "app/**/*.html",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}

exports.build = series(styles, scripts, images, buildcopy);

function cleandist() {
  return del("dist/**/*", { force: true });
}

exports.build = series(cleandist, styles, scripts, images, buildcopy);

function startwatch() {
  watch(["app/**/*.js", "!app/**/*.min.js"], scripts);
  watch("app/scss/**/*.scss", styles);
  watch("app/**/*.html").on("change", browserSync.reload);
  watch("app/images/src/**/*", images);
}

exports.default = parallel(styles, scripts, browsersync, startwatch);
