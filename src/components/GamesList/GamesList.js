import React from 'react';
import { Link } from 'gatsby';

import s from './games-list.module.css';

const GamesList = ({ games }) => (
  <ul className={s.list}>
    {games.map(({ id, name, image: { icon_url } }) => (
      <li key={id} className={s.item}>
        <Link to={`/game/${id}`}>
          <img className={s.image} src={icon_url} alt={name} />
          <div className={s.overlay}>
            <p className={s.text}>{name}</p>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);

export default GamesList;
