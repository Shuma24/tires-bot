export interface inputFiles {
  data: Buffer;
  filename: string;
  encoding: string;
  mimetype: string;
  limit: boolean;
}

export interface IUploadResponse {
  url: string;
  filename: string;
}

export interface IStorage {
  handleFile(file: inputFiles): Promise<IUploadResponse | undefined>;
}
