var gulp= require('gulp')
var gulpLess= require('gulp-less')

gulp.task('styles', function () {
    return gulp.src(['source/aeMenu/styles/*.less'])
        .pipe(gulpLess())
        .pipe(gulp.dest('release/styles'))
    ;
})

gulp.task('watch', function () {
    gulp.watch(['source/aeMenu/styles/**/*.less'], ['styles'])
})

gulp.task('default', ['styles','watch'])
