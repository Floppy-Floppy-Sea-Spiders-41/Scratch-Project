import React, { useState } from 'react';
import Stretch from '../components/Stretch.jsx';
import { redirect } from 'react-router-dom';
import axios from 'axios';

const SearchContainer = () => {
  const [stretches, setStretches] = useState();
  const [input, setInput] = useState('');

  const stretchFetch = async (muscle) => {
    const data = {
      muscle,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const result = await axios.post('/api', data, config);
      console.log(result);
      setStretches(result.data);
      redirect('/');
    } catch (error) {
      console.log(error.message);
    }
  };

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
      <h1>SEARCH PAGE!!!!</h1>
      <form className='dropdownMenu' onSubmit={handleSubmit}>
        <select
          id='searchQ'
          // type='text'
          placeholder='Select muscle'
          value={input}
          onChange={handleChange}
          className='selectInput'
        >
          <option value=''>Select muscle</option>
          <option value='abductors'>Adductors</option>
          <option value='biceps'>Biceps</option>
          <option value='calves'>Calves</option>
          <option value='chest'>Chest</option>
          <option value='forearms'>Forearms</option>
          <option value='glutes'>Glutes</option>
          <option value='hamstrings'>Hamstrings</option>
          <option value='lats'>Lats</option>
          <option value='lower_back'>Lower Back</option>
          <option value='middle_back'>Middle Back</option>
          <option value='neck'>Neck</option>
          <option value='quadriceps'>Quadriceps</option>
          <option value='traps'>Traps</option>
          <option value='triceps'>Triceps</option>

          {/* <option value=''>Select Muscle</option>
         {muscles.map((muscle) => (
          <option key={id} value={musclename}>
            {musclename}
          </option>
         ))} */}
        </select>
        <input id='dropMenu' type='submit' className='submitButton' />
      </form>

      <div className='stretchBox'>{stretchComponents}</div>
    </div>
  );
};
export default SearchContainer;
