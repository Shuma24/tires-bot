export interface ITires {
  id: number;
  name: string;
  images: ITiresImages[];
  description: string;
  price: number;
  radius: number;
  width: number;
  height: number;
  type: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface ITiresImages {
  id: number;
  tiresId: number | null;
  url: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
