/**
 * Created by CAI_GC on 2017/1/6.
 */
var app = require('express')();
var product_admin_host;
if (app.get('env') === 'development') {
    product_admin_host = 'http://127.0.0.1:8080/product-admin';
}else if (app.get('env') === 'production'){
    product_admin_host = '';
}

var urls = {
    login:'',
    productList:product_admin_host +'/product/list'

};

module.exports = urls;