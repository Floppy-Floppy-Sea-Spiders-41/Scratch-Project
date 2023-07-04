import React from 'react';
import '../styles.css';
import RegisterModal from '../components/RegisterModal.jsx';
import LoginModal from '../components/LoginModal.jsx';

const HeaderContainer = () => {
  return (
    <div id='navBar'>
      <header>
        <h1 className='navHeader'>Ready to get your stretch on?</h1>
      </header>
      <div id='flex-item'></div>
      <div id='flex-item'>
        <p>Stretch.io</p>
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



