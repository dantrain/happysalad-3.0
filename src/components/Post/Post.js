import React from 'react';
import { Link } from 'gatsby';

import s from './post.module.css';

const Post = ({
  titleLinkSlug,
  title,
  date,
  dateFormatted,
  authorName,
  children,
}) => {
  const heading = <h2 className={s.title}>{title}</h2>;
  return (
    <article className={s.article}>
      <header className={s.header}>
        {titleLinkSlug ? (
          <Link to={`/${titleLinkSlug}`}>{heading}</Link>
        ) : (
          heading
        )}
        <p className={s.byline}>
          <strong>
            <time dateTime={date}>{dateFormatted}</time>
          </strong>{' '}
          - Posted by <strong>{authorName}</strong>
        </p>
      </header>
      {children}
    </article>
  );
};

export default Post;
