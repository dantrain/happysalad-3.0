import React from 'react';
import { graphql } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { RootState } from '../../store';
import { playTrack, pause } from '../../features/player/playerSlice';
import Post from '../Post/Post';
import Markdown from '../Markdown/Markdown';
import GamesList from '../GamesList/GamesList';
import { Play, Pause, Download, ApplePodcasts } from '../Icon/Icon';

import * as s from './podcast-post.module.css';

const PodcastPost: React.FC<Queries.PodcastPostFragment> = ({
  title,
  slug,
  episodeNumber,
  recordingDateFormatted,
  recordingDate,
  author,
  audioFileUrl: url,
  body,
  games,
}) => {
  const { playing, url: currentUrl } = useSelector(
    (state: RootState) => state.player,
  );
  const fullTitle = `Saladcast ${episodeNumber} - ${title}`;

  const dispatch = useDispatch();

  const play = (): void => {
    if (playing && currentUrl === url) {
      dispatch(pause());
    } else {
      dispatch(playTrack({ url, title: fullTitle }));
    }
  };

  return (
    <Post
      titleLinkUrl={`/saladcast/${episodeNumber}-${slug}`}
      title={fullTitle}
      date={recordingDate}
      dateFormatted={recordingDateFormatted}
      authorName={author.name}
      imageSlot={
        <img
          className={s.image}
          src="/images/saladcast-post.png"
          alt="Lettuce microphone"
          width={42}
          height={64}
        />
      }
    >
      <div className={s.buttonBar}>
        <button
          className={cn(s.button, s.playButton)}
          type="button"
          onClick={play}
        >
          {playing && currentUrl === url ? (
            <>
              <Pause />
              Pause
            </>
          ) : (
            <>
              <Play />
              Play
            </>
          )}
        </button>
        <a
          className={cn(s.button, s.downloadLink)}
          href={`/podcasts${new URL(url).pathname}`}
          download
        >
          <Download />
          Download
        </a>
        <a
          className={cn(s.button, s.subscribeLink)}
          href="https://podcasts.apple.com/podcast/id367437221"
        >
          <ApplePodcasts />
          Subscribe
        </a>
      </div>
      <Markdown ast={body.childMarkdownRemark.htmlAst} />
      {!!games?.games?.length && (
        <>
          <h3 className={s.gamesListHeading}>In this podcast:</h3>
          <GamesList games={games.games} />
        </>
      )}
    </Post>
  );
};

export default PodcastPost;

export const query = graphql`
  fragment PodcastPost on ContentfulPodcastPost {
    slug
    title
    episodeNumber
    recordingDateFormatted: recordingDate(formatString: "Do MMMM YYYY")
    recordingDate
    author {
      name
    }
    audioFileUrl
    body {
      childMarkdownRemark {
        htmlAst
      }
    }
    games {
      games {
        id
        name
        image {
          icon_url
        }
      }
    }
  }
`;
