import { FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_REQUEST, FETCH_ARTICLES_FAILURE, ADD_FAVOURITE, REMOVE_FAVOURITE } from "./actionTypes";

const initialState = {
  pageIndex: 0,
  articles: [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  error: '',
  status: 'idle'
};

// Manages user-related state, including articles, favorites, loading status, and errors.
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        status: 'loading'
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        status: 'succeeded',
        pageIndex: action.pageIndex,
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        articles: [],
        error: action.payload,
        status: 'failed'
      };
    case ADD_FAVOURITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case REMOVE_FAVOURITE:
      return {
        ...state,
        favorites: state.favorites.filter(article => article.url !== action.payload)
      };
    default:
      return state;
  }
};

export default userReducer;
