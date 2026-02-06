import React from 'react';
import { graphql } from 'gatsby';
import VideoPost from '../../components/VideoPost/VideoPost';
import SEO from '../../components/SEO';

const VideoPostPage: React.FC<{ data: Queries.VideoPostBySlugQuery }> = ({
  data: { contentfulVideoPost },
}) => {
  const title = `Gameplay - ${contentfulVideoPost.title}`;
  return (
    <>
      <SEO title={title} />
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
