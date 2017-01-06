/**
 * Created by CAI_GC on 2017/1/6.
 */
var httpUtils = require('../utils/http_utils');
var urls = require('../utils/urls');
var service;

service = {
    login:function(username,password,successFn){
        httpUtils.doPost(urls.login,false,successFn,{account :username,password :password})
    }
}
module.exports = service;

