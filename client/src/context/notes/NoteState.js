import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState=(props)=>{
  const host="http://localhost:5000";
 
   const [notes,setnotes]=useState([]);

   //get all notes
   const getNotes=async()=>{
    const response=await fetch(`${host}/api/notes/fetchnotes`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk3ZjU4MDgyOWIyYjNjNDM5OTYwZWE1In0sImlhdCI6MTc3MDMxODM5NH0.0-pRD3CSRI_J4gPZr8qEzR-7_7MDaRH9vheD7QWfmOw"
      }
    });
    const json=await response.json();
    setnotes(json);
   }

   //add a note

   const addNote=async (title,description,tag)=>{

     const response=await fetch(`${host}/api/notes/addnote`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk3ZjU4MDgyOWIyYjNjNDM5OTYwZWE1In0sImlhdCI6MTc3MDMxODM5NH0.0-pRD3CSRI_J4gPZr8qEzR-7_7MDaRH9vheD7QWfmOw"
      },
      body:JSON.stringify({title,description,tag})
    });
    const json=await response.json();
    setnotes(json);

    const newNote={
      "_id": "69942bb4871c691e062147e25",
      "user": "697f580829b2b3c439960ea5",
      "title": title,
      "description": description,
      "tag": tag,
      "date": new Date().toISOString(),
      "__v": 0
    }
    setnotes(notes.concat(newNote));
    }

   //delete a note
   const deleteNote=async (id)=>{

         const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk3ZjU4MDgyOWIyYjNjNDM5OTYwZWE1In0sImlhdCI6MTc3MDMxODM5NH0.0-pRD3CSRI_J4gPZr8qEzR-7_7MDaRH9vheD7QWfmOw"
      },
     
    });


    setnotes(notes.filter((note)=>note._id!==id));
   }

   //edit a note
    const editNote=async (id,title,description,tag)=>{
       const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      },
      body:JSON.stringify({title,description,tag})
    });
    const json=await response.json();
    setnotes(json);


      setnotes(notes.map((note)=>{
        if(note._id===id){
          return {...note,title,description,tag}
        }
        return note;
      }))
    }

    
    
return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
    {props.children}
    </NoteContext.Provider>
)
}


export default NoteState;