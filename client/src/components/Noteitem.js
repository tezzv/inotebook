import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import ReactLinkify from 'react-linkify';


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const deleteNote1 = () => {
        const confirmed = window.confirm('Are you sure you want to delete this Note?');
        if (confirmed) {
            // Perform deletion logic here
            deleteNote(note._id)
        }
    }

    const utcDate = new Date(note.date);
    const options = { timeZone: 'Asia/Kolkata' };
    const istDate = utcDate.toLocaleString('en-IN', options);

    return (
        <>
            <div className='col-md-3'>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} className="card my-3" >
                    <div className="card-body">
                        <div className='d-flex align-items-center justify-content-between'>
                            <h5 className="card-title">{note.title}</h5>
                            <div>
                                <i className="fa-solid fa-trash-can mx-2" onClick={deleteNote1} />
                                <i className="fa-sharp fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }} alt="edit" />
                            </div>
                        </div>
                        <ReactLinkify>
                            <p className="card-text" style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>
                        </ReactLinkify>
                    </div>
                    <div className="card-footer">
                        <div className='row'>
                            <small style={{ fontSize: "10px" }} className="text-body-secondary"><strong>Tag:</strong> {note.tag}</small>
                            <small style={{ fontSize: "10px" }} className="text-body-secondary"><strong>Created on:</strong> {istDate}</small>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem