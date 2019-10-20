import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Hero from '../components/Hero';
import Layout from '../components/layout';
import ArticlePreview from '../components/ArticlePreview';

const Index = ({
  data: {
    allContentfulBlogPost: { edges: posts },
    allContentfulPerson: {
      edges: [author],
    },
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
  location,
}) => (
  <Layout location={location}>
    <div style={{ background: '#fff' }}>
      <Helmet title={siteTitle} />
      <Hero data={author.node} />
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

export default Index;

export const pageQuery = graphql`
  query HomeQuery {
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
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          ...Hero
        }
      }
    }
  }
`;
