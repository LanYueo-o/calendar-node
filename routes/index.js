const express = require('express');
const router = express.Router();

// const app = require('express')();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
//
// server.listen(3002,function(){
// // 让socket监听3002端口
//   console.log('Server listening on port:',3002);
// });
//
// // 用来监听/发送消息
// // emit:发送消息  on:监听socket请求
// io.on('connection', function (socket) {
//   setInterval(()=>{
//     socket.emit('news', { hello: 'world' });
//   },1000000);
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

router.get('/', function(req, res, next) {
  res.render('');
});

module.exports = router;
