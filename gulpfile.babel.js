/**
 * Created by coffee on 2016/2/11.
 */

import gulp from "gulp";
import babel from "gulp-babel";
import sourcemaps from 'gulp-sourcemaps';
import plumber from "gulp-plumber";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import less from "gulp-less";


gulp.task("es2015", function(){
    return gulp.src("src/**/*.js")
        .pipe( sourcemaps.init() )
        .pipe(plumber())
        .pipe(babel())
        //.pipe(uglify())
        //.pipe( sourcemaps.write('./maps'))
        .pipe( gulp.dest('dist/') );
});

gulp.task("less", function () {
    return gulp.src("src/**/*.less")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(less().on('error', function(err){
            console.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest("dist/"))
});


gulp.task("watch", function(){
    gulp.watch("src/**/*.js", ["es2015"]);
    gulp.watch("src/**/*.less", ["less"]);
});

gulp.task("default", ["less", "es2015", "watch"]);