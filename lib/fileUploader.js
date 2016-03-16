/**
 * Created by max on 14.03.16.
 */
"use strict";
var path = require('path');
var fileConverter = require('./fileConverter');
var pathfinder = require('./pathFinder');
var config = require(path.normalize('./../config'));
var ec = require('./elasticClient.js');

var ecClient = {};

function fileUploader(){
    var self = this;
    self.init();
}

fileUploader.prototype.init = function(){
   // create indices
    console.log('initializing index');
    var client = new ec();
    client.createIndex('library')
        .then(initializeMappings(client)).then(function(res){
            console.log('mappings initialized');
    });

    ecClient = client;
};

function initializeMappings(client){
    return client.createMapping('library', 'book', {fileName: "string", filePath: "string", book_content: "attachment"});
}

fileUploader.prototype.uploadFile = function (file){

};

function buildDocument(fileName, filePath, content){
    return {
        fileName: fileName,
        filePath: filePath,
        book_content: content
    }
}


fileUploader.prototype.uploadAllFiles = function (){
   // get the list of files

    var pf = new pathfinder();
    var fc = new fileConverter();

    pf.getFilePaths(config).then(function(files){
        console.log(files);

        // convert files and build json
       files.forEach(function(file){
           fc.convertFile(file).then(function(res){
              var doc =  buildDocument( path.basename(file), file, res);

               ecClient.createDocument('library', 'book', doc).then(function(result){
                   console.log(result);
               });
           });
       })
    });


    // initiate upload

};

var f = new fileUploader();
f.uploadAllFiles();

//
//function fileUploader(){
//
//}
//
//
//// kick off the process
//fileUploader.prototype.start = function(){
//
//    var self = this;
//
//    console.log('starting ');
//    var workingDir = new pathfinder();
//
//    workingDir.getFilePaths(config)
//        .then(function(files){
//            var fc = new fileConverter();
//
//            files.forEach(function(file){
//                fc.convertFile(file).then(function(data){
//                    console.log('sending ');
//
//                    self.uploadData(data);
//                });
//            });
//
//
//        });
//
//};
//
//// find the files to upload
//
//// convert all files to base 64
//
//// create request
//
//// upload
//
//
//fileUploader.prototype.uploadData = function(data){
//        // create post request
//
//    var elasticUrl = config.elasticSearchHost + ':' + config.elasticSearchPort + '/collection/book';
//    //var mappings = {
//    //  "mappings": {
//    //      "book": {
//    //          "properties": {
//    //              "body": {
//    //                  "type": "attachment"
//    //              }
//    //          }
//    //      }
//    //  }
//    //}
//
//
//
//    var reqParams = {
//        url: elasticUrl,
//        method: 'POST',
//        body: JSON.stringify({"book_content": data })
//
//    };
//
//
//    req(reqParams, function(err, response, body){
//        console.log(err);
//        //console.log(body);
//    });
//};
//
//
//var fileUp = new fileUploader();
//
//fileUp.start();

