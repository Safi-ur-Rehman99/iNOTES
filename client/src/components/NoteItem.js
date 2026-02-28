import React from 'react'
import {useContext} from "react";
import NoteContext from '../context/notes/NoteContext';
import { motion } from 'framer-motion';


const NoteItem = (props) => {
  const {note,updateNote} = props;
  const context= useContext(NoteContext); 
  const {deleteNote}=context;
  return (
    <>
           <div className="col-md-4" key={note._id}>
            <motion.div
              className="card my-3 accent-top"
              whileHover={{ y: -6, boxShadow: '0 8px 30px rgba(255,215,0,0.15)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                {note.tag && <span className="note-tag">{note.tag}</span>}
                <div className="note-actions">
                  <motion.i
                    className="fa-regular fa-trash-can delete-icon"
                    onClick={()=>deleteNote(note._id)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title="Delete note"
                  />
                  <motion.i
                    className="fa-regular fa-pen-to-square"
                    onClick={()=>updateNote(note)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title="Edit note"
                  />
                </div>
              </div>
            </motion.div>
          </div>
    </>
  )
}

export default NoteItem
