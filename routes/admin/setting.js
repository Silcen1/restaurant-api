
//全局设置路由器
const express=require('express');
const pool=require('../../pool');

var router =express.Router();
module.exports=router;

/*
GET /admin/settings
获取所有的全局设置信息
返回数据
{appName:'xx',adminUrl:'xx',appUrl:'xx'...}
*/
router.get('/',(req,res)=>{
  pool.query('SELECT * FROM res_settings LIMIT 1',(err,result)=>{
      if(err)throw err;
      res.send(result[0]);
  })
})


/*
PUT /admin/setting
请求数据
修改所有的全局设置信息
返回数据
{code:200,msg:'setting updated succ'}
*/
router.put('/',(req,res)=>{
    pool.query('UPDATE  res_settings SET ?',req.body,(err,result)=>{
        if(err)throw err;
        res.send({code:200,msg:'setting updated succ'});
    })
  })