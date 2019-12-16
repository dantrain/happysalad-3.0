import React from 'react';
import cn from 'classnames';
import GameLink from '../GameLink';

import s from './games-list.module.css';

const GamesList = ({ games, className }) => (
  <ul className={cn(s.list, className)}>
    {games.map(({ id, name, image: { icon_url } }) => (
      <li key={id} className={s.item}>
        <GameLink name={name} image={icon_url} />
      </li>
    ))}
  </ul>
);

export default GamesList;
