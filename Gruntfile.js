// TODO: get these variables from some form of input
var options = {
    width: '300',
    height: '600',
    campaignName: 'test'
};

// NOTE: these options assume a few things about the input markup (made for edge)
var replaceOptions = {
    htmlUpdates: {
        src: 'test.html',
        dest: 'output.html',
        replacements: [
            {
                from: /\<\/title\>/g,
                to: function(word, index, full, matches) {
                    var content = word + '\n\t<script src="http://s0.2mdn.net/ads/studio/Enabler.js"></script>';
                    return content;
                }
            },
            {
                from: /\<\/head\>/g,
                to: function(word, index, full, matches) {
                    var content = '\t<meta name=”ad.size” content=”';
                    content += 'width=' + options.width + ',height=' + options.height;
                    content += '”>\n' + word;
                    return content;
                }
            },
            {
                from: /\<\/style\>/g,
                to: function(word, index, full, matches) {
                    var width = parseInt(options.width, 10) - 2;
                    var height = parseInt(options.height, 10) - 2;
                    var content = '\t.border-box { ';
                    content += 'width: ' + width + 'px; height: ' + height + 'px;'
                    content += ' position: absolute; top: 0; left: 0; border: 1px solid #000; z-index: 2;}';
                    content += '\n\t\ta { position: relative; z-index: 5; }';
                    content += '\n\t' + word;
                    return content;
                }
            },
            {
                from: /\<body\>/g,
                to: function(word, index, full, matches) {
                    var content = word + '\n';
                    content += '\t<a href="javascript:Enabler.exit(\''
                    content += options.campaignName + '_exit\');">';
                    content += '\n\t<div class="border-box"></div>';
                    return content;
                }
            },
            {
                from: /\<\/body\>/g,
                to: function(word, index, full, matches) {
                    var content = '\t</a>\n' + word;
                    return content;
                }
            }
            // TODO: add the border-box hide/show logic
        ]
    }
};

module.exports = function(grunt) {

    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        replace: replaceOptions
    });

    // load the modules
    grunt.loadNpmTasks('grunt-text-replace');

    // default task(s)
    grunt.registerTask('default', ['replace']);

};
