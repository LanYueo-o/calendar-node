const $CONFIG =  require('../db/Json');
const crypto = require('../db/crypto');

/**
 *  用户登录接口
 */
let userLogin = function (req, res, next) {
    $CONFIG.pool.getConnection(function (err, connection) {
        let param = req.body;
        let _res = res;
        connection.query($CONFIG.$sql.userRegister.getUserByUserName,[
            param.userName,
            crypto.aesCrypto( param.userPassWord , '1234567890abcdefg'),
        ], function (err, res) {
            let data = {};
            if(res.length !== 0){
                data.result = {
                    code: 200,
                    msg: '登录成功',
                    list:{
                        userName: param.userName
                    }
                };
            }else {
                data.result = {
                    code: 1,
                    msg: '用户名或密码错误'
                };
            }
            setTimeout(()=> {
                $CONFIG.responseJSON(_res, data)
            },300);
            connection.release();
        });
    });
};

module.exports = {
    userLogin:userLogin ,
};