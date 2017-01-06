/**
 * Created by CAI_GC on 2017/1/6.
 */
var app = require('express')();
var host;
if (app.get('env') === 'development') {
    host = '';
}else if (app.get('env') === 'production'){
    host = '';
}

var urls = {
    login:''

};

module.exports = urls;