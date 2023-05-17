/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import iNotebookLogo from './components/images/inotenook logo1 svg.svg';
import { useContext } from 'react';
import noteContext from './context/notes/noteContext';
import notedInLogo from './components/images/notedin logo.svg'
// import notedinLogo2 from './components/images/notedin logo 2.svg'



const Navbar = () => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { setNotes, showAlert } = context;

    const logouthandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        setNotes([]);
        showAlert("Logout succesfully", "success")
        navigate("/login");
    }

    const location = useLocation();

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    {/* <Link className="navbar-brand" to="/">Navbar</Link> */}
                    {/* <Link className="navbar-brand" to="/"><img style={{ height: "40px", width: "60px" }} src={iNotebookLogo} /></Link> */}
                    <Link className="navbar-brand" to="/"><img style={{ height: "40px", width: "71px" }} src={notedInLogo} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <div className='d-flex'>
                            {!localStorage.getItem('token') && <Link className="btn btn-primary mx-1" to="/login" >Login</Link>}
                            {!localStorage.getItem('token') && <Link className="btn btn-primary mx-1" to="/signup" >Signup</Link>}

                            {localStorage.getItem('token') && <button className="btn btn-primary mx-1" onClick={logouthandler} >Logout</button>}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar