import React, { useState } from 'react';
import Stretch from '../components/Stretch.jsx';
import { redirect } from 'react-router-dom';
import axios from 'axios';

const MainContainer = () => {
  
  const [stretches, setStretches] = useState();
  const [input, setInput] = useState('');
  
  const stretchFetch = async (muscle) => {

    const data = {
      muscle,
    };
    
    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    
    };
    try {
      const result = await axios.post('/api', data, config);
      console.log(result);
      setStretches(result.data);
      redirect('/')
    } catch(error){
      console.log(error.message);
    };
     

         }
  

  //event handler for submit
  const handleSubmit = (event) => {
    event.preventDefault();
    
    stretchFetch(input);
  };

  //event handler for change
  const handleChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  // init stretchComponents as empty arr, this will store Stretch components before rendering
  const stretchComponents = [];
  // if stretchesFromAPI is not undefined/null, iterate through stretchesFromAPI and push a new TaskRow component with id and key properties
  if (Array.isArray(stretches)) {
    stretches.forEach((stretch) => {
      stretchComponents.push(
        <Stretch
          name={stretch.name}
          equipment={stretch.equipment}
          difficulty={stretch.difficulty}
          instructions={stretch.instructions}
        ></Stretch>
      );
    });
  }
  
  return (
    <div>
      
      <form className='searchBar' onSubmit={handleSubmit}>
        Search:
        <input
          id='searchQ'
          type='text'
          placeholder='Type muscle here'
          value={input}
          onChange={handleChange}
          className='searchInput'
        />
        <input id='searchButton' type='submit' className='submitButton' />
      </form>

      
      
      <div className='stretchBox'>{stretchComponents}</div>
    </div> 
  );
};
export default MainContainer;
