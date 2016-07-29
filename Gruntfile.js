module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            build: ['build']
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'src/sass',
                    src: ['*.scss'],
                    dest: 'build/assets/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            ui: {
                files: 'src/app/**',
                tasks: ['copy:ui']
            },
            css: {
                files: 'src/sass/**',
                tasks: ['sass']
            },
            publicAssets: {
                files: 'src/public_assets/**',
                tasks: ['copy:publicAssets']
            },
            html: {
                files: 'src/*.html',
                tasks: ['copy:html']
            },
            options: {
                livereload: true
            }
        },
        copy: {
            ui: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/app',
                        src: ['**'],
                        dest: 'build/assets/js/app'
                    }
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['*.html'],
                        dest: '.'
                    }
                ]
            },
            publicAssets: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/public_assets',
                        src: ['**'],
                        dest: 'build/assets/'
                    }
                ]
            }
        },
        connect: {
            webserver: {
                options: {
                    port: grunt.option('port') | 8400,
                    base: '.',
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'sass', 'copy', 'connect:webserver', 'watch']);
};
