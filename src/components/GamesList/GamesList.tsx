import React from 'react';
import cn from 'classnames';
import GameLink from '../GameLink/GameLink';

import * as s from './games-list.module.css';

export type GamesListItems = readonly {
  readonly id?: number;
  readonly name?: string;
  readonly image?: { readonly icon_url?: string };
}[];

type GamesListProps = {
  games: GamesListItems;
  className?: string;
};

const GamesList: React.FC<GamesListProps> = ({ games, className }) => (
  <ul className={cn(s.list, className)}>
    {games.map(({ id, name, image: { icon_url } }) => (
      <li key={id} className={s.item}>
        <GameLink name={name} image={icon_url} />
      </li>
    ))}
  </ul>
);

export default GamesList;
