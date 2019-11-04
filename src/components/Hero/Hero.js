import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import styles from './hero.module.css';

const Hero = ({ data: { name, heroImage } }) => (
  <div className={styles.hero}>
    <Img
      className={styles.heroImage}
      alt={name}
      fluid={heroImage.fluid}
      fadeIn={false}
    />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>{name}</h3>
    </div>
  </div>
);

export default Hero;

export const query = graphql`
  fragment Hero on ContentfulPerson {
    name
    heroImage: image {
      fluid(
        maxWidth: 1180
        maxHeight: 480
        resizingBehavior: PAD
        background: "rgb:000000"
      ) {
        ...GatsbyContentfulFluid_noBase64
      }
    }
  }
`;
