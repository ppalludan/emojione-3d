var path = require('path');
var fs = require('fs');
var FS = require('fs');
var canvgc = require('../lib/canvgc/canvgc');
var THREE = require('three');
var ThreeContext = require('../lib/three-context');
var async = require('async');

var input = __dirname + '/../assets/test/';
var output = __dirname + '/../assets/json/';

var stats = {
    error : 0,
    files : 0
}

fs.readdir( input, function( err, files ) {
        if( err ) {
            console.error( "Could not list the directory.", err );
            process.exit( 1 );
        } 

        async.eachOfSeries(
            files, 
            function(item, key, callback) {
                var fromPath =  path.join( input, item );
                var toPath = path.join( output, item.replace('.svg', '.json') );

                FS.readFile(fromPath, 'utf8', function (err, data) {

                    if (err) {
                        throw err;
                    }

                    canvgc(data, 1000, function (err, jsData) {
                        console.log(jsData);

                        if (err) {
                            console.error(toPath);
                            console.error(err);
                            stats.error ++;
                            return callback(err)
                        }
                        var context = new ThreeContext();                        
                        try {
                            eval('var process=' + jsData);
                            process.d[0](context, context);
                        } catch (ex) {
                            console.error(toPath);
                            console.error(ex);
                            stats.error ++;
                            return callback();
                        }

                        var str = JSON.stringify(context.getObject().toJSON());
                        str = str.replace(/ExtrudeGeometry/g, 'Geometry');

                        FS.writeFile(toPath, str, 'utf8', function (err) { 
                            if (err) {
                                stats.error++;
                                console.error(toPath);
                                console.error(err);
                            } else {
                                stats.files++;
                            }
                            callback();
                        });
                    });
                });
            },
            function(err) {
                console.log('done');
                console.log(stats);
            }
        );
});


/*


*/