/**
 * Created by max on 14.03.16.
 */
"use strict";
var es = require('elasticsearch');
var path = require('path');
var config = require(path.normalize('./../config'));
var client = new es.Client({
    host: config.elasticSearchHost + ':' + config.elasticSearchPort , log: 'trace'
});



var esClient  = function(){ };

function errorHandler(err){
    console.log(err);
}

esClient.prototype.createIndex = function(indexName){
    return client.indices.create({
        index:indexName,
        ignore: [400]
    });
};

esClient.prototype.dropIndex = function(indexName){
    return client.indices.delete({
        index: indexName,
        ignore: [404]
    });
};

esClient.prototype.createMapping = function(index, type, body ){
 // assuming body is key:value pair of property and type

            // helper function to generate properties
          function genProperties(){
              var result = {};

              // generates this structure
              //"properties": {
              //    "user": {
              //        "type": "string"
              //    },
              //    "tweets": {
              //        "type": "string"
              //    }
              //}

              for(var prop in body){
                  result[prop] = {
                      type: body[prop]
                  }
              }

              return result;
          }


    return client.indices.putMapping({
        index: index,
        type: type,
        body: { properties : genProperties() }

    });
};

esClient.prototype.createDocument = function(index, type, doc){

    return client.create({
        index: index ,
        type: type,
        body: doc
    });
};

esClient.prototype.deleteDocument = function(index, type, id){
    return client.delete({
        index:index,
        type:type,
        id: id
    });
};

esClient.prototype.search = function(index, query ){
    return client.search({
        index: index,
        body: query
    });
};
//
//var c = new esClient();
////
////c.createIndex('twitter').then(function(res){
////    console.log('created index');
////    console.log(res);
////}, errorHandler);
////
//
//c.createMapping('twitter', 'tweet',{user:"string", tweets:"string"}).then(function(res){
//        console.log(res);
//}, errorHandler);

//c.createDocument('twitter', 'tweet', {
//    user: 'Max Kimambo', tweets: "This is my fifth elastic tweet"
//});

//
//
//c.dropIndex('twitter').then(function(res){
//    console.log('dropped index');
//    console.log(res);
//
//}, errorHandler);

//c.search('twitter', {
//    query: {
//        match: {
//          tweets: 'Third'
//        }
//    }
//}).then(function(res){
//    console.log(res);
//});

module.exports = esClient;