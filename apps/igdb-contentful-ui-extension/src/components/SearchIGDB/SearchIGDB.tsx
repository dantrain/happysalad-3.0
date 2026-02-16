import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useDebounce } from 'use-debounce';
import type { Game } from '../../types';

interface SearchResult {
  data: Game[];
  loading: boolean;
  error: string | false;
}

interface SearchIGDBProps {
  query: string;
  proxyUrl: string;
  proxyKey: string;
  children: (result: SearchResult) => ReactNode;
}

const SearchIGDB = ({
  query,
  children,
  proxyUrl,
  proxyKey,
}: SearchIGDBProps) => {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | false>(false);

  const [debouncedQuery] = useDebounce(query, 500);

  const fetchCount = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery.length > 2 || /^\d+$/.test(debouncedQuery)) {
        const newCount = ++fetchCount.current;

        setError(false);
        setLoading(true);

        try {
          const response = await fetch(
            `${proxyUrl}?q=${encodeURIComponent(debouncedQuery)}`,
            {
              headers: { 'X-API-Key': proxyKey },
            },
          );

          if (!response.ok) {
            throw new Error(`Search failed: ${response.status}`);
          }

          const results = await response.json();

          if (results.error) {
            throw new Error(results.error);
          }

          setError(false);
          setLoading(false);

          if (fetchCount.current === newCount) {
            setData(results);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
          setData([]);

          console.error(err);
        }
      } else {
        setError(false);
        setLoading(false);
        setData([]);
      }
    };

    fetchData();
  }, [debouncedQuery, proxyUrl, proxyKey]);

  return children({ data, loading, error });
};

export default SearchIGDB;
