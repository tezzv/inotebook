import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container my-3'>
                <h2>Add a Note</h2>
                <form className='my-3 addNote'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control bg-transparent" id="title" name="title" onChange={onChange} value={note.title} minLength={3} placeholder='Enter Title (minimum 3 characters)' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" className="form-control bg-transparent" id="description" name="description" onChange={onChange} value={note.description} minLength={5} placeholder='Enter Description (minimum 5 characters)' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control bg-transparent" id="tag" name="tag" onChange={onChange} value={note.tag} minLength={2} placeholder='Enter Tag (optional)' />
                    </div>
                    <button disabled={note.title.length < 3 || note.description.length < 5 || !localStorage.getItem('token')} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote