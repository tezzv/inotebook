import React from 'react'
import { Link } from 'react-router-dom'
import notFoundImg from './images/404page.svg'

const NotFound = () => {

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '5vh'}}>
        <h1>404: Not Found</h1>
        <p>Go to:- <Link to="/">Home</Link></p>
        <img style={{width: "60vw", height: "60vh"}} src={notFoundImg} alt='404 NOT FOUND' />
    </div>
    </>
  )
}

export default NotFound