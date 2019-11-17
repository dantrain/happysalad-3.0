import React from 'react';
import { graphql } from 'gatsby';
import flatten from 'lodash/flatten';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import Tile from '../../components/Tile';

import s from './podcast-category-page.module.css';

const PodcastCategoryPage = ({
  pageContext: { hotTopics },
  data: {
    allContentfulPodcastPost: { edges: firstPage, pageInfo: firstPageInfo },
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
}) => {
  const pages = [firstPage];

  return (
    <Layout hotTopics={hotTopics}>
      <Helmet title={`The Saladcast · ${siteTitle}`} />
      <ul className={s.postList}>
        {flatten(pages).map(({ node }) => (
          <li key={node.slug}>
            <Tile node={node} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default PodcastCategoryPage;

export const pageQuery = graphql`
  query PodcastCategoryQuery($limit: Int!, $skip: Int!) {
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
          __typename
          slug
          ...PodcastPost
        }
      }
      pageInfo {
        currentPage
        hasNextPage
      }
    }
  }
`;
