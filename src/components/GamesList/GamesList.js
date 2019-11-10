import React from 'react';

import s from './games-list.module.css';

const GamesList = ({ games }) => (
  <ul className={s.list}>
    {games.map(({ id, name, image: { icon_url } }) => (
      <li key={id} className={s.item}>
        <img className={s.image} src={icon_url} alt={name} />
        <div className={s.overlay}>
          <p className={s.text}>{name}</p>
        </div>
      </li>
    ))}
  </ul>
);

export default GamesList;
