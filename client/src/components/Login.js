import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
import classes from './login.module.css';

const Login = () => {
    const context = useContext(noteContext);
    const { showAlert, host, back } = context;

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault()

        try {
            const response = await fetch(`${host}/api/auth/login`, {
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
                setTimeout(() => {
                    setCredentials({ email: "", password: "" })
                    setLoading(false);
                    showAlert("Login succesfully", "success")
                    navigate('/')
                }, 1500);
            } else {
                setTimeout(() => {
                    setLoading(false);
                    showAlert(result.error, "danger")
                }, 1000);
            }

        } catch (error) {
            // console.error("Error:", error);
            setTimeout(() => {
                setLoading(false);
                showAlert(error, "danger")
            }, 1000);
        }
    }

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${back})`
                }}
                className="bg1"
            />
            <div className={classes.anim1 + ' authContainer'}>
                <div className='authContainer1 authContainer1Login'>
                    <div className='authHeading1'>
                        {!localStorage.getItem('token') && <h4 style={{ color: "#fff", textAlign: 'center' }} className='my-3'>Please Login to Continue</h4>}
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" aria-describedby="passwordHelp" value={credentials.password} name='password' onChange={onChange} autoComplete='' required />
                            <div id="passwordHelp" className="form-text">Do not have an account create <Link to='/signup'>here</Link></div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {loading &&
                                <div style={{ width: '24px', height: '24px', margin: '0 11px 0 11px' }} className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                            {!loading && 'Submit'}
                        </button>
                    </form>
                </div>
            </div >
        </>
    )
}

export default Login