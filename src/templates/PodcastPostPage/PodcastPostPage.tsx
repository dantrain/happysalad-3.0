import React from 'react';
import { graphql } from 'gatsby';
import { PodcastPostBySlugQuery } from '../../../types/graphql-types';
import PageTitle from '../../components/PageTitle/PageTitle';
import PodcastPost from '../../components/PodcastPost/PodcastPost';

const PodcastPostPage: React.FC<{ data: PodcastPostBySlugQuery }> = ({
  data: { contentfulPodcastPost },
}) => (
  <>
    <PageTitle
      title={`Saladcast ${contentfulPodcastPost.episodeNumber} - ${contentfulPodcastPost.title}`}
    />
    <PodcastPost {...contentfulPodcastPost} />
  </>
);

export default PodcastPostPage;

export const pageQuery = graphql`
  query PodcastPostBySlug($slug: String!) {
    contentfulPodcastPost(slug: { eq: $slug }) {
      ...PodcastPost
    }
  }
`;
