import './App.css';
import React from 'react';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/Home/HomePage';
import { SearchBooksPage } from './layouts/SearchBooks/SearchBooksPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/Checkout/BookCheckoutPage';
import { oktaConfig } from './okta/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWidget from './okta/LoginWidget';
import { ReviewListPage } from './layouts/Checkout/ReviewList';
import { ShelfPage } from './layouts/Shelf/ShelfPage';
import { MessagesPage } from './layouts/Messages/MessagesPage';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
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

            <Route path="/reviewlist/:bookId">
              <ReviewListPage />
            </Route>

            <Route path="/checkout/:bookId">
              <BookCheckoutPage />
            </Route>

            <Route path="/login" render={
              () => <LoginWidget config={oktaConfig} />
            } />

            <Route path="/login/callback" component={LoginCallback} />

            <SecureRoute path="/shelf">
              <ShelfPage />
            </SecureRoute>

            <SecureRoute path="/messages">
              <MessagesPage />
            </SecureRoute>
          </Switch>

        </div>
        <Footer />
      </Security>
    </div>
  );
}
