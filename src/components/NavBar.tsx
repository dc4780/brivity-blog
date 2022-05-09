import React, { useState, useRef, useContext } from 'react';
import {Link, useLocation} from 'react-router-dom';
import classnames from 'classnames';
import { MdMenu, MdClose } from 'react-icons/md';
import { UserContext } from '../components/UserContext';

function Navbar() {
  //user
  const userContext = useContext(UserContext);

  const location = useLocation();
  const links = [
    {
      id: 1,
      name: 'Read',
      path: '/display-posts',
    },
    {
      id: 2,
      name: 'Add',
      path: '/add-post',
    },
    {
      id: 3,
      name: (userContext.user?.token) ? 'Log Out' : 'Sign In',
      path: (userContext.user?.token) ? '/log-out' : '/sign-in',
    }        
  ];

  const [ showMenuIcon, setShowMenuIcon ] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayMobileMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('hidden');
    }
    setShowMenuIcon(prevShowMenuIcon => !prevShowMenuIcon);
  }

  return (
    <header className="bg-gray-200">
      <nav className="relative container mx-auto my-0 p-5">
        <div className="flex flex-col sm:flex-row justify-between py-2 relative sm:items-baseline">
          <Link to="/display-posts" className="text-3xl font-black">
            Brivity Blog
          </Link>
          { showMenuIcon && <MdMenu className="absolute top-0 right-0 sm:hidden" size={48} onClick={displayMobileMenu} /> }
          { !showMenuIcon && <MdClose className="absolute top-0 right-0 sm:hidden" size={48} onClick={displayMobileMenu} /> }
          <div ref={menuRef} className="flex flex-col text-center mt-8 sm:flex-row space-y-10 sm:space-x-5 sm:mt-0 sm:text-left hidden sm:block">
            {
              links.map(link => (
                <Link key={link.id} to={link.path} className={classnames('hover:underline text-xl', { 'font-black underline text-green-700' : location.pathname === (link.path) })}
                 >{link.name}</Link>
              ))            
            } 
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
