import React from 'react'
import { toggleSidebar } from '../features/user/userSlice'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {links} from '../utils/links';
import { NavLink } from 'react-router-dom';
import Logo from '../components/Logo';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
  const {isSidebarOpen} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const toggle = () =>{
    dispatch(toggleSidebar());
  }

  return (
    <main className='smallSidebar'>
      <div  className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }>
        <div className='content'>
          <button className='close-btn' onClick={toggle}><FaTimes/></button>
          <header>
            <Logo/>
          </header>
          <div className='nav-links'>
           <NavLinks toggleSidebar={toggle}/>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SmallSidebar