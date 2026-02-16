import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { graphql } from 'gatsby';
import { decode } from 'he';
import AnimateHeight from 'react-animate-height';
import cn from 'classnames';
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
  const hasScrolled = useRef(false);
  const stateRef = useRef(savedState);

  useLayoutEffect(() => {
    if (savedState?.offset) {
      window.scrollTo(0, savedState.offset);
    }
  }, []);

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
      if (instance.isScrolling) {
        hasScrolled.current = true;
      }

      if (hasScrolled.current) {
        stateRef.current = {
          offset: instance.scrollOffset ?? 0,
          measurementsCache: instance.measurementsCache,
        };
      }

      if (!instance.isScrolling && hasScrolled.current) {
        scrollStateCache.set(cacheKey, stateRef.current!);
      }
    },
  });

  useEffect(() => {
    return () => {
      if (hasScrolled.current && stateRef.current) {
        scrollStateCache.set(cacheKey, stateRef.current);
      }
    };
  }, [cacheKey]);

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

  const [isClient, setIsClient] = useState(
    typeof window !== 'undefined' &&
      scrollStateCache.has(window.location.pathname),
  );
  useEffect(() => setIsClient(true), []);

  const [expanded, setExpanded] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [needsClamp, setNeedsClamp] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState(0);
  const deckRef = useRef<HTMLParagraphElement>(null);
  const clamped = !expanded && !animating;

  useLayoutEffect(() => {
    const el = deckRef.current;
    if (!el || !clamped) return;

    const checkClamp = (): void => {
      const isClamped = el.scrollHeight > el.clientHeight + 1;
      setNeedsClamp(isClamped);
      if (isClamped) setCollapsedHeight(el.clientHeight);
    };

    checkClamp();

    const observer = new ResizeObserver(checkClamp);
    observer.observe(el);

    return () => observer.disconnect();
  }, [clamped]);

  const handleToggle = useCallback(() => {
    setAnimating(true);
    setExpanded((prev) => !prev);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setAnimating(false);
  }, []);

  return (
    <>
      <SEO title={name} />
      <section className={cn(s.intro, { [s.introExpanded]: needsClamp })}>
        <Image className={s.thumbImg} src={imgUrl} alt={name} />
        <div className={s.introText}>
          <h1 className={s.title}>{name}</h1>
          {description && (
            <>
              <AnimateHeight
                height={expanded ? 'auto' : collapsedHeight || 'auto'}
                duration={200}
                easing="cubic-bezier(0.645, 0.045, 0.355, 1.000)"
                onHeightAnimationEnd={handleAnimationEnd}
              >
                <p
                  ref={deckRef}
                  className={cn(s.deck, { [s.deckClamped]: clamped })}
                >
                  {description}
                </p>
              </AnimateHeight>
              {needsClamp && (
                <button
                  className={s.showMoreButton}
                  onClick={handleToggle}
                  aria-expanded={expanded}
                >
                  {expanded ? 'Show Less' : 'Show More'}
                  <svg className={s.chevron} width="10" height="6">
                    <polygon
                      points={expanded ? '0,6 10,6 5,0' : '0,0 10,0 5,6'}
                      fill="currentColor"
                    />
                  </svg>
                </button>
              )}
            </>
          )}
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
