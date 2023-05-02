import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a = useContext(noteContext);

  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      This is About
      This is About <strong>{a.state.name}</strong> and he is in class <strong>{a.state.class}</strong>
      
    </div>
  )
}

export default About