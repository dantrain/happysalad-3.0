import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import Markdown from '../../components/Markdown';

import s from './podcast-post.module.css';

const PodcastPost = ({
  data: {
    contentfulPodcastPost: {
      title,
      slug,
      episodeNumber,
      recordingDateFormatted,
      recordingDate,
      author,
      audioFile,
      body,
    },
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
  location,
}) => (
  <Layout location={location}>
    <Helmet title={`SaladCast ${episodeNumber} - ${title} · ${siteTitle}`} />
    <div className="wrapper">
      <article className={s.article}>
        <header className={s.header}>
          <h2 className={s.title}>
            SaladCast {episodeNumber} - {title}
          </h2>
          <p className={s.byline}>
            <strong>
              <time dateTime={recordingDate}>{recordingDateFormatted}</time>
            </strong>{' '}
            - Posted by <strong>{author.name}</strong>
          </p>
        </header>
        <audio
          className={s.audio}
          controls
          src={audioFile.file.url}
          preload="auto"
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
        <Markdown ast={body.childMarkdownRemark.htmlAst} />
      </article>
    </div>
  </Layout>
);

export default PodcastPost;

export const pageQuery = graphql`
  query PodcastPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPodcastPost(slug: { eq: $slug }) {
      slug
      title
      episodeNumber
      recordingDateFormatted: recordingDate(formatString: "Do MMMM YYYY")
      recordingDate
      author {
        name
      }
      audioFile {
        file {
          url
          details {
            size
          }
        }
      }
      body {
        childMarkdownRemark {
          htmlAst
        }
      }
    }
  }
`;
