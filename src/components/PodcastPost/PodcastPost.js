import React from 'react';
import { graphql } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import { playUrl, pause } from '../../features/player/playerSlice';
import Post from '../../components/Post';
import Markdown from '../../components/Markdown';
import GamesList from '../../components/GamesList';

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

  const dispatch = useDispatch();

  const play = () => {
    if (playing && currentUrl === url) {
      dispatch(pause());
    } else {
      dispatch(playUrl(url));
    }
  };

  return (
    <Post
      titleLinkUrl={`/saladcast/${episodeNumber}-${slug}`}
      title={`Saladcast ${episodeNumber} - ${title}`}
      date={recordingDate}
      dateFormatted={recordingDateFormatted}
      authorName={author.name}
    >
      <div className={s.buttonBar}>
        <button className={s.playButton} type="button" onClick={play}>
          {playing && currentUrl === url ? 'Pause' : 'Play'}
        </button>
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
