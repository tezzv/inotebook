import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";

    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes);

    // Fetch all Notes
    const getNotes = async () => {
        // API Call

        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTVlNDM1NmI0MDg5N2ZkMTUyZDM2In0sImlhdCI6MTY4Mjg1NzUzOX0.d_FmcoHO4qSxH4SowcTTCDU4afA46myDhDP2eGpCRjs"
                }
            });

            const json = await response.json()
            // console.log("Success:", json);
            setNotes(json)
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // API Call

        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTVlNDM1NmI0MDg5N2ZkMTUyZDM2In0sImlhdCI6MTY4Mjg1NzUzOX0.d_FmcoHO4qSxH4SowcTTCDU4afA46myDhDP2eGpCRjs"
                },
                body: JSON.stringify({ "title": title, "description": description, "tag": tag }),
            });

            const result = await response.json();
            console.log("Success:", result);
            getNotes();
            // setNotes(notes.concat(result));
        } catch (error) {
            console.error("Error:", error);
        }

    }


    // Delete a note
    const deleteNote = async (id) => {
        // console.log(id);
        // console.log(`${host}api/notes/deletenote/${id}`);
        // API Call
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTVlNDM1NmI0MDg5N2ZkMTUyZDM2In0sImlhdCI6MTY4Mjg1NzUzOX0.d_FmcoHO4qSxH4SowcTTCDU4afA46myDhDP2eGpCRjs"
                }
            });

            const result = await response.json();
            console.log("Success:", result);
            getNotes();
            // setNotes(notes.concat(result));
        } catch (error) {
            console.error("Error:", error);
        }

    }


    // Edit a note
    const editNote = async (note) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${note.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTVlNDM1NmI0MDg5N2ZkMTUyZDM2In0sImlhdCI6MTY4Mjg1NzUzOX0.d_FmcoHO4qSxH4SowcTTCDU4afA46myDhDP2eGpCRjs"
                },
                body: JSON.stringify({ "title": note.etitle, "description": note.edescription, "tag": note.etag }),
            });

            const result = await response.json();
            console.log("Success:", result);
            getNotes();
            // setNotes(notes.concat(result));
        } catch (error) {
            console.error("Error:", error);
        }
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;