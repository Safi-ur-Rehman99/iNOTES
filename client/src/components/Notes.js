import React, { useEffect,useState,useContext, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext';

import NoteItem from './NoteItem';
import AddNote from './AddNote';


const Notes = () => {
  const context = useContext(NoteContext);
      const [note,setNote]=useState({uTitle:"",uDescription:"",uTag :""})

  const ref = useRef(null);

  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({uTitle:currentNote.title,uDescription:currentNote.description,uTag:currentNote.tag})
  }

  
      const handleClick=(e)=>{
          e.preventDefault();

      }
  
       const onChange=(e)=>{
          setNote({...note,[e.target.name]:e.target.value})
  
      }

  return (
    <>
      <AddNote />
      <div>
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="uTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="uTitle" name="uTitle" value={note.uTitle} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="uDescription" className="form-label" >Description</label>
                    <input type="text" className="form-control" id="uDescription" name="uDescription" value={note.uDescription}  onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="uTag" className="form-label" >Tag</label>
                    <input type="text" className="form-control" id="uTag" name="uTag" value={note.uTag} onChange={onChange} />
                  </div>

                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"  className="btn btn-primary" onClick={handleClick}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} />
        })}
      </div>


    </>
  )
}

export default Notes
