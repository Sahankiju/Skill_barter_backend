import jwt from  'jsonwebtoken'

export const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success:false,
            message:"you need to login first to access"
        })
    }
    const userInfo = jwt.verify(token,process.env.JWT_SECRET);
    req.userInfo = userInfo;
    
    
    next();
}