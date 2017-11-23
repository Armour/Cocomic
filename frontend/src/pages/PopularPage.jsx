import React from 'react';

import { ComicCard } from 'components/ComicCard';
import Masonry from 'containers/Masonry';

export class PopularPage extends React.Component {
  componentDidMount() {
    $('#the-header').addClass('navbar-fixed');
  }
  render() {
    return (
      <div className="main-wrap">
        <h1 className="page-title">Popular</h1>
        <Masonry />
        <ComicCard
          img_url="sample-1"
          title="Hahaha"
          description="Conan paseó en bicicleta. Vio que el paisaje fue muy grante."
          author="Kingston"
          likes={25}
        />
        <ComicCard
          img_url="sample-1"
          title="Hahaha"
          description="Conan paseó en bicicleta. Vio que el paisaje fue muy grante."
          author="Kingston"
          likes={25}
        />
        <ComicCard
          img_url="sample-1"
          title="Hahaha"
          description="Conan paseó en bicicleta. Vio que el paisaje fue muy grante."
          author="Kingston"
          likes={25}
        />
      </div>
    );
  }
}
