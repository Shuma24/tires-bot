export interface ITiresToCreate {
  name: string;
  description: string;
  price: number;
  radius: number;
  width: number;
  height: number;
  quantity: number;
  type: string;
  generatedSize: string;
}

export interface ITires {
  id: number;
  name: string;
  images: ITiresImages[];
  description: string;
  price: number;
  size: string;
  quantity: number;
  type: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface IPhotosIDTelegram {
  id: string;
}
export interface ITiresImages {
  id: number;
  tiresId: number | null;
  url: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
