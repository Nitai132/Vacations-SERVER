const {createHashedPassword} = require('./user-utils');
const CREATE_USER_QUERY = 'insert into users (first, last, username, password) values (?,?,?,?)';
const IS_ADMIN_QUERY = 'SELECT `isAdmin` FROM `users` WHERE id = ? ';
const CHECK_USER_EXISTANCE_QUERY = "select * from users where username = ?"


const checkUserExistance = userName => global.mysqlConnection.execute(CHECK_USER_EXISTANCE_QUERY, [userName])

const createUser = ({first, last, username, password}) => global.mysqlConnection.execute(CREATE_USER_QUERY, [first, last, username, createHashedPassword(password)]);

const isAdmin = id => global.mysqlConnection.execute(IS_ADMIN_QUERY,[id])


module.exports = {createUser, isAdmin, checkUserExistance};