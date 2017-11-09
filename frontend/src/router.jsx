import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Footer } from 'components/Footer';
import { Sidenav } from 'components/Sidenav';
import { Header } from 'components/Header';

import { HomePage } from 'pages/HomePage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RegisterPage } from 'pages/RegisterPage';
import { LoginPage } from 'pages/LoginPage';
import { UploadPage } from 'pages/UploadPage';

export const router = (
  <div>
    <Header />
    <Sidenav />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/upload" component={UploadPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <Footer />
  </div>
);
