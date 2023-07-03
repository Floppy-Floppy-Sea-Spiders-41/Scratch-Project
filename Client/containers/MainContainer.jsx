import React, { useState } from 'react';
import Stretch from '../components/Stretch.jsx';
import { redirect } from 'react-router-dom';

const MainContainer = () => {
  //define state variable
  const [stretches, setStretches] = useState([]);
  const [input, setInput] = useState('');
  // let formInput = '';
  // stretchesFromAPI is an array that holds a series of objects, where each object is a stretch we have pulled from our query to our server
  //let stretchesFromAPI = [{}, {}, {}];
  let stretchesFromAPI = [{}, {}];

  // stretchFetch is an async func that accepts as a param a muscle from user input in search bar
  const stretchFetch = async (muscle) => {
    try {
      // fetch request to server 3000
      const response = await fetch(
        `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&type=stretching`,
        {
          method: 'GET',
          headers: { 'X-Api-Key': 'SReYt5aEyGMKzrdSe87wew==boZAObqiLCiQPGrb' },
        }
      );
      console.log('running stretchFetch on line 19');
      console.log(response);
      stretchesFromAPI = await response.json();
      setStretches(stretchesFromAPI); // We moved this to the handleChange event.
      redirect('/');
      return;
    } catch (err) {
      console.log('Error from stretchFetch in MainContainer.jsx');
    }
  };

  //event handler for submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('on line 31, event.target.value is: ', event.target.value);
    // console.log(input);
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
  // insert any logic for the MainContainer here, including (potentially):
  return (
    <div>
      {/* this p tag just helps us see where this MainContainer is being rendered */}
      {/* <p>This is the MainContainer in Client/containers/MainContainer.jsx</p> */}
      {/* insert search bar here (input textbox and submit button) */}
      <form className='searchBar' onSubmit={handleSubmit}>
        Search:
        <input
          id='searchQ'
          type='text'
          placeholder='Type muscle here'
          value={input}
          onChange={handleChange}
        />
        <input id='searchButton' type='submit' />
      </form>

      {/* Stretch are individual search results from query to database/API */}
      <div className='stretchBox'>{stretchComponents}</div>
    </div>
  );
};
export default MainContainer;
