const express=require('express')
const router=express.Router()
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
// route 1: get all the notes using get "api/notes/fetchallnotes" 
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
  try {
  
    const notes =await Notes.find({user:req.user.id})
    res.json(notes)
      
  } catch (error) {
    console.log(error.message)
      res.status(500).send("some error occured")
  }
})

// route 2: add a new node using post "api/notes/addnote" 
router.post('/addnotes',fetchuser,[body('title','enter a valid title').isLength({min:3}),
body('description','description must be atleast 5 charector').isLength({min:5})
],async (req,res)=>{
try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let note=await Notes.create({
        title: req.body.title,
        description: req.body.description,
        user:req.user.id

      })
      res.json(note)
    } catch (error) {
      console.log(error.message)
      res.status(500).send("some error occured")
    }

})

// route 3: update a existing node using put "api/notes/updatenote"

router.put('/updatenote/:id',fetchuser,async (req,res)=>{
const {title,description,tag}=req.body;
try {
const newnote={}
// if(req.body.title)
if(title){ newnote.title=title;} 
if(description){ newnote.description=description;} 
if(tag){ newnote.tag=tag;} 

// find the note to be updated and update it

let note= await Notes.findById(req.params.id)
if(!note)
{
  return res.status(404).send("not found")
}
if(note.user.toString() != req.user.id)
{
  return res.status(404).send("not allowed")
}
 note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
res.json({note})
} catch (error) {
  console.log(error.message)
        res.status(500).send("some error occured")
}
})


// route 3: delete a existing node using delete "api/notes/deletenote"

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
  try {
  let note= await Notes.findById(req.params.id)
  if(!note)
  {
    return res.status(404).send("not found")
  }
  if(note.user.toString() != req.user.id)
  {
  return res.status(404).send("not allowed")
  }
  note=await Notes.findByIdAndDelete(req.params.id)  
  res.json({"sucess": "note has been deleted",note})
} catch (error) {
  console.log(error.message)
  res.status(500).send("some error occured")
}
})

module.exports=router