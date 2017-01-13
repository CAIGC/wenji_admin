/**
 * Created by CAI_GC on 2017/1/6.
 */
var httpUtils = require('../utils/http_utils');
var urls = require('../utils/urls');
var service;

service = {
    productList:function(successFn,param){
        httpUtils.doGet(urls.productList,false,successFn,param)
    }
}
module.exports = service;
