const bcryptjs = require('bcryptjs')
const userModel = require('../model/user.model')
const sendSignupEmail = require('./sendMailController')
const signup =async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await userModel.findOne({email})
        const hassedPassword =await  bcryptjs.hash(password,10)
        if(user){
            return res.status(500).json({message:"User already exist"})
        }
        const createdUser = await new userModel({name:name,email:email,password:hassedPassword});
        await createdUser.save()
        await sendSignupEmail(name, email);
        return  res.status(200).json({message:"User created successfully",user:{id:createdUser._id ,email:createdUser.email }})

    }
    catch(e){
        res.status(500).json({message:e})
        console.log(e)
    }

}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body 
        const user = await userModel.findOne({email})
        const isMatch = await bcryptjs.compare(password,user.password)
        if(!user || !isMatch){
            res.status(500).json({message:"invalid credentials"})
        }
        else{
            res.status(200).json({message:"login successfull",user:{id : user._id ,email:user.email}})
        }
    }
    catch(e){
        res.status(500).json({message:e})
    }
}

const findUserDetails =async(req,res)=>{
    const {email}  = req.body
    try{
        const user = await userModel.findOne({email})
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({message:"server error"})
        console.log(err)
    }
}

module.exports = {signup,login,findUserDetails}