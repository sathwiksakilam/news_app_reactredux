import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ArticlePage = () => {
  const { url } = useParams();
  const dispatch = useDispatch();
  const article = useSelector((state) =>
    state.user.articles.find((article) => article.url === url)
  );
  const favorites = useSelector((state) => state.user.favorites);

  if (!article) {
    return <p>Article not found</p>;
  }

  // Check if the current article is in favorites
  const isFavorite = favorites.some((fav) => fav.url === article.url);

  // Toggle favorite status
  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(article.url));
    } else {
      dispatch(addFavorite(article));
    }
  };

  return (
    <div className="article-page">
      <div className="container">
        <h1>{article.title}</h1>
        <img className="img-fluid" src={article.urlToImage} alt={article.title} />
        <p>{article.content}</p>
        <button className="favorite-button" onClick={handleToggleFavorite}>
          {isFavorite ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon />}
          {isFavorite ? ' Remove from Favorites' : ' Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default ArticlePage;
