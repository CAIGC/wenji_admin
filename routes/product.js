/**
 * Created by CAI_GC on 2017/1/6.
 */
var express = require('express');
var router = express.Router();
var productService = require('../services/product_service');
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
        res.render('product/row',JSON.parse(data));
    }, param);
});

module.exports = router;