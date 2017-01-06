/**
 * Created by CAI_GC on 2017/1/6.
 */
var rp = require('request-promise');
var utils;

utils = {
    doGet : function(url,isJson,success,pram,header){
        template.http_client_template('GET',url,isJson,success,pram,header);
    },
    doPost : function (url,isJson,success,pram,header) {
        template.http_client_template('POST',url,isJson,success,pram,header);
    },
    doDelete : function (url,isJson,success,pram,header) {
        template.http_client_template('DELETE',url,isJson,success,pram,header);
    }
};

template = {
  http_client_template : function(method,url,isJson,success,pram,header){
      var options = {};
      if(method === 'POST'){
          options = {
              method: method,
              uri: url,
              form: pram,
              headers: header,
              json: isJson // Automatically parses the JSON string in the response
          };
      }else{
          options = {
              method: method,
              uri: url,
              qs: pram,
              headers: header,
              json: isJson // Automatically parses the JSON string in the response
          };
      }


      rp(options)
          .then(function (repos) {
              success(repos);
          })
          .catch(function (err) {
              // API call failed...
              console.error(err);
              success();
          });

  }
};
module.exports = utils;