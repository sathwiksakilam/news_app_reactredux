import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../redux/actions';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import '../index.css'
// starting page 
//styling of every page is done in index.css
const HomePage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.user.articles);
  const error = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    dispatch(fetchArticles({ category: 'general', pageIndex }));
  }, [dispatch, pageIndex]);  //using redux dispatch

  const handlePageChange = (index) => {
    setPageIndex(index);
  };

  let content;
  if (status === "loading") {
    content = (
      <div className="spinner"></div>//styled in index.css
    );
  } else if (status === "succeeded") {
    content = articles.map((article) => (
      article.urlToImage && <ArticleCard key={article.url} article={article} />
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="container bg-light">
      <div className="articles">{content}</div>
      <Pagination currentPage={pageIndex} onPageChange={handlePageChange} />
    </div>
  );
};

export default HomePage;
