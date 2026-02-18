import React from 'react'
import {useContext} from "react";
import NoteContext from '../context/notes/NoteContext';

import NoteItem from './NoteItem';


const Notes = () => {
    const context = useContext(NoteContext);
const {notes,setnotes}=context;
  return (
    <div>
    <div className="row my-3">
    {notes.map((note)=>{
        return <NoteItem key={note._id} note={note}/>
    })}
    </div>

      
    </div>
  )
}

export default Notes
