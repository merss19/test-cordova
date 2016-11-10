var gulp          = require('gulp'),
    browserSync   = require('browser-sync').create(),
    util          = require('gulp-util'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    svgsprites    = require('gulp-svg-sprite'),
    sourcemaps    = require('gulp-sourcemaps'),
    concat        = require('gulp-concat'),
    order         = require('gulp-order');

var theme = './';
// for WP
// var theme = './wp-content/themes/teampapertheme';

var path = {
  src: {
    sass: theme + 'src/assets/sass',
    svg: theme + 'src/assets/img',
    img: theme + 'src/assets/img',
    js: theme + 'src/assets/js'
  },
  dest: {
    css: theme + 'public/assets/css',
    img: theme + 'public/assets/img',
    js: theme + 'public/assets/js'
  }
};

gulp.task('build:sass', function () {
  gulp.src(path.src.sass + '/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(sourcemaps.write('./map'))
  .pipe(gulp.dest(path.dest.css))
  .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('build:js', function () {
  gulp.src(path.src.js + '/main.js')
  .pipe(gulp.dest(path.dest.js))
});

gulp.task('build:js:libs', function () {
  gulp.src(path.src.js + '/libs/**/*.js')
  .pipe(order([
      'modernizr.js',
      'svg-injector.min.js',
      'tingle.js'
    ]))
  .pipe(concat('libs.js'))
  .pipe(gulp.dest(path.dest.js))
  .pipe(browserSync.stream({match: 'js/*.js'}));
});

gulp.task('build:symbol:svg', function() {
  gulp.src(path.src.svg + '/svg-symbols/**/*.svg')
    .pipe(svgsprites({
      shape: {
        dimension: {
          precision: 2
          // attributes: true
        }
      },
      mode: {
        symbol: {
          bust: false,
          dest: '../',
          sprite: 'img/symbol-sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest(path.dest.img));
});


// gulp.task('build:sprite:svg', function() {
//   gulp.src(path.src.svg + '/svg-sprite/**/*.svg')
//     .pipe(svgsprites({
//       shape: {
//         spacing: {
//           padding: 4
//         },
//         dimension: {
//           precision: 2
//         }
//       },
//       mode: {
//         css: {
//           prefix: '.css-',
//           dest: './dest',
//           sprite: 'css/sprite.svg',
//           dimensions: true,
//           bust: false,
//           render: {
//             css : { dest : 'css/sprite.css' },
//             scss: { dest: '../src/sass/_sprite.scss' }
//           }
//         },
//       }
//     }))
//     .pipe(gulp.dest('.'));
// });

gulp.task('build:img', function() {
  gulp.src([path.src.img + '/svg/**/*.svg', path.src.img + '/**/*.png'])
    .pipe(gulp.dest(path.dest.img));
});

gulp.task('build', [
  'build:img',
  'build:symbol:svg',
  // 'build:sprite:svg',s
  'build:sass',
  'build:js',
  'build:js:libs'
]);

gulp.task('server', ['build'], function() {
  gulp.watch(path.src.sass + '/**/*.scss', ['build:sass']);
  gulp.watch(path.src.js + '/**/*.js', ['build:js']).on('change', browserSync.reload);
  gulp.watch('**/*.html').on('change', browserSync.reload);
  
  // for layout
  // browserSync.init({ server: "./" });
  
  // Proxy
  browserSync.init({
    notify: false,
    proxy: 'http://localhost:3000/'
  });

});