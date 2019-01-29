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
    pool.query('SELECT cid,cname FROM res_category ORDER BY cid',(err,result)=>{
        if(err)throw err;
        var categoryList = result;
        var fishCount=0;
        for(let c of categoryList){
            //循环查询每个类别下有哪些菜品
            pool.query('SELECT * FROM res_dish WHERE categoryId=? ORDER BY did DESC',c.cid,(err,result)=>{
               if(err)throw err;
               c.dishList = result;
               //必须保证所有类别下的菜品都查询完成才能
               fishCount++;
               if(fishCount==categoryList.length){
                   res.send(categoryList)
               }
            })
        }
    })
})


/*
POST /admin/dish/image
请求参数
接收客户端上传的菜品图片，保存在服务器上，返回该图片在服务器上的随机文件名
*/

const multer=require('multer');
const fs=require('fs');
var upload=multer({
    dest: 'tmp/'   //指定客户端上传的文件临时存储路径
})

router.post('/image', upload.single('dishImg'),(req,res)=>{
    // console.log(req.file);
    // console.log(req.body);
    var tmpFile=req.file.path;  //临时文件名
    var suffix=req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));  //原始文件名中的后缀部分
    var newFile= randFileName(suffix);//目标文件

    fs.rename(tmpFile, 'img/dish/'+newFile, ()=>{
        res.send({code:200, msg:'upload succ',fileNme:newFile});
    })
})

// 生成一个随机文件名
// 参数: suffix表示要生成的文件中的后缀
// 形如: 1351324631-8821.jpg
function randFileName(suffix){
 var time= new Date().getTime();
 var num= Math.random()*(10000-1000)+1000
 return time + '-' + num + suffix
}


/*
POST /admin/dish
请求参数: {title:'xx',imgUrl:'..jpg',price:xx,
detail:'xx',categoryId:xx}
添加一个新的菜品
输出消息
{code:200,msg:'dish added succ',dishId:46}
*/
router.post('/',(req,res)=>{
    var data=req.body;
  pool.query('INSERT INTO res_dish SET ?',data,(err,result)=>{
      if(err)throw err;
      res.send({code:200,msg:'dish added succ',dishId:result.insertId})//将INSERT语句产生的自增编号输出给客户端
  })
})




/*
DELETE /admin/dish/:did
根据指定的菜品编号删除该菜品
输出数据
{code:200,msg:'dish delete succ'}
{code:400,msg:'dish not exists'}
*/


/*
PUT /admin/dish
请求参数: {title:'xx',imgUrl:'..jpg',price:xx,detail:'xx',categoryId:xx}
根据指定的菜品编号修改菜品
输出数据
{code:200,msg:'dish delete succ'}
{code:400,msg:'dish not exists'}
*/
