import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const PORT= 5000;

const SECRET_KEY = 'sakshiRTC';
const verifyJWT = async(req,res,next)=>{
    const {token}= req.headers;
try{
    const decoded =jwt.verify(token,SECRET_KEY)
    if(decoded.isAdmin){
        next();
    }
}
catch(e){ 
    return res.json({
        success: false,
        message: e.message
    })
} 
}

app.post('/signup',async(req,res)=>{
    const {email} = req.body;

    const token = jwt.sign({email: email, isAdmin: true}, SECRET_KEY, {expiresIn: '2m'});

    res.json({
     success: true,
     data: {
        email: "sakshirahangdale@758gmail.com",
        jwt_token: token
     },
     message: 'signup successfully!'
    })
})

app.post('/deleteCourse',verifyJWT , async(req,res)=>{
  res.json({
    success: true,
    message: 'course delete successfully!'
  })
})

app.listen(PORT,()=>{
    console.log("server running on port 5000......")
})