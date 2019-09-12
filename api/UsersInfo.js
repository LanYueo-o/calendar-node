const $CONFIG =  require('../db/Json');
const crypto = require('../db/crypto');
const DateTime = require('../util/DateTime');

const app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);

let createNewMessage = function (req, res, next) {
    $CONFIG.pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        // var param = req.query || req.params;
        let param = req.body;
        let _res = res;
        connection.query($CONFIG.$sql.userInfo.queryAll,[ param.userName ], function (err, res) {
            let isTrue = false;
            if(res){ //获取用户列表，循环遍历判断当前用户是否存在
                for (let i=0;i<res.length;i++) {
                    if(res[i].set_time_start == param.createTime) {
                        isTrue = true;
                    }
                }
            }
            let data = {};
            data.isreg = !isTrue;
            if(isTrue) {
                data.result = {
                    code: 1,
                    msg: '提醒已经存在，请勿重复添加'
                };
            } else {
                connection.query($CONFIG.$sql.userInfo.insert, [
                    param.userName,
                    param.createTime,
                    param.createMessage,
                    param.status
                ], function (err, result) {
                    console.info(result);
                    if(result) {
                        data.result = {
                            code: 200,
                            msg: '创建成功'
                        };
                    } else {
                        data.result = {
                            code: 301,
                            msg: '创建失败'
                        };
                    }
                });
            }

            if(err) data.err = err;
            setTimeout(()=> {
                $CONFIG.responseJSON(_res, data)
            },300);
            connection.release();
        });
    });
};

let userMessageInfo = function (req, res, next) {
    $CONFIG.pool.getConnection(function (err, connection) {
        let _res = res;
        let param = req.body;
        connection.query($CONFIG.$sql.userInfo.queryAll,[
            param.userName,
            param.createTime,
        ], function (err, res,result) {
            console.info(result);
            if(res){
                server.listen(3002,function(){
                  console.log('Server listening on port:',3002);
                });
                // emit:发送消息  on:监听socket请求
                io.on('connection', function (socket) {
                  setTimeout(()=>{
                    socket.emit('news', { msg: res[0].set_message_info });
                  },300);
                  socket.on('complete', function (data) {
                    console.log(data);
                  });
                });
                let data = {
                    code: 200,
                    list: res
                };
                $CONFIG.responseJSON(_res, data)
            }else {
                $CONFIG.responseJSON(err)
            }
            connection.release();
        });
    });
};

let userMessageDelete = function (req, res, next) {
    $CONFIG.pool.getConnection(function (err, connection) {
        let _res = res;
        let param = req.body;
        connection.query($CONFIG.$sql.userInfo.deleteMessage, [param.id,], function (err, res) {
            if(res){
                let data = {
                    code: 200,
                    list: res
                };
                $CONFIG.responseJSON(_res, data)
            }else {
                $CONFIG.responseJSON(err)
            }
            connection.release();
        });
    });
};
module.exports = {
    createNewMessage:createNewMessage,
    userMessageInfo:userMessageInfo,
    userMessageDelete:userMessageDelete
};
