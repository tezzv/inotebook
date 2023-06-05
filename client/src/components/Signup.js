import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
import classes from './login.module.css';

const Signup = () => {
  const context = useContext(noteContext);
  const { showAlert, host, back } = context;

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", cpassword: "", password: "" })

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const { name, email, password } = credentials;

      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": name, "email": email, "password": password }),
      });

      const result = await response.json();
      // console.log("Success:", result);


      if (result.authtoken) {
        localStorage.setItem('token', result.authtoken)

        setTimeout(() => {
          setCredentials({ email: "", password: "" })
          setLoading(false);
          showAlert("Signup succesfully", "success")
          navigate('/')
        }, 2000);

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
      <div
        style={{
          backgroundImage: `url(${back})`
        }}
        className="bg1"
      />
      <div className={classes.anim1 + ' authContainer'}>
        <div className='authContainer1'>
          <div className='authHeading1'>
            {!localStorage.getItem('token') && <h4 style={{ color: "#fff", textAlign: 'center' }} className='my-3'>Please create an Account </h4>}
          </div>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} minLength={3} placeholder='Name must be atleast 3 characters' required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} placeholder='Enter a valid email' required />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" value={credentials.password} name='password' onChange={onChange} minLength={5} placeholder='Password must be atleast 5 characters' autoComplete='' required />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="cpassword" aria-describedby="passwordHelp" value={credentials.cpassword} name='cpassword' onChange={onChange} autoComplete='' required onPaste={(e) => { e.preventDefault() }} />
              <div id="passwordHelp" className="form-text"><strong>Please save your password carefully.</strong></div>
              <div id="passwordHelp" className="form-text">Already have an account login <Link to='/login'>here</Link></div>
            </div>
            <button type="submit" disabled={credentials.password !== credentials.cpassword} className="btn btn-primary">
              {loading &&
                <div style={{ width: '24px', height: '24px', margin: '0 11px 0 11px' }} className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              }
              {!loading && 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup