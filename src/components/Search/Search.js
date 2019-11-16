import React, { useEffect, useState, useRef } from 'react';
import { navigate } from 'gatsby';
import lunr from 'lunr';
import cn from 'classnames';
import Downshift from 'downshift';

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
        const results =
          searchIndex &&
          gameData &&
          inputValue.length > 2 &&
          searchIndex
            .search(`${inputValue}*`)
            .map(({ ref }) => ({ id: ref, ...gameData[ref] }));

        return (
          <div className={cn(s.search, className)}>
            <label {...getLabelProps()}>Search for a game</label>
            <input ref={inputRef} {...getInputProps()} />
            {isOpen && results && results.length ? (
              <ul className={s.resultsList} {...getMenuProps()}>
                {results.map((item, index) =>
                  index < 8 ? (
                    <li
                      {...getItemProps({
                        key: item.id,
                        item,
                        index,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      <img src={item.tiny_url} alt={item.name} />
                      {item.name}
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
