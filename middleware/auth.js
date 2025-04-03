const jsonwebtoken = require('jsonwebtoken');

const auth = (req,res,next)=>{
    console.log(req.headers);

   try{

    const accessToken = req.headers.authorization.replace("Bearer ","");

    const jwt_payload = jsonwebtoken.verify(
        accessToken,
        process.env.jwt_Salt
    );

    req.user = jwt_payload;
   }catch(e){
    res.status(401).json({
        status:"failed",
        message:"unauthorised",
    });
    return;
   }

  
next();

}

module.exports = auth;