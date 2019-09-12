"use strict";

//引入crypto模块
const crypto = require("crypto");
const privateKey = '1234567890abcdefg';
const publicKey = 'abcdefgABCDEFG';

//crypto(kri:pto)意为加密
const cons = require('crypto');
//声明为const 表示该变量不可修改
//Hash算法
function md5(data){
    let hash = cons.createHash('md5');//'sha1', 'md5', 'sha256', 'sha512'等
    hash.update(data);
    console.log(hash.digest('hex'));
}


//Hmac算法，需要一个密钥
function hMac(data){
    let hmac = cons.createHmac('sha1','secret-key');
    hmac.update(data);
    console.log(hmac.digest('hex'));
}

//AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用：
//加密  cipher意为暗号
function aesCrypto(data){
    //创建一个加了秘钥的暗号
    const cipher =  cons.createCipher('aes192',privateKey);
    //将暗号转换成十六进制
    let aes = cipher.update(data,'utf-8','hex');
    aes+=cipher.final('hex');
    console.info('加密：' + aes);
    return aes;
}
//解密
function aesDecrypto(data){
    const dcipher = cons.createDecipher('aes192',privateKey);
    let daes = dcipher.update(data,'hex','utf-8');
    daes+=dcipher.final('utf-8');

    console.info('解密：' + daes);
    return daes;
}

module.exports = {
    md5 :md5,
    hMac :hMac,
    aesCrypto: aesCrypto,
    aesDecrypto: aesDecrypto,
};
