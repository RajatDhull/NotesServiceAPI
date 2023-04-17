const userModel=require("../models/user")
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
const SECRET_KEY=process.env.SECRET_KEY
const signup=async (req,res)=>{
    /*
    4 steps:
    Existing user check
    Hashed password
    User Creation
    Token Generation
    */
    console.log("Request: "+req.method+" URL "+req.url);
    const {username,email,password}=req.body;
    console.log(username+email+password);
    try {  
        const existingUser=await userModel.findOne({email:email})
        if(existingUser){
            return res.status(400).json({message:"User Already Exists"})
        }
        
        const hashedPassword= await bcrypt.hash(password,10)

        const result= await userModel.create({
            email:email,
            password:hashedPassword,
            username:username
        });

        const token=jwt.sign({email:result.email,id:result._id},SECRET_KEY);
        res.status(200).json({user:result,token:token});    //201 means successfully record created...

    } catch (error) {
        // console.log(req);
        // console.log("passoword"+password+" name:"+username+" email:"+email);
        console.log(error);
        
        res.status(500).json({message:"something went wrong"});
    }
}

const signin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const existingUser=await userModel.findOne({email:email})
        if(!existingUser){
            return res.status(404).json({message:"user not found"})
        }

        //compare the two password
        const matchPassword=await bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY);
        res.status(201).json({user:existingUser,token:token});

    } catch (error) {  
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}


module.exports={signup,signin};