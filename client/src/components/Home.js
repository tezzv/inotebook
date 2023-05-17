import React, { useEffect } from 'react';
import Notes from './Notes';
// import gotoTopIcon from '../components/images/go to top icon.svg';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Home = () => {
  const context = useContext(noteContext);
  const { getUser } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser(localStorage.getItem('token'));
    }

    // eslint-disable-next-line
  }, [])

  const gotoTotp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (


    <>
      {localStorage.getItem('name') && <h5 style={{ marginTop: "30px" }}>Hi! {localStorage.getItem('name')}</h5>}
      {!localStorage.getItem('token') && <h2 style={{ color: "#ff5200" }} className='my-3'>Please Login to Continue</h2>}
      <Notes />
      <div style={{ position: "fixed", bottom: "20px", right: "20px", cursor: "pointer" }} onClick={gotoTotp}  >
        <i className="fa-solid fa-circle-up fa-2xl" />
      </div>
    </>
  )
}

export default Home