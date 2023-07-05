import {
	FAVORITES_LIST_REQUEST,
    FAVORITES_LIST_SUCCESS,
    FAVORITES_LIST_FAIL,
    FAVORITES_LIST_CLEAR
	
} from '../constants/favoritesConstants';

export const favoritesReducer = (state = {}, action) => {
	switch (action.type) {
		case FAVORITES_LIST_REQUEST:
			return { loading: true };
		case FAVORITES_LIST_SUCCESS:
			return { loading: false, favorites: action.payload };
		case FAVORITES_LIST_FAIL:
			return { loading: false, error: action.payload };
		case FAVORITES_LIST_CLEAR:
			return {};
		default:
			return state;
	}
};