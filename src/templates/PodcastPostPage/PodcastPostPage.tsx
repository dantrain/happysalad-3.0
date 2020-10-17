import React from 'react';
import { graphql } from 'gatsby';
import { PodcastPostBySlugQuery } from '../../../types/graphql-types';
import PodcastPost from '../../components/PodcastPost/PodcastPost';
import { Helmet } from 'react-helmet';

const PodcastPostPage: React.FC<{ data: PodcastPostBySlugQuery }> = ({
  data: { contentfulPodcastPost },
}) => {
  const title = `Saladcast ${contentfulPodcastPost.episodeNumber} - ${contentfulPodcastPost.title}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <PodcastPost {...contentfulPodcastPost} />
    </>
  );
};

export default PodcastPostPage;

export const pageQuery = graphql`
  query PodcastPostBySlug($slug: String!) {
    contentfulPodcastPost(slug: { eq: $slug }) {
      episodeNumber
      title
      ...PodcastPost
    }
  }
`;
