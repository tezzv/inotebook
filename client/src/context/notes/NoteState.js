import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    let host = "http://localhost:5000";
    const authToken = localStorage.getItem('token');

    if (process.env.NODE_ENV === 'production') {
        host = "/"
    }

    // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTVlNDM1NmI0MDg5N2ZkMTUyZDM2In0sImlhdCI6MTY4Mjg1NzUzOX0.d_FmcoHO4qSxH4SowcTTCDU4afA46myDhDP2eGpCRjs";
    // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0Y2Y5ODFjODgxOWUyNzA1MjgxMDMwIn0sImlhdCI6MTY4MzExNTEzN30.BcXICOKJ5ryJ9DmUWYUBRP9PiP-l_ifhjafS4VkdQXs";

    // const initialNotes = []

    const [notes, setNotes] = useState("");

    // Fetch all Notes
    const getNotes = async (authToken) => {
        // API Call

        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": authToken
                }
            });

            const json = await response.json()
            // console.log("Success:", json);
            setNotes(json)
        } catch (error) {
            // console.error("Error:", error);
            showAlert(error, "danger")
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
                    "auth-token": authToken
                },
                body: JSON.stringify({ "title": title, "description": description, "tag": tag }),
            });

            const result = await response.json();
            // console.log("Success:", result);
            getNotes(authToken);
            if (!result.error) {
                showAlert("Note added succesfully", "success")
            } else {
                showAlert(result.error, "danger")
            }
            // setNotes(notes.concat(result));
        } catch (error) {
            // console.error("Error:", error);
            showAlert(error, "danger")
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
                    "auth-token": authToken
                }
            });

            const result = await response.json();
            // console.log("Success:", result);
            getNotes(authToken);
            if (!result.error) {
                showAlert("Note deleted succesfully", "success")
            } else {
                showAlert(result.error, "danger")
            }
            // setNotes(notes.concat(result));
        } catch (error) {
            // console.error("Error:", error);
            showAlert(error, "danger")
        }

    }




    // Edit a note
    const editNote = async (note) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${note.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": authToken
                },
                body: JSON.stringify({ "title": note.etitle, "description": note.edescription, "tag": note.etag }),
            });

            const result = await response.json();
            // console.log("Success:", result);
            getNotes(authToken);
            if (!result.error) {
                showAlert("Note updated succesfully", "success")
            } else {
                showAlert(result.error, "danger")
            }
            // setNotes(notes.concat(result));
        } catch (error) {
            // console.error("Error:", error);
            showAlert(error, "danger")
        }
    }

    // Alert
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

    const getUser = async (authToken) => {
        // API Call

        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": authToken
                }
            });

            const result = await response.json()
            if(result.name){
                localStorage.setItem('name', result.name)
            }
        } catch (error) {
            // console.error("Error:", error);
            showAlert(error, "danger")
        }
    }
 

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes, alert, showAlert, getUser }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;