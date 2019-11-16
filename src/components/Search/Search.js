import React, { useEffect, useState, useRef } from 'react';
import { navigate } from 'gatsby';
import lunr from 'lunr';
import cn from 'classnames';
import Downshift from 'downshift';
import Vh from '../VisuallyHidden';

import s from './search.module.css';

const Search = ({ className }) => {
  const [searchIndex, setSearchIndex] = useState(null);
  const [gameData, setGameData] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    const focusInput = event => {
      if (event.code === 'Slash') {
        inputRef.current.focus();
      }
    };

    document.addEventListener('keyup', focusInput);

    return () => {
      document.removeEventListener('keyup', focusInput);
    };
  }, []);

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await fetch('/search-data.json');
        const data = await response.json();

        const searchIndex = lunr.Index.load(data.searchIndex);
        setSearchIndex(searchIndex);

        setGameData(data.gameData);
      } catch (err) {
        console.error('Fetch search data failure', err);
      }
    };

    fetchSearchData();
  }, []);

  return (
    <Downshift
      onChange={(selection, { clearSelection }) => {
        if (selection) {
          navigate(`/game/${selection.id}`);
          clearSelection();
        }
      }}
      itemToString={item => (item ? item.id : '')}
      defaultHighlightedIndex={0}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => {
        const query = inputValue.replace(/[:^*+-]/g, ' ').trim();

        const results =
          searchIndex &&
          gameData &&
          query.length > 2 &&
          searchIndex
            .search(`${query}~1 ${query}*`)
            .map(({ ref }) => ({ id: ref, ...gameData[ref] }));

        return (
          <div className={cn(s.search, className)}>
            <Vh>
              <label {...getLabelProps()}>Search for a game</label>
            </Vh>
            <input
              className={s.input}
              ref={inputRef}
              placeholder="Search for a game"
              {...getInputProps()}
            />
            {isOpen && results && results.length ? (
              <ul className={s.resultsList} {...getMenuProps()}>
                {results.map((item, index) =>
                  index < 8 ? (
                    <li
                      {...getItemProps({
                        key: item.id,
                        item,
                        index,
                        className: cn(s.result, {
                          [s.resultHighlighted]: highlightedIndex === index,
                        }),
                      })}
                    >
                      <img
                        className={s.resultImage}
                        src={item.tiny_url}
                        alt={item.name}
                      />
                      <p className={s.resultText}>{item.name}</p>
                    </li>
                  ) : null
                )}
              </ul>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
};

export default Search;
