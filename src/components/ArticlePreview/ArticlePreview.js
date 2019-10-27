import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import styles from './article-preview.module.css';

const ArticlePreview = ({
  article: { heroImage, slug, title, publishDate, description, tags },
}) => (
  <div className={styles.preview}>
    <Img alt="" fluid={heroImage.fluid} fadeIn={false} />
    <h3 className={styles.previewTitle}>
      <Link to={`/blog/${slug}`}>{title}</Link>
    </h3>
    <small>{publishDate}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: description.childMarkdownRemark.html,
      }}
    />
    {tags.map(tag => (
      <p className={styles.tag} key={tag}>
        {tag}
      </p>
    ))}
  </div>
);

export default ArticlePreview;

export const query = graphql`
  fragment ArticlePreview on ContentfulBlogPost {
    title
    slug
    publishDate(formatString: "MMMM Do, YYYY")
    tags
    heroImage {
      fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
        ...GatsbyContentfulFluid_noBase64
      }
    }
    description {
      childMarkdownRemark {
        html
      }
    }
  }
`;
