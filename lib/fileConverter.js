/**
 * Created by max on 12.03.16.
 */
"use strict";

    var path = require('path'),
        fs = require('fs'),
        config = require(path.normalize('./../config')),
        q = require('q'),
        pathfinder = require('./pathFinder');

//var workingDir = new pathfinder();
//
//workingDir.getFilePaths(config)
//    .then(function(files){
//     var fc = new fileConverter();
//
//      fc.convertFile(files[4]).then(function(data){
//          console.log(data);
//      });
//});


function fileConverter (){

}

/**
 * Converts the file and returns it in base64 format.
 * @param fileName
 */
fileConverter.prototype.convertFile = function(fileName){
        var deferred = q.defer();

     //read the file.
    fs.readFile(fileName, function(err, data){
        return deferred.resolve(data.toString('base64'));
    });

return deferred.promise;
    //
    //var stream  = fs.createReadStream(fileName);
    //var count = 0;
    //stream.on('data', function(chunk){
    //    count ++;
    //    console.log('number of chunks : %s', count);
    //});

};

module.exports = fileConverter;
