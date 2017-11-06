import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Footer } from 'components/Footer';
import { Sidenav } from 'components/Sidenav';
import { Header } from 'components/Header';

import { HomePage } from 'pages/HomePage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ParallaxPage } from 'pages/ParallaxPage';
import { ReactPage } from 'pages/ReactPage';
import { RegisterPage } from 'pages/RegisterPage';
import { LoginPage } from 'pages/LoginPage';

export const router = (
  <div>
    <Header />
    <Sidenav />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/react" component={ReactPage} />
      <Route path="/parallax" component={ParallaxPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <Footer />
  </div>
);
