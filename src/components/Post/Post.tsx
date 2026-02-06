import React from 'react';
import { Link } from 'gatsby';

import * as s from './post.module.css';

type PostProps = {
  titleLinkUrl: string;
  title: string;
  date: string;
  dateFormatted: string;
  authorName: string;
  imageSlot: React.ReactNode;
};

const Post: React.FC<PostProps> = ({
  titleLinkUrl,
  title,
  date,
  dateFormatted,
  authorName,
  imageSlot,
  children,
}) => {
  const heading = <h2 className={s.title}>{title}</h2>;
  return (
    <article className={s.article}>
      <header className={s.header}>
        <div>
          {titleLinkUrl ? <Link to={titleLinkUrl}>{heading}</Link> : heading}
          <p className={s.byline}>
            <strong>
              <time dateTime={date}>{dateFormatted}</time>
            </strong>{' '}
            - Posted by <strong>{authorName}</strong>
          </p>
        </div>
        <div className={s.image}>{imageSlot}</div>
      </header>
      {children}
    </article>
  );
};

export default Post;
