import React from 'react';
import { graphql } from 'gatsby';
import { VideoPostBySlugQuery } from '../../../types/graphql-types';
import VideoPost from '../../components/VideoPost/VideoPost';
import { Helmet } from 'react-helmet';

const VideoPostPage: React.FC<{ data: VideoPostBySlugQuery }> = ({
  data: { contentfulVideoPost },
}) => {
  const title = `Gameplay - ${contentfulVideoPost.title}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <VideoPost {...contentfulVideoPost} />
    </>
  );
};

export default VideoPostPage;

export const pageQuery = graphql`
  query VideoPostBySlug($slug: String!) {
    contentfulVideoPost(slug: { eq: $slug }) {
      title
      ...VideoPost
    }
  }
`;
