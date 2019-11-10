import React from 'react';
import PodcastPost from '../PodcastPost';
import VideoPost from '../VideoPost';

const Tile = ({ node }) => {
  switch (node.__typename) {
    case 'ContentfulPodcastPost':
      return <PodcastPost {...node} />;
    case 'ContentfulVideoPost':
      return <VideoPost {...node} />;
    default:
      return null;
  }
};

export default Tile;
