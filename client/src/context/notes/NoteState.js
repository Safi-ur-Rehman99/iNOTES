import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState=(props)=>{
  const host="http://localhost:5000";
 
   const [notes,setnotes]=useState([]);

   //get all notes
   const getNotes=async()=>{
    try {
    const response=await fetch(`${host}/api/notes/fetchnotes`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk3ZjU4MDgyOWIyYjNjNDM5OTYwZWE1In0sImlhdCI6MTc3MDMxODM5NH0.0-pRD3CSRI_J4gPZr8qEzR-7_7MDaRH9vheD7QWfmOw"
      }
    });
    const json=await response.json();
    if(response.ok){
      setnotes(json);
    } else {
      props.showAlert("Failed to fetch notes", "danger");
    }
    } catch (error) {
      props.showAlert("Server error. Could not fetch notes", "danger");
    }
   }

   //add a note

   const addNote=async (title,description,tag)=>{
    try {
     const response=await fetch(`${host}/api/notes/addnote`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk3ZjU4MDgyOWIyYjNjNDM5OTYwZWE1In0sImlhdCI6MTc3MDMxODM5NH0.0-pRD3CSRI_J4gPZr8qEzR-7_7MDaRH9vheD7QWfmOw"
      },
      body:JSON.stringify({title,description,tag})
    });
    const note=await response.json();
    if(response.ok){
      setnotes(notes.concat(note));
      props.showAlert("Note added successfully", "success");
    } else {
      props.showAlert("Failed to add note", "danger");
    }
    } catch (error) {
      props.showAlert("Server error. Could not add note", "danger");
    }
    }

   //delete a note
   const deleteNote=async (id)=>{
    try {
         const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk3ZjU4MDgyOWIyYjNjNDM5OTYwZWE1In0sImlhdCI6MTc3MDMxODM5NH0.0-pRD3CSRI_J4gPZr8qEzR-7_7MDaRH9vheD7QWfmOw"
      },
     
    });
    if(response.ok){
      setnotes(notes.filter((note)=>note._id!==id));
      props.showAlert("Note deleted successfully", "success");
    } else {
      props.showAlert("Failed to delete note", "danger");
    }
    } catch (error) {
      props.showAlert("Server error. Could not delete note", "danger");
    }
   }

   //edit a note
    const editNote=async (id,title,description,tag)=>{
      try {
       const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk3ZjU4MDgyOWIyYjNjNDM5OTYwZWE1In0sImlhdCI6MTc3MDMxODM5NH0.0-pRD3CSRI_J4gPZr8qEzR-7_7MDaRH9vheD7QWfmOw"
      },
      body:JSON.stringify({title,description,tag})
    });
    if(response.ok){
      setnotes(notes.map((note)=>{
        if(note._id===id){
          return {...note,title,description,tag}
        }
        return note;
      }));
      props.showAlert("Note updated successfully", "success");
    } else {
      props.showAlert("Failed to update note", "danger");
    }
      } catch (error) {
        props.showAlert("Server error. Could not update note", "danger");
      }
    }

    
    
return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
    {props.children}
    </NoteContext.Provider>
)
}


export default NoteState;