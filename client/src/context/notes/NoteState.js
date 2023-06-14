import { useEffect, useState } from "react";
import NoteContext from "./noteContext";
import futuristicImg from './bakgrounds/futuristic3.jpg';
import classicImg from './bakgrounds/classic3.jpg';
import coolImg from './bakgrounds/cool.jpg';

const NoteState = (props) => {

    const authToken = localStorage.getItem('token');


    let host = "http://localhost:5000"; // Default host for development

    if (process.env.NODE_ENV === 'production') {
        host = "https://notedin-api.vercel.app"; // API host for production
    }


    // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZTVlNDM1NmI0MDg5N2ZkMTUyZDM2In0sImlhdCI6MTY4Mjg1NzUzOX0.d_FmcoHO4qSxH4SowcTTCDU4afA46myDhDP2eGpCRjs";
    // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0Y2Y5ODFjODgxOWUyNzA1MjgxMDMwIn0sImlhdCI6MTY4MzExNTEzN30.BcXICOKJ5ryJ9DmUWYUBRP9PiP-l_ifhjafS4VkdQXs";

    // const initialNotes = []

    const [notes, setNotes] = useState([]);

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
            // console.log(json)
            if (json.error === "Please authenticate using a valid token") {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                setNotes([]);
                return
            } else {
                setNotes(json.reverse())
            }
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
            // console.log(result)
            if (result.error === "Please authenticate using a valid token") {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                setNotes([]);
            }
            if (result.name) {
                localStorage.setItem('name', result.name)
            }
        } catch (error) {
            // console.error("Error:", error);
            showAlert(error, "danger")
        }
    }

    // let back = futuristicImg;
    const [back, setBack] = useState(futuristicImg)

    useEffect(() => {
        if (localStorage.getItem('theme') === 'futuristic') {
            setBack(futuristicImg)
        }

        if (localStorage.getItem('theme') === 'cool') {
            setBack(coolImg)
        }
        if (localStorage.getItem('theme') === 'classic') {
            setBack(classicImg)
        }
        if (localStorage.getItem('theme') === 'none') {
            setBack('')
        }
    }, [back, setBack])



    const futuristic = () => {
        setBack(futuristicImg)
        localStorage.setItem('theme', 'futuristic');
    }
    const cool = () => {
        setBack(coolImg)
        localStorage.setItem('theme', 'cool');
    }
    const classic = () => {
        setBack(classicImg)
        localStorage.setItem('theme', 'classic');
    }
    const None = () => {
        setBack('')
        localStorage.setItem('theme', 'none');
    }


    return (
        <NoteContext.Provider value={{
            notes, setNotes, addNote, deleteNote, editNote, getNotes, alert, showAlert,
            getUser, host, back, classic, futuristic, cool, None
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;