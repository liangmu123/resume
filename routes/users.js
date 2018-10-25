const express=require("express")
const router=express.Router()
const pool=require("../pool")

router.get("/signin",(req,res)=>{
  var uname=req.query.uname;
  var upwd=req.query.upwd;
  console.log(uname,upwd);
  pool.query(
    "select * from xz_user where uname=? and upwd=?",
    [uname,upwd],
    (err,result)=>{
      if(err) console.log(err);
      if(result.length>0){
        res.writeHead(200,{
          "Content-Type":"application/json;charset=utf-8",
          "Access-Control-Allow-Origin":"*"
        })
        var user=result[0]
        req.session["uid"]=user["uid"]
        console.log(req.session["uid"]);
        res.write(JSON.stringify({
          ok:1
        }))
      }else{
        res.write(JSON.stringify({
          ok:0,
          msg:"用户名或密码错误！"
        }))
      }
      res.end();
    }
  )
})

module.exports=router;