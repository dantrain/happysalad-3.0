import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
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
  const [posts, setPosts] = useState(initialPosts);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);

  const loadNextPage = async () => {
    try {
      const response = await fetch(
        `/page-data/${pageInfo.currentPage + 1}/page-data.json`
      );
      const data = await response.json();
      const newPage = data.result.data.allContentfulBlogPost;

      setPosts(posts => [...posts, ...newPage.edges]);
      setPageInfo(newPage.pageInfo);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout location={location}>
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <ul className="article-list">
            {posts.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ArticlePreview article={node} />
                </li>
              );
            })}
          </ul>
          {pageInfo.hasNextPage && (
            <button onClick={loadNextPage}>Load moar!</button>
          )}
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
