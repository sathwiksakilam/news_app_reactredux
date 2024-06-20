import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import NavBar from "./components/CategoryFilter";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:url" element={<ArticlePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
