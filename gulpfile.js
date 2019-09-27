const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const nunjucksRender = require('gulp-nunjucks-render');
const axios = require('axios');

var assets = {
  js: [
    'js/jquery-3.2.1.min.js',
    'js/jquery-migrate-3.0.0.min.js',
    'plugins/bootstrap/js/popper.min.js',
    'plugins/bootstrap/js/bootstrap.min.js',
    'js/custom.js'
  ]
};

var structure = {
  'index': [
    'index.html'
  ],
  'events': [
    'index.html'
  ],
  'schemas': [
    'index.html'
  ],
  'working-groups': [
    'identifiers-names-discovery.html',
    'storage-compute.html',
    'claims-credentials.html',
    'authentication.html'
  ]
};

const getRepos = async () => {
  try {
    const response = await axios.get('https://api.github.com/users/decentralized-identity/repos');
    const data = response.data;
    console.log(data);
    return data || {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

gulp.task('assets', function() {
  return gulp.src(assets.js)
    .pipe(uglify())
    .pipe(concat('base.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('templates', function() {
  return gulp.src('templates/pages/**/*.html')
    .pipe(nunjucksRender({
      path: ['templates', 'templates/partials', 'templates/pages']
      //data: await getRepos()
    }))
    .pipe(gulp.dest('.'))
});

gulp.task('build', ['assets', 'templates']);

gulp.task('watch', () => gulp.watch(['templates/**/*', 'js/**/*', '!js/base.js'], ['build']));