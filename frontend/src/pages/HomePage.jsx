import React from 'react';

import { Intro } from 'components/Intro';
import { ComicCard } from 'components/ComicCard';

export class HomePage extends React.Component {
  componentDidMount() {
    $('.pushpin-demo-nav').each((_, elem) => {
      const target = $(`#${$(elem).attr('data-target')}`);
      const offsetTop = target.offset().top;
      const offsetBot = offsetTop + target.outerHeight() - $(elem).height();
      $(elem).pushpin({
        top: offsetTop,
        bottom: offsetBot,
      });
    });
  }

  render() {
    return (
      <div>
        <Intro className="intro-panel" />
        <ComicCard img_url="sample-1" title="2333" description="test" />
      </div>
    );
  }
}
