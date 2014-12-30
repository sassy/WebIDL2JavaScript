module.exports = function(grunt) {
    grunt.initConfig({
	jshint: {
	    all: ['*.js'],
	},
	jasmine_node : {
	    all : ['spec/']
	},
	watch : {
	    files: ['*.js'],
	    tasks: ['jshint'],	    
	}
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['jshint']);
};