import React from 'react';
import { graphql } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { playTrack, pause } from '../../features/player/playerSlice';
import Post from '../Post';
import Markdown from '../Markdown';
import GamesList from '../GamesList';
import { Play, Pause, Download, ApplePodcasts } from '../Icon';

import s from './podcast-post.module.css';

const PodcastPost = ({
  title,
  slug,
  episodeNumber,
  recordingDateFormatted,
  recordingDate,
  author,
  audioFile: {
    file: { url },
  },
  body,
  games,
}) => {
  const { playing, url: currentUrl } = useSelector(state => state.player);
  const fullTitle = `Saladcast ${episodeNumber} - ${title}`;

  const dispatch = useDispatch();

  const play = () => {
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
          href={`/assets${new URL(`https:${url}`).pathname}`}
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
      {games && games.games && games.games.length && (
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
    audioFile {
      file {
        url
        details {
          size
        }
      }
    }
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
