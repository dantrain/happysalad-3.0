import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import YouTube from 'react-youtube';
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';

import s from './video-post.module.css';

const videoIdRegex = /(?:.*|\/|v=)([a-zA-Z\d_-]{11})/;

const VideoPost = ({
  data: {
    contentfulVideoPost: {
      title,
      recordingDateFormatted,
      recordingDate,
      author,
      youTubeUrl,
      body,
    },
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
}) => (
  <Page>
    <Helmet title={`Gameplay - ${title} · ${siteTitle}`} />
    <div className="wrapper">
      <article className={s.article}>
        <header className={s.header}>
          <h2 className={s.title}>Gameplay - {title}</h2>
          <p className={s.byline}>
            <strong>
              <time dateTime={recordingDate}>{recordingDateFormatted}</time>
            </strong>{' '}
            - Posted by <strong>{author.name}</strong>
          </p>
        </header>
        <YouTube
          className={s.youTubePlayer}
          videoId={videoIdRegex.exec(youTubeUrl)[1]}
        />
        <Markdown ast={body.childMarkdownRemark.htmlAst} />
      </article>
    </div>
  </Page>
);

export default VideoPost;

export const pageQuery = graphql`
  query VideoPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulVideoPost(slug: { eq: $slug }) {
      slug
      title
      recordingDateFormatted: recordingDate(formatString: "Do MMMM YYYY")
      recordingDate
      author {
        name
      }
      youTubeUrl
      body {
        childMarkdownRemark {
          htmlAst
        }
      }
    }
  }
`;
