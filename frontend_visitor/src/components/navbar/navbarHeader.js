import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className='nav'>
      <div className='logo'>
        <Link to='/iWantTo' activeStyle className='logoBtn'>
          Lush Greenery
        </Link>
      </div>
      < div className='navMenu'>
      <Link to='iWantTo' activeStyle className='navBtn'>
          I Want To
        </Link>
        <Link to='/aboutUs' activeStyle className='navBtn'>
          About Us
        </Link>
        <Link to='/whatWeOffer' activeStyle className='navBtn'>
          What We Offer
        </Link>
        <Link to='/contactForm' activeStyle className='navBtn'>
          Contact Form
        </Link>
      </div>
    </div>
  );
};

export default Navbar;




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './navbar.css';

// function Navbar() {
//     const [click, setClick] = useState(false);

//     const handleClick = () => setClick(!click);
//     const closeMobileMenu = () => setClick(false);
//     return (
//         <>
//           <nav className='navbar'>
//             <div className='navbar-container'>
//               <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
//                 Lushgreenery
//                 <i class='fab fa-pagelines' />
//               </Link>
//               <div className='menu-icon' onClick={handleClick}>
//                 <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
//               </div>
//               <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//                 <li className='nav-item'>
//                   <Link to='/' className='nav-links' onClick={closeMobileMenu}>
//                     Home
//                   </Link>
//                 </li>
//                 <li className='nav-item'>
//                   <Link
//                     to='/advisors'
//                     className='nav-links'
//                     onClick={closeMobileMenu}
//                   >
//                     Advisors
//                   </Link>
//                 </li>
//                 <li className='nav-item'>
//                   <Link
//                     to='/manage-plans'
//                     className='nav-links'
//                     onClick={closeMobileMenu}
//                   >
//                     Manage Plans
//                   </Link>
//                 </li>
//                     </ul>
//                 </div>
//             </nav>
//         </>
//     )
// }

// export default Navbar
