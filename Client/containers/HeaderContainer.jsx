import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import '../styles.css';
import RegisterModal from '../components/RegisterModal.jsx';
import LoginModal from '../components/LoginModal.jsx';
import { logout } from '../actions/userActions';


const HeaderContainer = () => {
  const userInfo = useSelector((state) => state.userLogin);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = () => {
    console.log('logout hit!!!')
    dispatch(logout())
    navigate('/')
  }

  const handleSearch = () => {
    navigate('/search')
  }

  return (
    <div id='navBar'>
      <div id='flex-item'>
        <p>Stretch.io</p>
      </div>
      

      {userInfo?.userInfo ? (
        <div id='flex-item' className='authButtons'>
          <div className='authButton'>
            <button className='submitButton' onClick={handleSearch}>Search Stretches</button>
          </div>
          <div className='authButton'>
            <button className='submitButton' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <div id='flex-item' className='authButtons'>
          <div className='authButton'>
            <RegisterModal />
          </div>
          <div className='authButton'>
            <LoginModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderContainer;




