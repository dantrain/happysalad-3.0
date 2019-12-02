import React from 'react';
import cn from 'classnames';
import { Link } from 'gatsby';
import slugify from '@sindresorhus/slugify';

import s from './games-list.module.css';

const GamesList = ({ games, className }) => (
  <ul className={cn(s.list, className)}>
    {games.map(({ id, name, image: { icon_url } }) => (
      <li key={id} className={s.item}>
        <Link to={`/game/${slugify(name)}`}>
          <img
            className={s.image}
            src={icon_url}
            alt={name}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <div className={s.overlay}>
            <p className={s.text}>{name}</p>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);

export default GamesList;
