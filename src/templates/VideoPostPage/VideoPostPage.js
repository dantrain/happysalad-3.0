import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Page from '../../components/Page';
import VideoPost from '../../components/VideoPost';

const VideoPostPage = ({
  data: {
    contentfulVideoPost,
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
}) => (
  <>
    <Helmet title={`Gameplay - ${contentfulVideoPost.title} · ${siteTitle}`} />
    <VideoPost {...contentfulVideoPost} />
  </>
);

export default VideoPostPage;

export const pageQuery = graphql`
  query VideoPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulVideoPost(slug: { eq: $slug }) {
      ...VideoPost
    }
  }
`;
