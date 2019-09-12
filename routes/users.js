const express = require('express');
const router = express.Router();
const userDao = require('../api/UsersInfo');
const userRes = require('../api/UsersRegister');
const userLogin = require('../api/UsersLogin');

// 用户注册
router.post('/userRegister',function (req, res, next) {
    userRes.userRegister(req, res, next);
});

// 用户登录
router.post('/userLogin',function (req, res, next) {
    userLogin.userLogin(req, res, next);
});

// 用户添加提醒
router.post('/userMessage',function (req, res, next) {
  userDao.createNewMessage(req, res, next);
});

// 查询用户提醒
router.post('/userMessageInfo',function (req, res, next) {
  userDao.userMessageInfo(req, res, next);
});

// 删除某条数据
router.post('/userMessageDelete',function (req, res, next) {
  userDao.userMessageDelete(req, res, next);
});

module.exports = router;
