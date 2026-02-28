import React from 'react'
import { useState } from 'react'
import {useContext} from "react";
import NoteContext from '../context/notes/NoteContext';
import { motion } from 'framer-motion';

const AddNote = () => {
      const context = useContext(NoteContext);
const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
    }

     const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }

  return (
    <motion.div
      className="glass-card add-note-wrapper accent-top"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h2 className="text-gradient-gold" style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem' }}>
        <i className="fa-solid fa-plus" style={{ marginRight: '8px', fontSize: '1rem', WebkitTextFillColor: 'initial', color: '#FFD700' }} />
        Create a Note
      </h2>
      <form>
        <div className="mb-3">
          <label htmlFor="Title" className="form-label">Title</label>
          <input type="text" className="form-control" id="Title" name="title" placeholder="Enter note title..." value={note.title} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">Description</label>
          <input type="text" className="form-control" id="Description" name="description" placeholder="What's on your mind?" value={note.description} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="Tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="Tag" name="tag" placeholder="e.g. Personal, Work..." value={note.tag} onChange={onChange} />
        </div>
        <motion.button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ minWidth: '140px' }}
        >
          <i className="fa-solid fa-paper-plane" style={{ marginRight: '6px' }} />
          Add Note
        </motion.button>
      </form>
    </motion.div>
  )
}

export default AddNote
