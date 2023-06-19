export interface Libro {
  id: string;
  title: string;
  purchased: number;
  read: number;
  type: string;
  status: string;
  publisher: string;
  price: number;
  rating: number;
  comment: string | null;
}
