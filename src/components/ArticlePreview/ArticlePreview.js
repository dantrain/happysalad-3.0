import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import styles from './article-preview.module.css';

const ArticlePreview = ({
  article: { heroImage, slug, title, publishDate, description, tags },
}) => (
  <div className={styles.preview}>
    <div>
      <Link to={`/blog/${slug}`}>
        <Img alt="" fluid={heroImage.fluid} fadeIn={false} />
        <h3 className={styles.previewTitle}>{title}</h3>
      </Link>
    </div>
    <div>
      <small>{publishDate}</small>
    </div>
    <div
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
