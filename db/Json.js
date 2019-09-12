const mysql = require('mysql');
const dbConfig = require('../db/DBConfig');
const $sql = require('./Sql');

// 使用DBConfig.js的配置信息创建一个MySql链接池
const pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
const responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '301',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
module.exports = {
    responseJSON:responseJSON,
    $sql:$sql,
    pool:pool
};
