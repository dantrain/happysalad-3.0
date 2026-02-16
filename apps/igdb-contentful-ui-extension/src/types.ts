export interface GameImage {
  thumb: string;
  micro: string;
  cover: string;
}

export interface Game {
  id: number;
  name: string;
  image: GameImage;
}

export function hasImage(game: Game): boolean {
  return game.image.micro !== '';
}
