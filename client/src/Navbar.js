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
            <nav
                style={{ backgroundColor: '#e3f2fd' }}
                className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    {/* <Link className="navbar-brand" to="/">Navbar</Link> */}
                    {/* <Link className="navbar-brand" to="/"><img style={{ height: "40px", width: "60px" }} src={iNotebookLogo} /></Link> */}
                    <Link className="navbar-brand" to="/"><img style={{ height: "40px", width: "71px" }} src={notedInLogo} /></Link>


                    <button class="navbar-toggler  border border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div style={{width: '60vw', backgroundColor: '#e3f2fd'}} class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">NOTEDiN</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                                </li>
                            </ul>
                            <div className='d-flex'>
                                {!localStorage.getItem('token') && <Link className="btn btn-outline-primary rounded-pill  mx-1" to="/login" >Login</Link>}
                                {!localStorage.getItem('token') && <Link className="btn btn-outline-primary rounded-pill mx-1" to="/signup" >Signup</Link>}

                                {localStorage.getItem('token') && <button className="btn btn-outline-danger rounded-pill" data-bs-dismiss="offcanvas" onClick={logouthandler} >Logout</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar