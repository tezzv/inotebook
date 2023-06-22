import React from 'react';
import classes from './login.module.css';

const About = () => {
  document.title = 'NOTEDiN- About';
  return (
    <>
      {/* <div
        style={{
          backgroundImage: `url(${back})`,
          opacity: '.5'
        }}
        className="bg1"
      /> */}
      <div className={classes.anim1} >

        <div style={{
          marginTop: "1rem",
          whiteSpace: 'pre-wrap',
          marginRight: '.5rem'
        }}>
          Welcome to our <a target="_blank" rel="noreferrer" href='https://www.mongodb.com/mern-stack#:~:text=MERN%20stands%20for%20MongoDB%2C%20Express,a%20client%2Dside%20JavaScript%20framework'>MERN</a>-based CRUD notes app! NOTEDiN, Our application is designed to provide a seamless and intuitive experience for managing your notes.<br /><br />

          We understand the importance of being able to easily store and access notes, which is why we created this app using the MERN (MongoDB, Express, React, Node.js) stack. This combination of technologies provides a robust and scalable platform for building web applications.<br /><br />

          With our app, you can create, read, update, and delete notes with ease. The intuitive user interface allows you to quickly add new notes and organize them with customizable tags. You can also search for notes using keywords or tags to quickly find what you're looking for.<br /><br />

          Our app also includes features such as user authentication, which ensures that your notes are only accessible by you. Additionally, we use industry-standard security measures to protect your data, so you can rest assured that your notes are safe.<br /><br />

          Whether you're a student, a professional, or just someone who likes to stay organized, our MERN-based CRUD notes app is the perfect solution for managing your notes. Try it out today and experience the convenience and ease of use for yourself!</div>
        <div style={{ marginBottom: '4rem', marginTop: '2rem' }}>
          <h5 className='my-2'>How to use NOTEDiN</h5>
          <h6>:- Login / Create a new account (Pease save your credentials securely)</h6>
          <h6>:- Add new notes using add note form on home tab</h6>
          <h6>:- Update note using <i className="fa-sharp fa-solid fa-pen-to-square mx-2" /> button</h6>
          <h6>:- Delete note using <i className="fa-solid fa-trash-can mx-2" /> button</h6>
          <p>
            For any query contact us via email at:-<br />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '.5rem' }}>
              <i className="fa-regular fa-envelope"></i>
              <a style={{textDecoration: 'none', color: 'black'}} href="mailto:tejveersingh250@gmail.com" >tejveersingh250@gmail.com</a>
            </div>
          </p>
        </div>
      </div>
    </>
  )
}

export default About