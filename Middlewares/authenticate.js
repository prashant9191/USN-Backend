var jwt = require('jsonwebtoken');
const authenticate =  async (req, res, next) => {
    if(!req.headers.authorization){
        return res.send({msg:"Please Login Again"})
    }
    
    const token = req.headers.authorization.split(" ")[1];
    
    if(!token){
       return res.send({msg:"Please Login Again"})
    }

    jwt.verify(token, process.env.token_key, function(err, decoded) {
            if(err){
                return res.send({msg:"Please Login Again"})
            }
            else{
                let data= req.body;
                let {userID}=decoded;
                data.userid=userID;
                next()
            }
      });

}




module.exports = {authenticate}