module.exports = function(grunt){
    grunt.initConfig({
        watch: {
            css:{
                files: ['src/css/*.scss'],
                tasks: ['css']
            }
        },
        sass: {
            dist: {
                options:{
                    unixNewlines:true,
                    update:true,
                    style:'compact'
                },
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.scss'],
                    dest: 'dist',
                    ext: '.css'
                }]
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('css', ['sass:dist']);

};