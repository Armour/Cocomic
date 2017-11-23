import React from 'react';

import { Intro } from 'components/Intro';
import { ComicCard } from 'components/ComicCard';

export class HomePage extends React.Component {
  componentDidMount() {
    $('#the-header').removeClass('navbar-fixed');
  }
  render() {
    return (
      <div>
        <Intro className="intro-panel" />
        <div className="main-wrap">
          <ComicCard
            img_url="sample-1"
            title="Hahaha"
            description="Conan paseó en bicicleta. Vio que el paisaje fue muy grante."
            author="Kingston"
            likes={25}
          />
        </div>
      </div>
    );
  }
}
