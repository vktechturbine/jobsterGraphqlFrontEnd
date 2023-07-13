import React from 'react'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'
import Main from '../components/Main'

const Landing = () => {
  return (
   <main>
    <nav className='nav'>
        <Logo/>
    </nav>
    <div className='container page'>
        <div className='info'>
            <h1>
                Job <span>Tracking</span> App
            </h1>
            <p>Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up fixie raclette taxidermy craft beer. Brunch bitters synth, VHS crucifix heirloom meggings bicycle rights.</p>
            
            <Link to="/register" className="btn btn-hero">Login/Register</Link>
        </div>
        <Main/>
    </div>
   </main>
  )
}

export default Landing