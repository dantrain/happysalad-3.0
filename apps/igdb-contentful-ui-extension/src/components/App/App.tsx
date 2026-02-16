import { useState, useEffect } from 'react';
import { Paragraph, IconButton } from '@contentful/f36-components';
import { XIcon } from '@contentful/f36-icons';
import { FieldAppSDK } from '@contentful/app-sdk';
import Input from '../Input';
import { hasImage, type Game } from '../../types';

import './app.css';

interface AppProps {
  sdk: FieldAppSDK;
}

const App = ({ sdk }: AppProps) => {
  const [games, setGames] = useState<Game[]>(sdk.field.getValue()?.games ?? []);

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk]);

  useEffect(() => {
    const onExternalChange = ({ games = [] }: { games?: Game[] } = {}) =>
      setGames(games);
    const detachExternalChangeHandler =
      sdk.field.onValueChanged(onExternalChange);

    return () => detachExternalChangeHandler();
  }, [sdk]);

  const onAdd = (newGame: Game) => {
    setGames((games = []) => {
      const newGames = [...games, newGame];
      sdk.field.setValue({ games: newGames });
      return newGames;
    });
  };

  const onRemove = (id: number) => {
    setGames((games = []) => {
      const newGames = games.filter((game) => game.id !== id);
      if (newGames.length) {
        sdk.field.setValue({ games: newGames });
      } else {
        sdk.field.removeValue();
      }
      return newGames;
    });
  };

  const proxyUrl = sdk.parameters.installation.igdbProxyUrl as string;
  const proxyKey = sdk.parameters.installation.igdbProxyKey as string;

  return (
    <div>
      {games && !!games.length && (
        <ul className="game-list">
          {games.map((game) => (
            <li key={game.id} className="game-list-item">
              {hasImage(game) ? (
                <img src={game.image.thumb} alt={game.name} />
              ) : (
                <div className="game-list-item-placeholder">?</div>
              )}
              <div className="game-list-item-overlay">
                <IconButton
                  className="game-list-item-remove-button"
                  aria-label="Remove"
                  icon={<XIcon />}
                  variant="transparent"
                  size="small"
                  onClick={() => onRemove(game.id)}
                />
                <Paragraph className="game-list-item-text">
                  {game.name}
                </Paragraph>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Input
        onChange={onAdd}
        proxyUrl={proxyUrl}
        proxyKey={proxyKey}
        selectedIds={new Set(games.map((g) => g.id))}
      />
    </div>
  );
};

export default App;
