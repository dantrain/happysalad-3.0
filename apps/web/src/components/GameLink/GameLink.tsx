import React from 'react';
import { Link } from 'gatsby';
import cn from 'classnames';
import slugify from '@sindresorhus/slugify';
import Image from '../Image/Image';

import * as s from './game-link.module.css';

type GameLinkProps = {
  name: string;
  image: string;
};

const GameLink: React.FC<GameLinkProps> = ({ name, image }) => (
  <Link className={s.gameLink} to={`/game/${slugify(name)}`}>
    {image ? (
      <Image
        className={s.image}
        src={image}
        alt={name}
        width={80}
        height={80}
      />
    ) : null}
    <div className={cn(s.overlay, { [s.missingImage]: !image })}>
      <p className={s.text}>{name}</p>
    </div>
  </Link>
);

export default GameLink;
