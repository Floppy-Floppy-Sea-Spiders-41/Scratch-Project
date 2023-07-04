import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#app');

const RegisterModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { name, email, password });
      //HANDLE SUCCESSFUL REG HERE - REDIRECT???
      console.log(response);
    } catch (err) {
        //NEED BETTER ERROR HANDLING
      console.error(err);
    }
  }

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Sign Up</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="modalOverlay"
      >
        <h2 className="modalTitle">Register</h2>
        <form className="modalForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="modalFormInput"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="modalFormInput"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="modalFormInput"
            required
          />
          <div className="modalButtons">
            <button type="submit" className="modalButton">Register</button>
            <button onClick={() => setModalIsOpen(false)} className="modalButton">Close</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default RegisterModal;



