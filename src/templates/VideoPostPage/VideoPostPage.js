import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import VideoPost from '../../components/VideoPost';

const VideoPostPage = ({
  pageContext: { hotTopics },
  data: { contentfulVideoPost },
}) => (
  <Layout hotTopics={hotTopics}>
    <PageTitle title={`Gameplay - ${contentfulVideoPost.title}`} />
    <VideoPost {...contentfulVideoPost} />
  </Layout>
);

export default VideoPostPage;

export const pageQuery = graphql`
  query VideoPostBySlug($slug: String!) {
    contentfulVideoPost(slug: { eq: $slug }) {
      ...VideoPost
    }
  }
`;
