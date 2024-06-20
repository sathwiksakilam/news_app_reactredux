import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, searchArticles } from '../redux/actions';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

const NavBar = () => {
  const dispatch = useDispatch();
  const pageIndex = useSelector((state) => state.user.pageIndex);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const location = useLocation();

  // Reset pageIndex to 0 whenever location changes to '/'
  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(fetchArticles({ category: selectedCategory, pageIndex: 0 }));
    }
  }, [location.pathname, selectedCategory, dispatch]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    dispatch(fetchArticles({ category, pageIndex: 0 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchArticles(searchQuery.trim()));
    } else {
      dispatch(fetchArticles({ category: selectedCategory, pageIndex: 0 }));
    }
  };

  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <NewspaperIcon className="text-light" />
        <Navbar.Brand className="text-light">Top Headlines</Navbar.Brand>
        <Navbar.Toggle className="text-light" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-light" href="/">Home</Nav.Link>
            {pageIndex === 0 && (
              <NavDropdown
                title={<span className="text-light">Categories</span>}
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                {categories.map((category) => (
                  <NavDropdown.Item
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
          </Nav>
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search articles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-outline-light">Search</button>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
