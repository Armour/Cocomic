import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Footer } from 'components/Footer';
import { Sidenav } from 'components/Sidenav';

import Header from 'containers/Header';

import HomePage from 'containers/HomePage';
import { PopularPage } from 'pages/PopularPage';
import { NewestPage } from 'pages/NewestPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RegisterPage } from 'pages/RegisterPage';
import { LoginPage } from 'pages/LoginPage';
import { BookPage } from 'pages/BookPage';
import { FilePage } from 'pages/uploadPage';
import { UserCenterPage } from 'pages/UserCenterPage';
import { NewBookPage } from 'pages/UploadBookPage';

export const router = (
  <div>
    <Header />
    <Sidenav />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/book/:bookId" component={BookPage} />
      <Route path="/upload" component={FilePage} />
      <Route path="/popular" component={PopularPage} />
      <Route path="/newest" component={NewestPage} />
      <Route path="/userCenter" component={UserCenterPage} />
      <Route path="/newbook" component={NewBookPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <Footer />
  </div>
);
