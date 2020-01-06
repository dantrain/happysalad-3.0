import React from 'react';
import { graphql } from 'gatsby';
import { VideoPostBySlugQuery } from '../../../types/graphql-types';
import PageTitle from '../../components/PageTitle/PageTitle';
import VideoPost from '../../components/VideoPost/VideoPost';

const VideoPostPage: React.FC<{ data: VideoPostBySlugQuery }> = ({
  data: { contentfulVideoPost },
}) => (
  <>
    <PageTitle title={`Gameplay - ${contentfulVideoPost.title}`} />
    <VideoPost {...contentfulVideoPost} />
  </>
);

export default VideoPostPage;

export const pageQuery = graphql`
  query VideoPostBySlug($slug: String!) {
    contentfulVideoPost(slug: { eq: $slug }) {
      ...VideoPost
    }
  }
`;
