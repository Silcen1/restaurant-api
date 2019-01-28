const express=require('express');
const pool=require('../../pool');
var router =express.Router();
module.exports=router;

/*
API: GET /admin/dish
获取所有的菜品 （按类别进行分类）
返回数据:
[
    {code:1,cname:'肉类'，dishList:[{},{},...]}
    {code:1,cname:'菜类'，dishList:[{},{},...]}
]
*/

router.get('/',(req,res)=>{
    pool.query('SELECT cid,cname FROM res_category',(err,result)=>{
        if(err)throw err;
        var count = 0;
        for(var c of categoryList){
            //循环查询每个类别下有哪些菜品
            pool.query('SELECT * FROM res_dish WHERE categoryId=?',c.cid,(err,result)=>{
                c.dishList=reslut;
                count++;
                if(count==categoryList.length){
                    res.send(categoryList)
                }
            })
        }
    })
})