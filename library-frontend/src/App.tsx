import './App.css';
import React from 'react';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/Home/HomePage';
import { SearchBooksPage } from './layouts/SearchBooks/SearchBooksPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/Checkout/BookCheckoutPage';

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="flex-grow-1">
        
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="/home">
            <HomePage />
          </Route>

          <Route path="/search">
            <SearchBooksPage />
          </Route>

          <Route path="/checkout/:bookId">
            <BookCheckoutPage/>
          </Route>
        </Switch>

      </div>
      <Footer />
    </div>
  );
}
