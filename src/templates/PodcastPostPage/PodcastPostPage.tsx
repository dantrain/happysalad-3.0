import React from 'react';
import { graphql, HeadFC } from 'gatsby';
import PodcastPost from '../../components/PodcastPost/PodcastPost';
import SEO from '../../components/SEO';

const PodcastPostPage: React.FC<{ data: Queries.PodcastPostBySlugQuery }> = ({
  data: { contentfulPodcastPost },
}) => {
  return <PodcastPost {...contentfulPodcastPost} />;
};

export default PodcastPostPage;

export const Head: HeadFC<Queries.PodcastPostBySlugQuery> = ({
  data: { contentfulPodcastPost },
}) => {
  const title = `Saladcast ${contentfulPodcastPost.episodeNumber} - ${contentfulPodcastPost.title}`;
  return <SEO title={title} />;
};

export const pageQuery = graphql`
  query PodcastPostBySlug($slug: String!) {
    contentfulPodcastPost(slug: { eq: $slug }) {
      episodeNumber
      title
      ...PodcastPost
    }
  }
`;
