const express=require("express")
const router=express.Router()
const pool=require("../pool")
router.get("/",(req,res)=>{
    //bodyParser
    //url.parse(req.url,true)
    var kwords=req.query.kwords;
    var arr=kwords.split(" ");
    for(var i=0;i<arr.length;i++){
        arr[i]=`title like '%${arr[i]}%'`;
    }
    var where=" where "+arr.join(" and ");
    var output={pageSize:9};//每页9个产品
    output.pno=req.query.pno; //产品当前页码
    var sql=`SELECT *,(SELECT md FROM xz_laptop_pic WHERE laptop_id=lid limit 1) as md FROM xz_laptop `;
    pool.query(sql+where,[],(err,result)=>{
        if(err) throw err;
        output.count=result.length; //产品总数
        output.pageCount=Math.ceil(output.count/output.pageSize);//产品总页数
        output.products=result.slice(output.pno*9,output.pno*9+9);//当前页数产品列表
        console.log(output);
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Contorl-Allow-Origin":"*"
        })
        res.write(JSON.stringify(output));
        res.end();
    })
})
module.exports=router;