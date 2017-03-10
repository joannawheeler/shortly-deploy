module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/client/*.js'],
        dest: 'public/dist/shortly-deploy.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'public/dist/shortly-deploy.min.js': ['public/dist/shortly-deploy.js']
        }
      }
    },

    eslint: {
      // options: {
      //   config:'eslint-config-hackreactor',
      //   reset: true
      // },
      target: [
        // Add list of files to lint here
        'public/client/*.js', 'app/**/*.js', 'server-config.js', 'server.js'
      ]
    },

    cssmin: {
      target: {
        files: {
          'public/dist/style.min.css': ['public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('push', ['shell:prodServer']);
  grunt.registerTask('concatIt', ['concat']);
  grunt.registerTask('uglifyJS', ['uglify']);
  grunt.registerTask('uglifyCSS', ['cssmin']);
  grunt.registerTask('lintIt', ['eslint']);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function() {
    if(grunt.option('prod')) {
      grunt.task.run(['test', 'lintIt', 'concatIt', 'uglifyJS', 'uglifyCSS', 'push']);
    } else {
      grunt.task.run(['test', 'lintIt', 'concatIt', 'uglifyJS', 'uglifyCSS', 'server-dev']);
    }
  });


// ['test', 'lintIt', 'concatIt', 'uglifyJS', 'uglifyCSS', 'server-dev']

};
