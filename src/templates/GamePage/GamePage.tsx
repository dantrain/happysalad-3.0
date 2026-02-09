import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { graphql } from 'gatsby';
import { decode } from 'he';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import VideoPost from '../../components/VideoPost/VideoPost';
import PodcastPost from '../../components/PodcastPost/PodcastPost';
import Image from '../../components/Image/Image';
import SEO from '../../components/SEO';
import heightCache, { scrollStateCache } from '../../utils/heightCache';

import * as s from './game-page.module.css';

type GamePageProps = {
  pageContext: { name: string; summary: string; image: { cover: string } };
  data: Queries.PostsBySlugsQuery;
};

type PodcastEdge =
  Queries.PostsBySlugsQuery['allContentfulPodcastPost']['edges'][number];

const VirtualizedPodcastList: React.FC<{
  podcastPosts: readonly PodcastEdge[];
}> = ({ podcastPosts }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollMarginRef = useRef(0);

  useLayoutEffect(() => {
    scrollMarginRef.current = listRef.current?.offsetTop ?? 0;
  }, []);

  const itemsRef = useRef(podcastPosts);
  itemsRef.current = podcastPosts;

  const cacheKey =
    typeof window !== 'undefined' ? window.location.pathname : '/';
  const savedState = scrollStateCache.get(cacheKey);

  const virtualizer = useWindowVirtualizer({
    count: podcastPosts.length,
    estimateSize: (index) => {
      const slug = itemsRef.current[index]?.node.slug;
      if (slug && heightCache.has(slug)) return heightCache.get(slug)!;

      return 350;
    },
    overscan: 8,
    scrollMargin: scrollMarginRef.current,
    measureElement: (el) => {
      const height = el.getBoundingClientRect().height;
      const index = Number((el as HTMLElement).dataset.index);
      const slug = itemsRef.current[index]?.node.slug;
      if (slug) heightCache.set(slug, height);

      return height;
    },
    initialOffset: savedState?.offset,
    initialMeasurementsCache: savedState?.measurementsCache,
    scrollToFn: () => {},
    onChange: (instance) => {
      if (!instance.isScrolling) {
        scrollStateCache.set(cacheKey, {
          offset: instance.scrollOffset ?? 0,
          measurementsCache: instance.measurementsCache,
        });
      }
    },
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div ref={listRef}>
      <ul
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualItem) => {
          const edge = podcastPosts[virtualItem.index];

          return (
            <li
              key={edge.node.slug}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start - virtualizer.options.scrollMargin}px)`,
              }}
            >
              <PodcastPost {...edge.node} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const GamePage: React.FC<GamePageProps> = ({
  pageContext: {
    name,
    summary,
    image: { cover: imgUrl },
  },
  data: {
    allContentfulPodcastPost: { edges: podcastPosts },
    allContentfulVideoPost: { edges: videoPosts },
  },
}) => {
  const description = summary && summary !== name && decode(summary);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <>
      <SEO title={name} />
      <section className={s.intro}>
        <Image className={s.thumbImg} src={imgUrl} alt={name} />
        <div className={s.introText}>
          <h1 className={s.title}>{name}</h1>
          {description && <p className={s.deck}>{description}</p>}
        </div>
      </section>
      <ul>
        {videoPosts.map(({ node }) => (
          <li key={node.slug}>
            <VideoPost {...node} gameLink={false} />
          </li>
        ))}
      </ul>
      {isClient ? (
        <VirtualizedPodcastList podcastPosts={podcastPosts} />
      ) : (
        <ul>
          {podcastPosts.map(({ node }) => (
            <li key={node.slug}>
              <PodcastPost {...node} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default GamePage;

export const pageQuery = graphql`
  query PostsBySlugs($slugs: [String]) {
    allContentfulPodcastPost(
      filter: { slug: { in: $slugs } }
      sort: { recordingDate: DESC }
    ) {
      edges {
        node {
          ...PodcastPost
        }
      }
    }
    allContentfulVideoPost(
      filter: { slug: { in: $slugs } }
      sort: { recordingDate: ASC }
    ) {
      edges {
        node {
          ...VideoPost
        }
      }
    }
  }
`;
