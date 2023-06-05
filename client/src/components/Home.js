import React, { useEffect, useState } from 'react';
import Notes from './Notes';
// import gotoTopIcon from '../components/images/go to top icon.svg';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const context = useContext(noteContext);
  const { getUser, back } = context;

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem('token')) {
      getUser(localStorage.getItem('token'));
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);

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

      {loading &&
        <div style={{ height: '60vh' }} className='d-flex justify-content-center align-items-center'>
          {/* <div style={{ width: '20vmin', height: '20vmin' }} className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> */}
          <div 
          style={{ width: '20vmin', height: '20vmin' }} 
          className="custom-loader"></div>
        </div>
      }

      {!loading && localStorage.getItem('name') && <h5 style={{ marginTop: "30px" }}>Hi! {localStorage.getItem('name')}</h5>}
      {!loading && !localStorage.getItem('token') && <h2 style={{ color: "#ff5200" }} className='my-3'>Please <Link to='/login'>Login</Link> to Continue</h2>}

      {!loading && <Notes />}

      {!loading &&
        <div style={{ position: "fixed", bottom: "20px", right: "20px", cursor: "pointer" }}
          className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
          onClick={gotoTotp} title='Goto top'  >
          <i className="fa-solid fa-circle-up fa-2xl" />
        </div>
      }


    </>
  )
}

export default Home