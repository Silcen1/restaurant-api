
console.log("准备启动API服务器...")
console.log(new Date().toLocaleString())

const PORT =8090;
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const adminRouter=require('./routes/admin/admin');
const categoryRouter =require("./routes/admin/category");
const dishRouter =require("./routes/admin/dish");


var app=express();
app.listen(PORT,()=>{
    console.log('Server Listening:'+PORT);
})

app.use(cors({
    Origin:[
        "http://127.0.0.1:5500"
    ],
    credentials:true
}))

//app.use(bodyParser.urlencoded({})) 把
app.use(bodyParser.json());  //把json格式的请求主体数据解析出来放入req.body属性

//挂载路由器
app.use('/admin/category',categoryRouter);
app.use('/admin',adminRouter);
app.use('/admin/dish',dishRouter);