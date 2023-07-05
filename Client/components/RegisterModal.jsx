import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

Modal.setAppElement('#app');

const RegisterModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setModalIsOpen(false)
    console.log('handle submit hit!');
    try {
      console.log(name);
      const data = {
        name,
        email,
        password,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post('/api/register', data, config);
      console.log('reponse data back', response.data);
      //HANDLE SUCCESSFUL REG HERE - REDIRECT???
      if (response.status === 200) {
        // dispatch({ type: 'REGISTERED', payload: response.data });
        navigate('/homepage');
      }

      //NEED BETTER ERROR HANDLING
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Sign Up</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className='modal'
        overlayClassName='modalOverlay'
      >
        <h2 className='modalTitle'>Register</h2>
        <form className='modalForm' onSubmit={(e) => handleSubmit(e)}>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='modalFormInput'
            required
          />
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
              Register
            </button>
            <button
              //onClick={() => setModalIsOpen(false)}
              className='modalButton'
            >
              Close
            </button>
            <button className='modalButton' onClick={(e) => handleSubmit(e)}>
              TEST
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RegisterModal;
