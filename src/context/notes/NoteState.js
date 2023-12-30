import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{

const notesInitial=[]

    const [notes,setNotes]=useState(notesInitial)


// get all notes 
const getNotes= async()=>{
  // api calls
  // https://localhost:5000/api/notes/fetchallnotes it should come like this but we have to mention https://localhost:5000 in package.json as proxy then it will append https://localhost:5000 by itself behind /api
  const response = await fetch(`/api/notes/fetchallnotes`, {
   method: "GET", 
   headers: {
     "Content-Type": "application/json",
     "auth-token":localStorage.getItem("token")
   },
   
 });
 const json= await response.json(); 
 console.log(json)
 setNotes(json)


}

// add a note 
const addNote= async(title,description,tag)=>{
   // api calls
   const response = await fetch(`/api/notes/addnotes`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem("token")
    },
    body: JSON.stringify({title,description,tag}), 
  });
  const note=await response.json()
  setNotes(notes.concat(note))
}

// delete a node
const deleteNote=async (id)=>{
  // api calls
  const response = await fetch(`/api/notes/deletenote/${id}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem("token")
    },
  });
  const json= await response.json();
  console.log(json)
  
  console.log("deleting a node with id"+id)
  const newNotes=notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes)
}

//edit a node
const editNote=async (id,description,title,tag)=>{
  // api calls
  const response = await fetch(`/api/notes/updatenote/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem("token")
    },
    body: JSON.stringify({title,description,tag}), 
  });
  const json= await response.json(); 
  console.log(json)

  // logic to edit in client 
  const newNotes=JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if(element._id===id)
    {
      newNotes[index].description=description
      newNotes[index].title=title
      newNotes[index].tag=tag
      break;
    }
  }
  setNotes(newNotes)
}

     return(
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>
          {props.children}
        </NoteContext.Provider>
     )

}

export default NoteState