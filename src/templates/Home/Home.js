import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { useGlobalState } from '../../components/GlobalState';
import Layout from '../../components/Layout';
import InfiniteScroll from '../../components/InfiniteScroll';
import ArticlePreview from '../../components/ArticlePreview';

const Home = ({
  data: {
    allContentfulBlogPost: { edges: initialPosts, pageInfo: initialPageInfo },
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
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <InfiniteScroll
            isLoading={loading}
            hasMore={pageInfo.hasNextPage}
            onLoadMore={loadNextPage}
          >
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
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
    allContentfulBlogPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...ArticlePreview
        }
      }
      pageInfo {
        currentPage
        hasNextPage
      }
    }
  }
`;
