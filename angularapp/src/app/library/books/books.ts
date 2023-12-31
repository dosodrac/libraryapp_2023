export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    price: number;
  };
}
