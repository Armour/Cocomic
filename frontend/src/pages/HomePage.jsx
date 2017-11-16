import React from 'react';

import { Intro } from 'components/Intro';
import { ComicCard } from 'components/ComicCard';

export class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Intro className="intro-panel" />
        <ComicCard img_url="sample-1" title="2333" description="test" />
      </div>
    );
  }
}
