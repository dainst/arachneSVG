var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var pkg = require('./package.json');

var paths = {
    'build': 'dist/'
};

gulp.task('concat-js', function(){
    return gulp.src([

    ])
        .pipe(concat(pkg.name + '.js'))
        .pipe(gulp.dest(path.build));
});

gulp.task('minify-js', ['concat-js'], function () {
    return gulp.src(paths.build + '/' + pkg.name + '.js')
        .pipe(uglify())
        .pipe(concat(pkg.name + '.min.js'))
        .pipe(gulp.dest(paths.build));
});

gulp.task('default', ['minify-js']);