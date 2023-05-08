import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

const Login = () => {
    const context = useContext(noteContext);
    const { showAlert } = context;

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": credentials.email, "password": credentials.password }),
            });

            const result = await response.json();
            // console.log("Success:", result);
            if (result.authtoken) {
                localStorage.setItem('token', result.authtoken)
                setCredentials({ email: "", password: "" })
                showAlert("Login succesfully", "success")
                navigate('/')
            } else {
                showAlert(result.error, "danger")
            }

        } catch (error) {
            // console.error("Error:", error);
            showAlert(error, "danger")
        }
    }



    return (
        <>
            {!localStorage.getItem('token') && <h2 style={{ color: "#2F1C6A" }} className='my-3'>Please Login to Continue</h2>}
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} name='password' onChange={onChange} autoComplete='' required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login