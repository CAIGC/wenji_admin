/**
 * Created by CAI_GC on 2017/1/6.
 */
var httpUtils = require('../utils/http_utils');
var urls = require('../utils/urls');
var service;

service = {
    productList: function (successFn, param) {
        httpUtils.doGet(urls.productList, false, successFn, param)
    },
    productPublish: function (successFn, param) {
        httpUtils.doGet(urls.productPublish, false, successFn, param)
    },
    offShelf: function (successFn, param) {
        httpUtils.doGet(urls.offShelf, false, successFn, param)
    },
    delete: function (successFn, param) {
        httpUtils.doGet(urls.productDelete, false, successFn, param)
    }
}
module.exports = service;
