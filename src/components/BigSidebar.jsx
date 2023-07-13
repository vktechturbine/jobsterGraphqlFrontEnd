import React from 'react'
import { useSelector } from 'react-redux'
import Logo from './Logo';
import NavLinks from './NavLinks';

const BigSidebar = () => {
  const {isSidebarOpen} = useSelector((state) => state.user);
  return (
    <main className='bigSideBar'>
        <div className={isSidebarOpen?'sidebar-container':'sidebar-container show-sidebar'}>
          <div className='content'>
            <header>
              <Logo/>
            </header>
            <NavLinks/>
          </div>
        </div>
    </main>
  )
}

export default BigSidebar