const express=require('express')
const User = require('../models/user')
const router=express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET="Harryisagoodboy"
// router.get('/',(req,res)=>{
//     // obj={
//     //     a:'roshen',
//     //     number:34
//     // }
//     // res.json(obj)
// })

 // route 1: create a user using: post "/api/auth/createuser" . no login required
router.post('/createuser',[body('email','enter a valid email').isEmail(),
body('name','enter a valid name').isLength({min:3}),
body('password').isLength({min:5})
],async (req,res)=>{
  let success=true
    console.log(req.body)
    

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const user=User(req.body)
    // user.save()
   try {
    
   
    let user=await User.findOne({email:req.body.email})
    if(user)
    {   success=false
        return res.status(400).json({ success,error: "sorry a user with this email already exists" });
    }
    const salt=await bcrypt.genSalt(10)
    const secPass=await bcrypt.hash(req.body.password,salt)   
      user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,

      })
      const data={
        user:{
        data:user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET)
      // res.json(user)
      res.json({success,authToken})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }


    //   .then(user => res.json(user))
    //     .catch(err=>{console.log(err)
    //     res.json({error:"please enter a valid email",message:err.message})})
    
})

// route 2: authenticate a user using: post "/api/auth/login" . no login required
router.post('/login',[
  body("email","enter a valid email").isEmail(),
  body("password","password cannot be blank").exists()],
  async (req,res)=>{
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body
    try {
      let user=await User.findOne({email})
      if(!user)
      { success=false
        return res.status(400).json({ error: "sorry enter correct credentials" });
      }
      const passwordCompare=await bcrypt.compare(password,user.password)
      if(!passwordCompare)
      { success=false;
        return res.status(400).json({success, error: "sorry enter correct credentials" })
      }

      const data={
        user:{
        id:user.id
      }
      }
      const authToken=jwt.sign(data,JWT_SECRET)
      success=true;
      res.json({success,authToken})

    } catch (error) {
      console.log(error.message)
        res.status(500).send("some error occured")
    }
  })

// route 3: get loged in users details: post "/api/auth/getuser" . login required

router.post('/getuser',fetchuser,async (req,res)=>{
try {
  userId=req.user.id
  const user=await User.findById(userId).select("-password")  
  res.send(user)
} catch (error) {
  console.log(error.message)
        res.status(500).send("some error occured")
}
})


module.exports=router