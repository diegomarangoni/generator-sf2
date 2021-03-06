// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'web',
            dist: 'dist/public'
        },

        // Symfony2 project settings
        symfony: {
            app: 'app',
            dist: 'dist/app',
            router: 'composer_packages/symfony/symfony/src/Symfony/Bundle/FrameworkBundle/Resources/config'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {<% if (coffee) { %>
            coffee: {
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}'],
                tasks: ['coffee:test', 'test:watch']
            },<% } else { %>
            js: {
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint', 'copy:js'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },<% } %>
            gruntfile: {
                files: ['Gruntfile.js']
            },
            compass: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            images: {
                files: ['<%%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'],
                tasks: ['copy:images']
            },
            livereload: {
                options: {
                    livereload: '<%%= php.options.livereload %>'
                },
                files: [
                    '<%%= symfony.app %>/Resources/views/{,*/}*.html.twig',
                    '.tmp/styles/{,*/}*.css',<% if (coffee) { %>
                    '.tmp/scripts/{,*/}*.js',<% } %>
                    '.tmp/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        // The actual grunt server settings
        php: {
            options: {
                port: 8000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    base: '.tmp',
                    router: '../<%%= symfony.router %>/router_dev.php',
                    open: true
                }
            },
            test: {
                options: {
                    base: '.tmp',
                    router: '../<%%= symfony.router %>/router_dev.php',
                    open: false
                }
            },
            dist: {
                options: {
                    base: '<%%= yeoman.dist %>',
                    router: '../../<%%= symfony.router %>/router_prod.php',
                    open: false
                }
            }
        },

        // Symfony2 commands
        console: {
            options: {},
            'cache-clear-dev': {
                command: 'cache:clear'
            },
            'cache-clear-test': {
                command: 'cache:clear --env=test'
            },
            'cache-clear-prod': {
                command: 'cache:clear --env=prod --no-debug'
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

<% if (testFramework === 'mocha') { %>
        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%%= php.options.hostname %>:<%%= php.options.port %>/test/index.html']
                }
            }
        },<% } else if (testFramework === 'jasmine') { %>
        // Jasmine testing framework configuration options
        jasmine: {
            all: {
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        },<% } %>

<% if (coffee) { %>
        // Compiles CoffeeScript to JavaScript
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/scripts',
                    src: '{,*/}*.{coffee,litcoffee,coffee.md}',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.{coffee,litcoffee,coffee.md}',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },<% } %>

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%%= yeoman.app %>/images',
                javascriptsDir: '<%%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/styles/fonts',
                importPath: 'bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        'bower-install': {
            app: {
                html: '<%%= symfony.app %>/Resources/views/base.html.twig',
                ignorePath: '<%%= yeoman.app %>/'
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
                        '<%%= yeoman.dist %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>'
            },
            html: '<%%= symfony.app %>/Resources/views/{,*/}*.html.twig'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= symfony.dist %>/Resources/views/{,*/}*.html.twig'],
            css: ['<%%= yeoman.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {},
                files: [{
                    expand: true,
                    cwd: '<%%= symfony.app %>',
                    src: 'Resources/views/{,*/}*.html.twig',
                    dest: '<%%= symfony.dist %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%%= yeoman.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%%= yeoman.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%%= yeoman.dist %>/scripts/scripts.js': [
        //                 '<%%= yeoman.dist %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        'app.php',
                        '*.{ico,png,txt}',
                        'images/{,*/}*.webp',
                        'styles/fonts/{,*/}*.*'<% if (compassBootstrap) { %>,
                        'bower_components/sass-bootstrap/fonts/*.*'<% } %>
                    ]
                }]
            },
            dev: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%%= yeoman.app %>',
                        dest: '.tmp/',
                        src: [
                            'app_dev.php',
                            'config.php',
                            '*.{ico,png,txt}',
                            'styles/fonts/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%%= yeoman.app %>/bundles',
                        dest: '.tmp/bundles/',
                        src: [
                            '**/*.*'
                        ]
                    }
                ]
            },
            test: {
                expand: true,
                dot: true,
                cwd: 'test',
                dest: '.tmp/test/',
                src: '**/*.*'
            },
            'bower-components': {
                expand: true,
                dot: true,
                cwd: 'bower_components',
                dest: '.tmp/bower_components/',
                src: '**/*.*'
            },
            js: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/scripts',
                dest: '.tmp/scripts/',
                src: '{,*/}*.js'
            },
            images: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/images',
                dest: '.tmp/images/',
                src: '{,*/}*.{gif,jpeg,jpg,png,webp}'
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

<% if (includeModernizr) { %>
        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            devFile: 'bower_components/modernizr/modernizr.js',
            outputFile: '<%%= yeoman.dist %>/scripts/vendor/modernizr.js',
            files: [
                '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                '<%%= yeoman.dist %>/styles/{,*/}*.css',
                '!<%%= yeoman.dist %>/scripts/vendor/*'
            ],
            uglify: true
        },<% } %>

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'compass:server',<% if (coffee) { %>
                'coffee:dist',<% } %>
                'copy:bower-components',
                'copy:test',
                'copy:dev',
                'copy:js',
                'copy:images',
                'copy:styles'
            ],
            test: [<% if (coffee) { %>
                'coffee',<% } %>
                'copy:bower-components',
                'copy:test',
                'copy:dev',
                'copy:js',
                'copy:images',
                'copy:styles'
            ],
            dist: [<% if (coffee) { %>
                'coffee',<% } %>
                'compass',
                'copy:bower-components',
                'copy:js',
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'php:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'console:cache-clear-dev',
            'php:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', function(target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer',
                'console:cache-clear-test',
            ]);
        }

        grunt.task.run([
            'php:test',<% if (testFramework === 'mocha') { %>
            'mocha'<% } else if (testFramework === 'jasmine') { %>
            'jasmine'<% } %>
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',<% if (includeModernizr) { %>
        'modernizr',<% } %>
        'rev',
        'usemin',
        'console:cache-clear-prod'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
