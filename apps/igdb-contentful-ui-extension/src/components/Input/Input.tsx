import {
  TextInput,
  Spinner,
  ValidationMessage,
  Paragraph,
} from '@contentful/f36-components';
import Downshift from 'downshift';
import SearchIGDB from '../SearchIGDB';
import { hasImage, type Game } from '../../types';

import './input.css';

interface InputProps {
  onChange: (game: Game) => void;
  proxyUrl: string;
  proxyKey: string;
  selectedIds: Set<number>;
}

const Input = ({ onChange, proxyUrl, proxyKey, selectedIds }: InputProps) => (
  <Downshift<Game>
    onChange={(value, { clearSelection }) => {
      clearSelection();

      if (value) {
        onChange(value);
      }
    }}
    itemToString={(item) => (item ? item.name : '')}
    defaultHighlightedIndex={0}
  >
    {({
      inputValue,
      getInputProps,
      getMenuProps,
      getItemProps,
      isOpen,
      highlightedIndex,
      selectedItem,
    }) => (
      <div className="input">
        <TextInput
          placeholder="Search for a game"
          className="text-input"
          {...getInputProps({ width: 'large' })}
        />
        {isOpen ? (
          <SearchIGDB
            query={inputValue ?? ''}
            proxyUrl={proxyUrl}
            proxyKey={proxyKey}
          >
            {({ data, loading, error }) => {
              if (error) {
                return <ValidationMessage>{error}</ValidationMessage>;
              }

              const available = data.filter(
                (game) => !selectedIds.has(game.id),
              );
              const withImages = available.filter(hasImage);
              const items = withImages.length > 0 ? withImages : available;

              return (
                <>
                  {loading && <Spinner className="spinner" />}
                  {!!items.length && (
                    <ul className="menu" {...getMenuProps()}>
                      {items.map((item, index) => (
                        <li
                          className="item"
                          {...getItemProps({
                            key: item.id,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index
                                  ? '#e5ebed'
                                  : 'white',
                              fontWeight:
                                selectedItem === item ? 'bold' : 'normal',
                            },
                          })}
                        >
                          {hasImage(item) ? (
                            <img
                              className="item-image"
                              src={item.image.micro}
                              alt={item.name}
                            />
                          ) : (
                            <div className="item-image-placeholder">?</div>
                          )}
                          <Paragraph className="item-text">
                            {item.name}
                          </Paragraph>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              );
            }}
          </SearchIGDB>
        ) : null}
      </div>
    )}
  </Downshift>
);

export default Input;
