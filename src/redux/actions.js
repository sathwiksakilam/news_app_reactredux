import {
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_FAILURE,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
} from "./actionTypes";

export const fetchArticlesRequest = () => ({
  type: FETCH_ARTICLES_REQUEST,
});

export const fetchArticlesSuccess = ({ articles, pageIndex }) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: articles,
  pageIndex: pageIndex,
});

export const fetchArticlesFailure = (error) => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: error,
});

// Actions to add or remove articles from the favorites list.
export const addFavorite = (article) => {
  // Add article to local storage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(article);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  return {
    type: ADD_FAVOURITE,
    payload: article,
  };
};

export const removeFavorite = (articleUrl) => {
  // Remove article from local storage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((article) => article.url !== articleUrl);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  return {
    type: REMOVE_FAVOURITE,
    payload: articleUrl,
  };
};

const API_KEY = "c6d3471a1f854e57865c8f2109d9e2b3";
const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

const urls = [
  "https://newsapi.org/v2/top-headlines",
  "https://newsapi.org/v2/everything?q=apple&from=2024-06-18&to=2024-06-18&sortBy=popularity&apiKey=c6d3471a1f854e57865c8f2109d9e2b3",
  "https://newsapi.org/v2/everything?q=tesla&from=2024-05-19&sortBy=publishedAt&apiKey=c6d3471a1f854e57865c8f2109d9e2b3",
  "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=c6d3471a1f854e57865c8f2109d9e2b3",
  "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=c6d3471a1f854e57865c8f2109d9e2b3",
];

// Action to fetch news articles based on category and page index.
export const fetchArticles = ({ category, pageIndex }) => {
  return (dispatch) => {
    dispatch(fetchArticlesRequest());
    const adjustedPageIndex = pageIndex % urls.length;
    const url = urls[adjustedPageIndex] || NEWS_API_URL;

    let finalUrl = url;
    if (adjustedPageIndex === 0) {
      finalUrl += `?apiKey=${API_KEY}&category=${category}&country=us&pageSize=10`;
    }

    fetch(finalUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const articles = data.articles;
        dispatch(fetchArticlesSuccess({ articles, pageIndex: adjustedPageIndex }));
      })
      .catch((error) => {
        dispatch(fetchArticlesFailure(error.message));
      });
  };
};

// Action to search for articles based on user input.
export const searchArticles = (query) => {
  return (dispatch) => {
    dispatch(fetchArticlesRequest());
    fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}&pageSize=10`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const articles = data.articles;
        dispatch(fetchArticlesSuccess({ articles, pageIndex: 0 }));
      })
      .catch((error) => {
        dispatch(fetchArticlesFailure(error.message));
      });
  };
};
