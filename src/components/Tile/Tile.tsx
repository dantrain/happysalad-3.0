import React from 'react';
import PodcastPost from '../PodcastPost/PodcastPost';
import VideoPost from '../VideoPost/VideoPost';
import {
  PodcastPostFragment,
  VideoPostFragment,
} from '../../../types/graphql-types';

export type TileEdge = {
  node: (PodcastPostFragment | VideoPostFragment) & { __typename: string };
};

const Tile: React.FC<TileEdge> = ({ node }) => {
  switch (node.__typename) {
    case 'ContentfulPodcastPost':
      return <PodcastPost {...(node as PodcastPostFragment)} />;
    case 'ContentfulVideoPost':
      return <VideoPost {...(node as VideoPostFragment)} />;
    default:
      return null;
  }
};

export default Tile;
