/**
 * 用户信息表
 */
const userInfo = {
    insert: 'insert into user_message_info(user_name,set_time_start,set_message_info,status) values(?,?,?,?)',
    // queryAll: 'SELECT * FROM user_message_info WHERE user_name = ? AND set_time_start = ?',
    queryAll: 'select * from user_message_info where user_name = ? order by set_time_start asc',
    getUserById: 'select * from user_message_info where id = ?',
    deleteMessage: 'delete from user_message_info where id = ?;',
};

/**
 * 用户注册表
 */
const userRegister = {
    insert: 'insert into user_info(user_name,user_password,status) values(?,?,?)',
    queryAll: 'select * from user_info',
    getUserByUserName: 'select * from user_info where user_name = ? and user_password = ?',
};
module.exports = {
    userInfo: userInfo,
    userRegister: userRegister
};
