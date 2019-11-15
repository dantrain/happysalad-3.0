import React, { useEffect, useState } from 'react';
import lunr from 'lunr';

const Search = () => {
  const [searchIndex, setSearchIndex] = useState(null);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await fetch('search-data.json');
        const data = await response.json();

        const searchIndex = lunr.Index.load(data.searchIndex);
        setSearchIndex(searchIndex);

        setGameData(data.gameData);
      } catch (err) {
        console.error('Fetch search index failure', err);
      }
    };

    fetchSearchData();
  }, []);

  let results;

  if (searchIndex && gameData) {
    results = searchIndex.search('Zelda').map(({ ref }) => gameData[ref]);
  }

  return <pre>{results ? JSON.stringify(results, null, 4) : 'Loading...'}</pre>;
};

export default Search;
