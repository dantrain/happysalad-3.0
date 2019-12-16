import React from 'react';
import { Link } from 'gatsby';
import slugify from '@sindresorhus/slugify';

import s from './game-link.module.css';

const GameLink = ({ name, image }) => (
  <Link className={s.gameLink} to={`/game/${slugify(name)}`}>
    <img
      className={s.image}
      src={image}
      alt={name}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
    <div className={s.overlay}>
      <p className={s.text}>{name}</p>
    </div>
  </Link>
);

export default GameLink;
