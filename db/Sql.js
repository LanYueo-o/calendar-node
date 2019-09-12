/**
 * 用户信息表
 */
const userInfo = {
    insert: 'INSERT INTO user_message_info(user_name,set_time_start,set_message_info,status) VALUES(?,?,?,?)',
    queryAll: 'SELECT * FROM user_message_info WHERE user_name = ? AND set_time_start = ?',
    getUserById: 'SELECT * FROM user_message_info WHERE id = ?',
    deleteMessage: 'DELETE FROM user_message_info WHERE id = ?;',
};

/**
 * 用户注册表
 */
const userRegister = {
    insert: 'INSERT INTO user_info(user_name,user_password,status) VALUES(?,?,?)',
    queryAll: 'SELECT * FROM user_info',
    getUserByUserName: 'SELECT * FROM user_info WHERE user_name = ? AND user_password = ?',
};
module.exports = {
    userInfo: userInfo,
    userRegister: userRegister
};
