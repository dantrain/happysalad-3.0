import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import VideoPost from '../../components/VideoPost';

const VideoPostPage = ({
  pageContext: { hotTopics },
  data: {
    contentfulVideoPost,
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
}) => (
  <Layout hotTopics={hotTopics}>
    <Helmet title={`Gameplay - ${contentfulVideoPost.title} · ${siteTitle}`} />
    <VideoPost {...contentfulVideoPost} />
  </Layout>
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
