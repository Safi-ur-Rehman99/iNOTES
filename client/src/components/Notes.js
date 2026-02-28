import { useEffect,useState,useContext, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const [note,setNote]=useState({id:"",uTitle:"",uDescription:"",uTag :""})

  const ref = useRef(null);
  const refClose = useRef(null);
  const alertShown = useRef(false);

  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      if (!alertShown.current) {
        alertShown.current = true;
        props.showAlert("Please login to access your notes", "warning");
      }
      return;
    }
    getNotes();
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,uTitle:currentNote.title,uDescription:currentNote.description,uTag:currentNote.tag})
  }

  
      const handleClick=(e)=>{
          e.preventDefault();
          editNote(note.id,note.uTitle,note.uDescription,note.uTag);
          refClose.current.click();
      }
  
       const onChange=(e)=>{
          setNote({...note,[e.target.name]:e.target.value})
  
      }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

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
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  <i className="fa-solid fa-pen-to-square" style={{ color: '#FFD700', marginRight: '8px' }} />
                  Edit Note
                </h1>
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
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                <button type="button"  className="btn btn-primary" onClick={handleClick}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>
        <h2 className="section-heading" style={{ color: 'var(--white)' }}>
          <i className="fa-solid fa-layer-group" style={{ color: '#FFD700', marginRight: '10px', fontSize: '1.3rem' }} />
          All Notes
        </h2>
        <hr className="section-divider" />
      </div>

      {notes.length === 0 ? (
        <div className="empty-state">
          <i className="fa-regular fa-note-sticky" style={{ display: 'block' }} />
          <h3>No notes yet</h3>
          <p>Create your first note using the form above to get started.</p>
        </div>
      ) : (
        <motion.div
          className="row"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note} updateNote={updateNote} />
          })}
        </motion.div>
      )}
    </>
  )
}

export default Notes
