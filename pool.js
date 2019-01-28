// MySQL数据库连接池
const mysql=require('mysql');
var pool=mysql.createPool({
    host:'127.0.0.1',       //数据库地址
    post:3306,              //数据库端口
    user:'root',            //数据库管理员
    password:'',            //数据库管理员密码
    database:'restaurant',  //数据库名
    connectionLimit:10      //连接池大小
});
module.exports=pool;