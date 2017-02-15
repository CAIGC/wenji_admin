/**
 * Created by CAI_GC on 2017/1/6.
 */
var express = require('express');
var router = express.Router();
var productService = require('../services/product_service');
var request = require('../utils/request_utils.js');
var urls = require('../utils/urls');
/* GET users listing. */
router.get('/index', function (req, res, next) {
    return res.render('product/index', {});
});
router.get('/add', function (req, res, next) {
    return res.render('product/addProduct', {});
});

router.get('/search', function (req, res, next) {
    var param = req.query;
    // param.SEARCH_IN_I_sid = req.body.currentUser.realSids;
    param.pageSize = 10;
    return productService.productList(function (data) {
        res.render('product/row', JSON.parse(data));
    }, param);
});
/**
 * 发布
 */
router.get('/publish', function (req, res, next) {
    var param = req.query;
    return productService.productPublish(function (data) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.end(data);
    }, param);
});
/**
 * 下架
 */
router.get('/offShelf', function (req, res, next) {
    var param = req.query;
    return productService.offShelf(function (data) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.end(data);
    }, param);
});
/**
 * 删除
 */
router.get('/delete', function (req, res, next) {
    var param = req.query;
    return productService.delete(function (data) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.end(data);
    }, param);
});

router.post('/imgSave', function (req, res) {
    var fileBase64Encoded = req.body['image'].replace(/^data:image\/\w+;base64,/, "");
    request.doPostBase64(urls.uploadImage, fileBase64Encoded, function (err, body) {
        res.end(body);
    })
});

module.exports = router;