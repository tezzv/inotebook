import React, { useEffect, useState } from 'react';
import Notes from './Notes';
// import gotoTopIcon from '../components/images/go to top icon.svg';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const context = useContext(noteContext);
  const { getUser, back } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser(localStorage.getItem('token'));
    }

    // eslint-disable-next-line
  }, [])

  const gotoTotp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add scroll event listener to track the user's scroll position
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // Check if the user has scrolled more than 100vh
    if (window.pageYOffset > .01 * window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (


    <>
      <div
        style={{
          backgroundImage: `url(${back})`,
        }}
        className="bg1"
      />

      {localStorage.getItem('name') && <h5 style={{ marginTop: "30px" }}>Hi! {localStorage.getItem('name')}</h5>}
      {!localStorage.getItem('token') && <h2 style={{ color: "#ff5200" }} className='my-3'>Please <Link to='/login'>Login</Link> to Continue</h2>}
      <Notes />
      
      
      <div style={{ position: "fixed", bottom: "20px", right: "20px", cursor: "pointer" }}
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
       onClick={gotoTotp} title='Goto top'  >
        <i className="fa-solid fa-circle-up fa-2xl" />
      </div>
      
    </>
  )
}

export default Home