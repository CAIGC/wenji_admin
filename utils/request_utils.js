/**
 * Created by CAI_GC on 2017/1/19.
 */
var req = require('request');
var fs = require('fs');
var utils;

utils = {
    doPostBase64: function (url, fileBase64Encoded, success) {
        var decodedFile = new Buffer(fileBase64Encoded, 'base64');
        var r = req.post(url, function (err, httpResponse, body) {
            if (err) {
                success(err);
            }
            success(null, body);
        });
        var form = r.form();
        form.append('files', decodedFile, { filename: 'temp.jpg' });
    },
    doPost: function (url,success, param) {
        var r = req.post(url, function (err, httpResponse, body) {
            if (err) {
                success(err);
            }else 
            success(body);
        }).form(param);
    }
};

module.exports = utils;