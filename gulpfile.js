var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    svgSprite = require('gulp-svg-sprite'),
    postcss = require('gulp-postcss');


//
//   CSS
//
//////////////////////////////////////////////////////////////////////

gulp.task('css', function () {
  var processors = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano(),
  ];
  return gulp.src('./source/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream({match: '**/*.*.css'}));
});

gulp.task('copy-html', function () {
  gulp.src('./source/html/*.html')
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('copy-img', function () {
  gulp.src('./source/img/*.png')
    .pipe(gulp.dest('./public/img/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

//
//   ES lint
//
//////////////////////////////////////////////////////////////////////

gulp.task('lint', function() {
  return gulp.src('./source/js/app.js')
    .pipe(eslint({
      rules: {
        'quotes': 0,
        'no-multi-spaces': [
          1, {
            'exceptions': {
              'VariableDeclarator': true
            }
          }
        ]
      },
      globals: [
        'jQuery',
        '$'
      ],
      envs: [
        'browser'
      ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


//
//   Javascript
//
//////////////////////////////////////////////////////////////////////

gulp.task('js', function(){
  return gulp.src([
      './source/js/vendor.js',
      './source/js/app.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});


//
//   SVG Sprites
//
//////////////////////////////////////////////////////////////////////

var svgSpriteConfig = {
  // Compile a single `icons.svg` file, with each icon asset included as a
  // <symbol> therein.
  mode: {
    symbol: {
      dest: '',
      sprite: 'icons.svg'
    }
  },

  shape: {
    // Include titles and descriptions from this file.
    meta: './source/icons/_icons.yml',
    // Prepend `icon--` to ID names to avoid conflicts if polyfill injects sprite
    // directly into the document.
    id: {
      generator: 'icon--%s'
    }
  }
};

gulp.task('icons', function () {
  return gulp.src('./source/icons/**/*.svg')
    .pipe(svgSprite(svgSpriteConfig))
    .pipe(gulp.dest('./public/img/'));
});


//
//   Browser Sync
//
//////////////////////////////////////////////////////////////////////

gulp.task('browser-sync', function() {
    // Documentaion on browser sync is at: browsersync.io
    // It's really rad.
    browserSync.init(null, {
        "proxy": "sethandbrenda.com",
        "ghostMode": {
          "clicks": false,
          "scroll": false,
          "forms": {
              "submit": false,
              "inputs": false,
              "toggles": false
          }
        },
        "notify": false
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});


//
//   Default Tasks
//
//////////////////////////////////////////////////////////////////////

gulp.task('default', ['css', 'copy-html', 'copy-img', 'browser-sync'], function () {
    gulp.watch("./source/scss/**/*", ['css']);
    gulp.watch("./source/html/*.html", ['copy-html']);
});


//
//   Error Handling
//
//////////////////////////////////////////////////////////////////////

function handleError (error) {
  //If you want details of the error in the console
  console.log('WARNING!', error.message.toString());
  this.emit('end');
}
