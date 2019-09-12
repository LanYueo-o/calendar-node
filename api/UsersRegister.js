const $CONFIG =  require('../db/Json');
const crypto = require('../db/crypto');
/**
 *  用户注册接口
 */
let userRegister = function (req, res, next) {
    $CONFIG.pool.getConnection(function (err, connection) {
        let param = req.body;
        let _res = res;
        connection.query($CONFIG.$sql.userRegister.queryAll, function (err, res) {
            let isTrue = false;
            if(res){ //获取用户列表，循环遍历判断当前用户是否存在
                for (let i = 0;i < res.length;i++) {
                    if(res[i].user_name === param.userName) {
                        isTrue = true;
                    }
                }
            }
            let data = {};
            if(isTrue) {
                data.result = {
                    code: 1,
                    msg: '用户名已存在'
                };
            } else {
                connection.query($CONFIG.$sql.userRegister.insert, [
                    param.userName ,
                    crypto.aesCrypto( param.userPassWord),
                    param.status
                ], function (err, result) {
                    console.info(result);
                    if(result) {
                        data.result = {
                            code: 200,
                            msg: '注册成功'
                        };
                    } else {
                        data.result = {
                            code: 301,
                            msg: '注册失败'
                        };
                    }
                });
            }
            setTimeout(()=> {
                $CONFIG.responseJSON(_res, data)
            },300);
            connection.release();
        });
    });
};

module.exports = {
    userRegister:userRegister ,
};