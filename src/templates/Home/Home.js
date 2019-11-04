import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { useGlobalState } from '../../components/GlobalState';
import Layout from '../../components/Layout';
import InfiniteScroll from '../../components/InfiniteScroll';
import PodcastPostTile from '../../components/PodcastPostTile';

const Home = ({
  data: {
    allContentfulPodcastPost: {
      edges: initialPosts,
      pageInfo: initialPageInfo,
    },
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
  location,
}) => {
  const {
    state: { posts, pageInfo, loading },
    loadNextPage,
  } = useGlobalState({
    posts: initialPosts,
    pageInfo: initialPageInfo,
    loading: false,
  });

  return (
    <Layout location={location}>
      <div>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <InfiniteScroll
            isLoading={loading}
            hasMore={pageInfo.hasNextPage}
            onLoadMore={loadNextPage}
          >
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <PodcastPostTile {...node} />
                  </li>
                );
              })}
            </ul>
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export const pageQuery = graphql`
  query HomeQuery($limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPodcastPost(
      sort: { fields: [recordingDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...PodcastPostTile
        }
      }
      pageInfo {
        currentPage
        hasNextPage
      }
    }
  }
`;
