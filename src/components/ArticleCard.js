// Article card - every card features
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ArticleCard = ({ article }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the article is in favorites on component mount
  useEffect(() => {
    const isArticleInFavorites = favorites.some((fav) => fav.url === article.url);
    setIsFavorite(isArticleInFavorites);
  }, [favorites, article.url]);

  // Toggle favorite status
  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(article.url));
    } else {
      dispatch(addFavorite(article));
    }
  };

  return (
    <div className="article-card">
      <div className="article-content">
        <div className="article-header">
          <h3>{article.title}</h3>
          <button className="favorite-button" onClick={handleToggleFavorite}>
            <FavoriteIcon className={isFavorite ? 'favorite-icon favorite' : 'favorite-icon'} />
          </button>
        </div>
        <img src={article.urlToImage} alt={article.title} />
        <p>{article.description}</p>
      </div>
      <div className="read-more">
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
