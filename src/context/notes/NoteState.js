import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const initialState = {
        name : "Harry",
        class: "5b"
    }

    const [state, setstate] = useState(initialState);

    const update = () => {
        setTimeout(() => {
            setstate({
                name: "Tj",
                class: "10b"
            })
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;