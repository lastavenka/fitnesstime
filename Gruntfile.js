module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            style: {
                files: {
                    "build/css/style.css": ["source/less/style.less"]
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ["last 2 version", "ie 10"]
            },
            style: {
                src: "build/css/style.css"
            }
        },

        cmq: {
            style: {
                files: {
                    "build/css/style.css": ["build/css/style.css"]
                }
            }
        },

        cssmin: {
            style: {
                options: {
                    keepSpecialComments: 0,
                    report: "gzip"
                },
                files: {
                    "build/css/style.min.css": ["build/css/style.css"]
                }
            }
        },

        csscomb: {
            style: {
                expand: true,
                src: ["less/**/*.less"]
            }
        },

        imagemin: {
            images: {
                options: {
                    optimizationLevel: 3,
                },
                files: [{
                    expand: true,
                    src: ["build/img/**/*.{png,jpg,gif,svg}"]
          }]
            }
        },

        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                }, {
                        removeUselessStrokeAndFill: false
                }
            ]
            },
            files: {
                expand: true,
                src: ["source/img/**/*.svg"]
            }
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: "source",
                    src: [
                  "img/*.*",
                  "js/**",
                  "index.html",
                  "bower_components"
              ],
                    dest: "build"
          }]
            },

            buildHTML: {
                files: [{
                    expand: true,
                    cwd: "source",
                    src: [
                  "index.html"
                ],
                    dest: "build"
            }]
            }
        },

        clean: {
            build: ["build"]
        },

        svgstore: {
            options: {
                includeTitleElement: false,
                svg: {
                    style: "display:none",
                },
                cleanup: [
                  "fill",
                ],
            },
            default: {
                files: {
                    "source/img/sprite.svg": ["source/img/icons/*.svg"],
                },
            },
        },

        sprite: {
            all: {
                src: "source/img/icons/*.png",
                retinaSrcFilter: "source/img/icons/*@2x.png",
                dest: "source/img/sprite.png",
                retinaDest: "source/img/sprite@2x.png",
                destCss: "source/less/sprite.less"
            }
        },

        uglify: {
            start: {
                files: {
                    "build/js/script.min.js": ["source/js/script.js"]
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },

            scripts: {
                files: ["source/js/script.js"],
                tasks: ["uglify"],
                options: {
                    spawn: false
                },
            },

            less: {
                files: ["source/less/**/*.less"],
                tasks: ["less"],
                options: {
                    spawn: false
                },
            },

            imgSVG: {
                files: ["source/img/icons/*.svg"],
                tasks: ["svgstore"],
                options: {
                    spawn: false
                },
            },

            html: {
                files: ["source/index.html"],
                tasks: ["copy:buildHTML"],
                options: {
                    spawn: false
                },
            },

            imgPNG: {
                files: [
                      "source/img/icons/*.png"
                    ],
                tasks: ["sprite"],
                options: {
                    spawn: false
                },
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask("build", [
        "svgmin",
        "svgstore",
        "sprite",
        "clean",
        "copy",
        "less",
        "uglify",
        "autoprefixer",
        "cmq",
        "csscomb",
        "cssmin",
        "imagemin"
    ]);
    grunt.loadNpmTasks("grunt-contrib-watch");

};