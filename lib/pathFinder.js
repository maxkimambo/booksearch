/**
 * Created by max on 12.03.16.
 */
var path = require('path'),
    fs = require('fs'),
    q = require('q'),
    config = require(path.normalize('./../config'));

function pathFinder(){

}

pathFinder.prototype.getFilePaths = function(config){

    // get dir contents.
    var dirname = path.normalize(config.folder);
    var deferred = q.defer();


    fs.readdir(dirname, function(err, files){

        if (err){
           deferred.reject(err);
       }

        var fileList = [];

        files.forEach(function(file){
          fileList.push(path.join(dirname, file));
        });

        deferred.resolve(fileList);
    });

    return deferred.promise;
};


module.exports = pathFinder;
