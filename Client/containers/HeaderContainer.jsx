import React from 'react';
import '../styles.css';
import RegisterModal from '../components/RegisterModal.jsx';
import LoginModal from '../components/LoginModal.jsx';
import iconImage from '../images/exercising.svg'

const HeaderContainer = () => {
  return (
    <div id='navBar'>

<div id='flex-item' className='flex-item'>
  <img src={iconImage} alt="Icon" className="icon" />
  <h1 className='navHeader'>Stretch.io</h1>
</div>


      
      
      
      <div id='flex-item' className='authButtons'>
        <div className='authButton'>
          <RegisterModal />
        </div>
        <div className='authButton'>
          <LoginModal />
        </div>
      </div>
    </div>
  );
};

export default HeaderContainer;



