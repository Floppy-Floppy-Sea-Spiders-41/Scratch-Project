import axios from 'axios';

import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_LOGOUT
	
} from '../constants/userConstants';

import { FAVORITES_LIST_REQUEST, FAVORITES_LIST_SUCCESS, FAVORITES_LIST_ADD_REQUEST, FAVORITES_LIST_ADD_SUCCESS, FAVORITES_LIST_ADD_FAIL } from '../constants/favoritesConstants';



export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/login',
			{ email, password },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

        dispatch({
            type: FAVORITES_LIST_SUCCESS,
            payload: data.userDetail.favStretches
        })



		//localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => async (dispatch) => {
	//localStorage.removeItem('userInfo');
	dispatch({ type: USER_LOGOUT });
	document.location.href = '/login'
};

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/register',
			{ name, email, password },
			config
		);

        console.log('data back from Axios call: ', data)

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const addFavorite = (email, name, equipment, difficulty, instructions) => async (dispatch) => {

    
    try{
    dispatch({type: FAVORITES_LIST_ADD_REQUEST})

    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.patch(
        '/api/favoriteTest',
        { email, name, equipment, difficulty, instructions},
        config
      );

      dispatch({
        type: FAVORITES_LIST_ADD_SUCCESS,
        payload: data.addedFavoritesList
      })

    }catch (error) {
		console.log(error.message);
		dispatch({
			type: FAVORITES_LIST_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}

}

