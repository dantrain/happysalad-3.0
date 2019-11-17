import React from 'react';
import Layout from '../../components/Layout';

import s from './about.module.css';

const AboutPage = ({ pageContext: { hotTopics } }) => (
  <Layout hotTopics={hotTopics}>
    <div className={s.about}>
      <h1>About</h1>
      <p>
        Happysalad presents the Saladcast, a regular gaming podcast. Hailing
        from the UK, we cover the gamut of video games including PC, console and
        mobile gaming. New episodes appear fortnightly (or bi-weekly if you
        prefer, you crazy Yanks).
      </p>
      <h2>History</h2>
      <p>
        Happysalad is a collection of guys who once upon a time had far too much
        time on their hands.
      </p>
      <p>
        They decided to use this time for the benefit of others and began to
        create a collection of games using{' '}
        <a href="https://www.clickteam.com/">
          The Games Factory and Multimedia Fusion
        </a>{' '}
        for enjoyment and ridicule.
      </p>
      <p>
        Happysalad.com was born out of a desire to demonstrate their lack of
        shame by hosting these computational delights, where delights is used
        loosely, by means of the fledgeling world wide web. Soon the games were
        not enough and pictures of the crazy fools materialised along with the
        retro musical stylings of{' '}
        <a href="https://www.facebook.com/GlacialMusic/">Glacial</a>. Eventually
        the world was allowed to supply their reposte via a forum.
      </p>
      <p>For a time it was good.</p>
      <p>
        As the waking hours of the fools became swallowed up by life,
        happysalad.com slipped into obscurity and eventually died of neglect.
      </p>
      <p>
        Eventually the time came for the elated greens to make a triumphant
        return, heralded by the very same fools. Spouting forth statements of
        random and unhinged waffle, the Saladcast has been offering the honest
        and unrequested commentary on the gaming, entertainment and technology
        streams of modern society since 2010.
      </p>
      <p>
        There’s also video foolishness over on{' '}
        <a href="https://www.youtube.com/channel/UCeibGWITwPHuSe5-qfGDAGw">
          Youtube
        </a>
        , because that’s still a thing.
      </p>
    </div>{' '}
  </Layout>
);

export default AboutPage;
