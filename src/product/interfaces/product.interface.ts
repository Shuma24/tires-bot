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
  tiresId: number;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}
