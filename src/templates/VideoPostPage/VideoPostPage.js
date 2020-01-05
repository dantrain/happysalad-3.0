import React from 'react';
import { graphql } from 'gatsby';
import PageTitle from '../../components/PageTitle/PageTitle';
import VideoPost from '../../components/VideoPost';

const VideoPostPage = ({ data: { contentfulVideoPost } }) => (
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
