const express=require("express");
const router=express.Router();
const pool=require("../pool.js");
router.get("/getIndexProducts",(req,res)=>{
    var sql="SELECT * FROM xz_index_product where seq_recommended!=0 ORDER by seq_recommended";
    pool.query(sql,[],(err,result)=>{
        if(err) console.log(err);
        res.writeHead(200,{
            "Content-Type":"application/json charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(result));
        res.end();
    })
})
module.exports=router;