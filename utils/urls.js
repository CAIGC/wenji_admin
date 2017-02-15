/**
 * Created by CAI_GC on 2017/1/6.
 */
var app = require('express')();
var product_admin_host,image_host;
if (app.get('env') === 'development') {
    product_admin_host = 'http://127.0.0.1:8080/product-admin';
    image_host='http://image.qywenji.cn/image'
}else if (app.get('env') === 'production'){
    product_admin_host = '';
}

var urls = {
    login:'',
    productList:product_admin_host +'/product/list',
    productPublish:product_admin_host +'/product/publish',
    offShelf:product_admin_host +'/product/publishCancel',
    productDelete:product_admin_host +'/product/delete',
    uploadImage:image_host+'/upload'


};

module.exports = urls;