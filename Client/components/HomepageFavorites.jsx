import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const FavoritesStretch = ({
  email,
  name,
  equipment,
  difficulty,
  instructions,
}) => {
  const user = useSelector((state) => state.userLogin);
  const favs = useSelector((state) => state.favorites);

  const [removed, setRemoved] = useState(false);

  const removeFromFavorites = async () => {
    setRemoved(true);
    console.log(user.userInfo.userDetail.email);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.patch(
        '/api/favoriteDelete',
        { email, name },
        config
      );
      //   dispatch(deleteFavorite(data.deletedFavoitesList))
      data.deletedFavoitesList;
    } catch (error) {}
    // dispatch(deleteFavorite(user.userInfo.userDetail.email, name, equipment, difficulty, instructions))
    //add to userActions?
  };
  //add functionality below to - refresh render
  //add undo functionality? - Removed from Favorites, Re-Add to Favorites? --> removed on refresh?
  return (
    <div className='stretchComp'>
      <h3>{name}</h3>
      <ul>
        <li>
          <strong>Equipment:</strong> {equipment}
        </li>
        <li>
          <strong>Difficulty:</strong> {difficulty}
        </li>
        <li>
          <strong>Instructions:</strong> {instructions}
        </li>
      </ul>

      {!removed ? (
        <button onClick={removeFromFavorites}>Remove From Favorites</button>
      ) : (
        <h2>Removed from Favorites</h2>
      )}
    </div>
  );
};

export default FavoritesStretch;
