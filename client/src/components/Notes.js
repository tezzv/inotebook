import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import classes from './login.module.css';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes(localStorage.getItem('token'));
        }

        // eslint-disable-next-line
    }, [])


    const ref = useRef(null);
    const closeRef = useRef(null);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const [rnote, setRnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
        setRnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const resetHandler = () => {
        setNote({ ...note, etitle: rnote.etitle, edescription: rnote.edescription, etag: rnote.etag });
    }

    const handleClick = (e) => {
        e.preventDefault();
        // console.log(note);
        editNote(note);
        closeRef.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className={classes.anim1}>
                <AddNote />
            </div>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {/* UPDATE form */}
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value={note.etitle} placeholder='Enter Title (minimum 3 characters)' required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} placeholder='Enter Description (minimum 5 characters)' required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} placeholder='Enter Tag (minimum 2 characters)' />
                                </div>
                                <input type='reset' onClick={resetHandler} />
                            </form>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 3 || note.edescription.length < 5 || note.etag.length < 2} className="btn btn-primary" onClick={handleClick} >Update Note</button>
                        </div>

                    </div>
                </div>
            </div>
            <h2>Your Notes</h2>
            {notes.length === 0 && <p>No note to display 😞. Please add some notes.</p>}
            <div className='row my-3'>
                {notes.length > 0 && localStorage.getItem('token') && notes.map((note) => (
                    <Noteitem key={note._id} updateNote={updateNote} note={note} />
                ))}
            </div>
        </>
    )
}

export default Notes