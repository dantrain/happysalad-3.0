import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import PodcastPost from '../../components/PodcastPost';

const PodcastPostPage = ({
  pageContext: { hotTopics },
  data: { contentfulPodcastPost },
}) => (
  <Layout hotTopics={hotTopics}>
    <PageTitle
      title={`Saladcast ${contentfulPodcastPost.episodeNumber} - ${contentfulPodcastPost.title}`}
    />
    <PodcastPost {...contentfulPodcastPost} />
  </Layout>
);

export default PodcastPostPage;

export const pageQuery = graphql`
  query PodcastPostBySlug($slug: String!) {
    contentfulPodcastPost(slug: { eq: $slug }) {
      ...PodcastPost
    }
  }
`;
