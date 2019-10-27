import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styles from './blog.module.css';
import Layout from '../../components/Layout';
import ArticlePreview from '../../components/ArticlePreview';

const Blog = ({
  data: {
    allContentfulBlogPost: { edges: posts },
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
  location,
}) => (
  <Layout location={location}>
    <div style={{ background: '#fff' }}>
      <Helmet title={siteTitle} />
      <div className={styles.hero}>Blog</div>
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
      </div>
    </div>
  </Layout>
);

export default Blog;

export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          ...ArticlePreview
        }
      }
    }
  }
`;
