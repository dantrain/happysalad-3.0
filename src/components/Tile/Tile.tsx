import React from 'react';
import PodcastPost from '../PodcastPost/PodcastPost';
import VideoPost from '../VideoPost/VideoPost';
export type TileEdge = {
  node: (Queries.PodcastPostFragment | Queries.VideoPostFragment) & {
    __typename: string;
  };
};

const Tile: React.FC<TileEdge> = ({ node }) => {
  switch (node.__typename) {
    case 'ContentfulPodcastPost':
      return <PodcastPost {...(node as Queries.PodcastPostFragment)} />;
    case 'ContentfulVideoPost':
      return <VideoPost {...(node as Queries.VideoPostFragment)} />;
    default:
      return null;
  }
};

export default Tile;
