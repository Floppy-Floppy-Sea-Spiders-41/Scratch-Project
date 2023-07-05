import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux'

const LoginModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalIsOpen(false);
    try {
      const data = {
        email,
        password,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post('/api/login', data, config);
      console.log(response.data);
      //UPDATE FRONT END HERE APPROPRIATELY --- REDIRECT?
      if (response.status === 200) {
        console.log(response.data);
        // dispatch()
        navigate('/homepage');
      }
    } catch (err) {
      console.error(err);
      //HANDLE LOGIN ERRORS
    }
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Log In</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className='modal'
        overlayClassName='modalOverlay'
      >
        <h2 className='modalTitle'>Log In</h2>
        <form className='modalForm' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='modalFormInput'
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='modalFormInput'
            required
          />
          <div className='modalButtons'>
            <button type='submit' className='modalButton'>
              Log In
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className='modalButton'
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LoginModal;
