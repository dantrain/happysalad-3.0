import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Layout from '../../components/Layout';

import heroStyles from '../../components/Hero/hero.module.css';

const BlogPost = ({
  data: {
    contentfulBlogPost: { title, heroImage, publishDate, body },
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
  location,
}) => (
  <Layout location={location}>
    <div style={{ background: '#fff' }}>
      <Helmet title={`${title} | ${siteTitle}`} />
      <div className={heroStyles.hero}>
        <Img
          className={heroStyles.heroImage}
          alt={title}
          fluid={heroImage.fluid}
          fadeIn={false}
        />
      </div>
      <div className="wrapper">
        <h1 className="section-headline">{title}</h1>
        <p
          style={{
            display: 'block',
          }}
        >
          {publishDate}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: body.childMarkdownRemark.html,
          }}
        />
      </div>
    </div>
  </Layout>
);

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
