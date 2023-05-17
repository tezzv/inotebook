import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

function Alert(props) {
    const context = useContext(noteContext);
    const { alert } = context;

    const capitalize = (word) => {
        if (word === "danger") {
            word = "error"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <>
            <div >
                {alert && <div style={{ height: '50px', width: "100vw", zIndex: "100", position: "fixed" }} className={`alert alert-${alert.type} alert-dismissible fade show d-flex justify-content-center align-items-center`} role="alert">
                    <strong>{capitalize(alert.type)}</strong>: {alert.msg}
                </div>}
            </div>
        </>
    )
}

export default Alert