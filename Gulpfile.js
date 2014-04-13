var gulp= require('gulp')

var gulpNgmin= require('gulp-ngmin')
var gulpUglify= require('gulp-uglify')
var gulpRename= require('gulp-rename')

var gulpLess= require('gulp-less')



gulp.task('scripts', function () {
    return gulp.src(['source/aeMenu/scripts/*.js'])
        .pipe(gulp.dest('release/scripts'))
        .pipe(gulpNgmin())
        .pipe(gulpUglify())
        .pipe(gulpRename({suffix: '.min'}))
        .pipe(gulp.dest('release/scripts'))
    ;
})

gulp.task('styles', function () {
    return gulp.src(['source/aeMenu/styles/*.less'])
        .pipe(gulpLess())
        .pipe(gulp.dest('release/styles'))
    ;
})



gulp.task('watch', function () {
    gulp.watch(['source/aeMenu/scripts/**/*.js'], ['scripts'])
    gulp.watch(['source/aeMenu/styles/**/*.less'], ['styles'])
})



gulp.task('default', ['scripts', 'styles','watch'])
