export interface Game {
  id: string;
  category: Category;
  description: string;
  enabled: boolean;
  image: string;
  name: string;
  path: string;
}

export interface Category {
  id: string;
  name: string;
  enabled: boolean;
}
